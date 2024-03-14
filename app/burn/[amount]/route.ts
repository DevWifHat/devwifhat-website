import { getAssociatedTokenAddressSync, createBurnInstruction, } from '@solana/spl-token'
import { Transaction, Connection, PublicKey, TransactionInstruction } from '@solana/web3.js'

// Use the RPC endpoint of your choice.
const hookWallet = new PublicKey("DeVwhQE3FsUcqXq3AKjdwwjLVZZqaz9URwLghMUCtN4u");
const mint = new PublicKey("DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o");

const RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
const connection = new Connection(RPC);

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const label = "Burn your $DWH, Dev is watching you.";
    const icon =
        "https://www.devwifhat.xyz/dev_wif_hat_icon.png";

    return Response.json({
        label,
        icon,
    })
}
export async function POST(request: Request,
    { params }: { params: { amount: string } }) {
    const body = await request.json();
    console.log(body);
    if (!body?.account) throw new Error("missing account");

    const amount = parseInt(params.amount || "69000000");
    const wallet = new PublicKey(body.account);

    const account = getAssociatedTokenAddressSync(mint, wallet);

    const message = `Burn ${(amount).toFixed(2)} $DWH, Dev is watching you.`;

    console.log(message, account);
    const tx = new Transaction();
    const blockhash = await connection.getLatestBlockhash();
    tx.feePayer = wallet;
    tx.recentBlockhash = blockhash.blockhash;
    tx.lastValidBlockHeight = blockhash.lastValidBlockHeight;
    console.log(account.toString(), mint.toString(), wallet.toString(), amount)
    // 2. Add Memo Instruction
    tx.add(
        new TransactionInstruction({
            keys: [{
                isSigner: true,
                isWritable: true,
                pubkey: wallet,
                // }, {
                //     isSigner: false,
                //     isWritable: false,
                //     pubkey: hookWallet,
            }],
            data: Buffer.from(message, "utf-8"),
            programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
        }),
        new TransactionInstruction({
            keys: [{
                isSigner: false,
                isWritable: false,
                pubkey: hookWallet,
            }],
            programId: new PublicKey("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV"),
        }),
        createBurnInstruction(account, mint, wallet, amount * 10 ** 6)
    );

    // console.log(await connection.simulateTransaction(tx));
    // Serialize and return the unsigned transaction.
    const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false
    }).toString("base64");

    return Response.json({ transaction: serializedTransaction, blockhash, message })
}
