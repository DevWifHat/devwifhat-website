import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { createBurnInstruction } from "@solana/spl-token";
import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

const hookWallet = new PublicKey("DeVwhQE3FsUcqXq3AKjdwwjLVZZqaz9URwLghMUCtN4u");
const mint = new PublicKey("DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o");

const RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
const connection = new Connection(RPC);

export const GET = (req: Request) => {
    const payload: ActionGetResponse = {
        icon: new URL("/dev_wif_hat_icon.png", new URL(req.url).origin).toString(),
        title: "Swap",
        description: "Swap SOL for DWH",
        label: "Swap"
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    })
}

export const OPTIONS = GET;

export const POST = async (req: Request, { params }: { params: { amount: string } }) => {
    try {
        const body: ActionPostRequest = await req.json();

        let account: PublicKey;
        if (body.account) {
            account = new PublicKey(body.account);
        } else {
            return Response.json({
                error: "Account is required"
            }, { status: 400 })
        }

        // TODO: Get and parse amount
        const amount = parseInt(params.amount || "69000000");
        const message = `Burn ${(amount).toFixed(2)} $DWH, Dev is watching you.`;

        const tx = new Transaction();

        tx.add(
            new TransactionInstruction({
                keys: [{
                    isSigner: true,
                    isWritable: true,
                    pubkey: account,
                }],
                data: Buffer.from(message, "utf-8"),
                programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
            }),
            createBurnInstruction(account, mint, account, amount * 10 ** 6)
        )

        const blockhash = await connection.getLatestBlockhash();
        tx.feePayer = account;
        tx.recentBlockhash = blockhash.blockhash;
        tx.lastValidBlockHeight = blockhash.lastValidBlockHeight;

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction: tx
            },
            signers: [],
            reference: hookWallet
        })

        return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })

    } catch (error) {
        return Response.json({
            error: "Internal Server Error"
        }, { status: 400 })
    }
}