import { publicKey } from '@metaplex-foundation/umi'
import { TokenStandard, burnV1 } from '@metaplex-foundation/mpl-token-metadata'
import { createNoopSigner, signerIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'

// Use the RPC endpoint of your choice.
const hookWallet = publicKey("DeVwhQE3FsUcqXq3AKjdwwjLVZZqaz9URwLghMUCtN4u");
const mint = publicKey("DevwHyy46NcEduCJ32WwsJFUirifWgvSdSGUNEj6DrVM");
const umi = createUmi(`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`).use(mplTokenMetadata());

umi.use(signerIdentity(createNoopSigner(hookWallet)));


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

    const account = body?.account;
    if (!account) throw new Error("missing account");

    const amount = parseInt(params.amount || "69000000");
    const wallet = publicKey(account);
    const walletSigner = createNoopSigner(wallet);

    const tx = await burnV1(umi, {
        mint,
        authority: walletSigner,
        tokenOwner: wallet,
        tokenStandard: TokenStandard.Fungible,
        amount: amount
    }).addRemainingAccounts({
        isSigner: false,
        isWritable: false,
        pubkey: hookWallet,
    }).setFeePayer(walletSigner).setLatestBlockhash(umi);


    // Serialize and return the unsigned transaction.
    const serializedTransaction = umi.transactions.serialize(tx.build(umi));

    const base64Transaction = Buffer.from(serializedTransaction).toString("base64");
    const message = "Burn your $DWH, Dev is watching you.";

    return Response.json({ transaction: base64Transaction, message })
}
