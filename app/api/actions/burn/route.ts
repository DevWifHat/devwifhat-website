import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { createBurnInstruction, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

const hookWallet = new PublicKey("DeVwhQE3FsUcqXq3AKjdwwjLVZZqaz9URwLghMUCtN4u");
const mint = new PublicKey("DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o");

const RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
const connection = new Connection(RPC);

export const GET = (req: Request) => {
    const payload: ActionGetResponse = {
        icon: new URL("/dev_wif_hat_icon.png", new URL(req.url).origin).toString(),
        title: "Burn",
        description: "Burn DWH",
        label: "Burn",
        links: {
            actions: [
                {
                    label: "1,000 DWH",
                    href: `${req.url}?amount=1000`
                },
                {
                    label: "5,000 DWH",
                    href: `${req.url}?amount=5000`
                },
                {
                    label: "10,000 DWH",
                    href: `${req.url}?amount=10000`
                },
                {
                    "label": "Burn DWH", // button text
                    "href": `${req.url}?amount={amount}`,
                    "parameters": [
                        {
                            "name": "amount", // field name
                            "label": "Enter a custom DWH amount" // text input placeholder
                        }
                    ]
                }
            ]
        },
        error: { message: "Blinks are still new, we'll fix this asap" }
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    })
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
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

        const url = new URL(req.url);
        const amount = parseInt(url.searchParams.get("amount") || "69000000");
        const message = `Burn ${(amount).toFixed(2)} $DWH, Dev is watching you.`;
        const ata = getAssociatedTokenAddressSync(mint, account);

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
            createBurnInstruction(ata, mint, account, amount * 10 ** 6)
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