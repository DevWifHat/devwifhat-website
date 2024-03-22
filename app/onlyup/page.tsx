'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { toast } from 'sonner';
import { base58 } from '@metaplex-foundation/umi-serializers-encodings';
import { Spin } from 'antd';
import { Transaction } from '@solana/web3.js';
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_URL!);

const WalletMultiButtonNoSSR = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function OnlyUp() {
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | string>("");
  const [output, setOuput] = useState<number | string>("");

  useEffect(() => {
    fetchQuote();
  }, [amount])


  const fetchQuote = async () => {
    if (!wallet.publicKey) {
        toast.error("Wallet is not connected")
        return;
      }
  
      const numericAmount = Number(amount)* 10 ** 9;
      if (isNaN(numericAmount) || numericAmount < 1 || !Number.isInteger(numericAmount)) {
        toast.error("Amount must be a full number and at least 1")
        return;
      }
  
      const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!).use(mplTokenMetadata());
      umi.use(walletAdapterIdentity(wallet, true));
  
      setLoading(true);
  
      try {
        // Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
      const quoteResponse = await (
          await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o&amount=${numericAmount}&slippageBps=50`)
      ).json();
      console.log({ quoteResponse })
      setOuput(quoteResponse.outAmount / 10 ** 6);
      } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = async () => {
    if (!wallet.publicKey) {
      toast.error("Wallet is not connected")
      return;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 1 || !Number.isInteger(numericAmount)) {
      toast.error("Amount must be a full number and at least 1")
      return;
    }

    const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!).use(mplTokenMetadata());
    umi.use(walletAdapterIdentity(wallet, true));

    setLoading(true);

    try {
      // Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
    const quoteResponse = await (
        await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o&amount=${numericAmount}&slippageBps=50`)
    ).json();
    console.log({ quoteResponse })
    setOuput(quoteResponse.outputAmount);
      // get serialized transactions for the swap
    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse,
            // user public key to be used for the swap
            userPublicKey: wallet.publicKey.toString(),
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
        })
        })
    ).json();

    // deserialize the transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    if(wallet && wallet.signTransaction) {
        // sign the transaction
        const signedTx = await wallet.signTransaction(transaction);
        // Execute the transaction
        const rawTransaction = signedTx.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2
        });
        await connection.confirmTransaction(txid);
        console.log(`https://solscan.io/tx/${txid}`);
    } else {
        console.log('no wallet or signTransaction method');
    }
    
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="my-10 w-full">
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          {/* Title */}
          <div className='text-center '>
            <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>OnlyUp</h1>
            <span className='opacity-50'>Buy $DWH and hodl.</span>
          </div>

          {/* Button */}

          <div className="text-center bg-black max-w-xl mx-auto  border border-white rounded-xl border-opacity-50 mt-8 p-6 ">
            {/* Input Amount  */}
            <div className="w-full flex flex-col items-start justify-start gap-2 mb-4 ">
              <span className='opacity-50 text-lg'>You're paying</span>
              <input
                type="number"
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2 bg-black border border-white border-opacity-50"
                min="1"
                placeholder="1000000" // Placeholder shown when input is empty
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update state with the input's new value
                onFocus={(e) => e.target.value === '1000000' ? setAmount('') : null} // Clear the input when focused if the value is '1000'
                onBlur={(e) => e.target.value === '' ? setAmount('1000') : null} // Reset to '1000' if input is left empty
              />
            </div>
            {/* Output Amount  */}
            <div className="w-full flex flex-col items-start justify-start gap-2 mb-4 ">
              <span className='opacity-50 text-lg'>To receive</span>
              <input
                type="number"
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2 bg-black border border-white border-opacity-50"
                min="1"
                placeholder="1000000" // Placeholder shown when input is empty
                value={output}
                readOnly            
              />
            </div>

            {/* Buttons */}
            <div className='mt-6 flex flex-col items-start justify-start gap-2'>
              <span className='opacity-50 text-lg'>Buy and hodl</span>
              {wallet.publicKey ? <button onClick={handleSwap} className='bg-black w-full border border-white rounded-xl btn'>{loading && <Spin />} OnlyUp</button> : <div className="w-full flex items-center justify-center border border-white opacity-50 rounded-xl"><WalletMultiButtonNoSSR /></div>}
            </div>
          </div>

          </div>
      </section>
    </>
  )
}