'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { toast } from 'sonner';
import { Spin } from 'antd';
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_URL_BIS!);

const WalletMultiButtonNoSSR = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function OnlyUp() {
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | string>("");
  const [output, setOuput] = useState<number | string>("");
  const [slippage, setSlippage] = useState<number | string>(100);

  useEffect(() => {
    if(Number(amount) > 0) {
      fetchQuote();
    }
  }, [amount])


  const fetchQuote = async () => {
    if (!wallet.publicKey) {
        toast.error("Wallet is not connected")
        return;
      }
  
      const numericAmount = Number(amount)* 10 ** 9;
      if (isNaN(numericAmount) || numericAmount < 1 || !Number.isInteger(numericAmount)) {
        console.log("numericAmount", numericAmount);
        toast.error("Amount must be a full number and at least 1")
        return;
      }
  
      const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL_BIS!).use(mplTokenMetadata());
      umi.use(walletAdapterIdentity(wallet, true));
  
      setLoading(true);
  
      try {
      const quoteResponse = await (
          await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o&amount=${numericAmount}&slippageBps=${slippage}`)
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

    const numericAmount = Number(amount)* 10 ** 9;
    if (isNaN(numericAmount) || numericAmount < 1 || !Number.isInteger(numericAmount)) {
        console.log("numericAmount", numericAmount);
      toast.error("Amount must be a full number and at least 1")
      return;
    }

    setLoading(true);

    try {
    const quoteResponse = await (
        await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o&amount=${numericAmount}&slippageBps=100`)
    ).json();

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
            dynamicComputeUnitLimit: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
            // prioritizationFeeLamports: "auto",
            prioritizationFeeLamports: {
              autoMultiplier: 2,
            },
      // feeAccount: "fee_account_public_key"
        })
        })
    ).json();

    // deserialize the transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    // sign the transaction

    if(wallet && wallet.signTransaction) {
        // sign the transaction
        const signedTx = await wallet.signTransaction(transaction);
        // Execute the transaction
        const rawTransaction = signedTx.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
        preflightCommitment: "confirmed"
        });
        console.log(`https://solscan.io/tx/${txid}`);
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
        <div className="flex justify-start text-slate-300 w-full">
          <div className="w-2/4 lg:w-1/3 mx-auto">
            <div className="flex flex-col justify-between bg-slate-300 p-4 rounded-t-2xl border border-slate-300 h-1/2">
              <div className="flex justify-between">
                <span className="text-slate-900">OnlyUp</span>
                <div className="flex justify-end">
                  <div className="grid grid-flow-col gap-4">
                    <button
                      type="button"
                      className="flex items-center text-slate-900 hover:animate-spin-slow min-w-5 min-h-5 group relative focus:outline-none border:none"
                    >
                      <span className="rounded-full absolute inset-0 -ml-1 -mr-1 -mb-1 -mt-1 group-hover:bg-slate-900 group-hover:bg-opacity-[0.08]"></span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        width="20"
                        height="20"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <span className='text-slate-900'>SOL</span>
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
              <p className='text-slate-800'>estimated price: 900$</p>
            </div>
            <div className="flex items-center justify-center -mt-[12px] -mb-[12px] z-10">
              <button
                type="button"
                className="group bg-slate-900 p-0.5 border-2 border-slate-300 transition-all rounded-full hover:ring-2 hover:ring-slate-900 cursor-pointer"
              >
                <div className="transition-all rotate-0 group-hover:rotate-180 group-hover:delay-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    width="16"
                    height="16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="bg-black-700 border rounded-b-2xl border-slate-300 p-4">
            <span>DWH</span>
            <input
                type="number"
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2 bg-black border border-white border-opacity-50"
                min="1"
                placeholder="1000000" // Placeholder shown when input is empty
                value={output}
                readOnly            
              />
            <p className='text-slate-300'>estimated price: 900$</p>
              {/* <button
                className="bg-blue-500 rounded-xl p-2 mx-auto my-4 w-full"
                onClick={swap}
              >
                Buy
              </button> */}
              {/* <button className='bg-white bg-opacity-0 mx-auto hover:bg-opacity-10'>
            <a onClick={swap} className='border border-white border-opacity-50 rounded-[6px] p-2 md:px-4 text-sm md:text-base flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text'>
              Buy
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3646 6.0299L0.597563 10.7969C0.526053 10.8661 0.469028 10.9487 0.429814 11.0402C0.3906 11.1316 0.369983 11.2299 0.369166 11.3293C0.368349 11.4288 0.387348 11.5274 0.425055 11.6194C0.462762 11.7115 0.518421 11.7951 0.588786 11.8654C0.65915 11.9357 0.74281 11.9913 0.834885 12.0289C0.926959 12.0665 1.0256 12.0854 1.12506 12.0845C1.22452 12.0836 1.3228 12.0629 1.41417 12.0236C1.50554 11.9843 1.58817 11.9272 1.65724 11.8556L6.95361 6.55924C7.09388 6.41879 7.17267 6.2284 7.17267 6.0299C7.17267 5.8314 7.09388 5.64101 6.95361 5.50056L1.65724 0.203193C1.5159 0.0668103 1.32665 -0.00860314 1.13025 -0.00680449C0.933844 -0.00500583 0.746006 0.0738609 0.607188 0.212809C0.468371 0.351757 0.389681 0.53967 0.388068 0.736073C0.386454 0.932476 0.462046 1.12166 0.598562 1.26287L5.3646 6.0299ZM7.7576 9.48557C7.55894 9.48557 7.36841 9.56449 7.22794 9.70497C7.08746 9.84545 7.00854 10.036 7.00854 10.2346C7.00854 10.4333 7.08746 10.6238 7.22794 10.7643C7.36841 10.9048 7.55894 10.9837 7.7576 10.9837H13.2507C13.4494 10.9837 13.6399 10.9048 13.7804 10.7643C13.9209 10.6238 13.9998 10.4333 13.9998 10.2346C13.9998 10.036 13.9209 9.84545 13.7804 9.70497C13.6399 9.56449 13.4494 9.48557 13.2507 9.48557H7.7576Z" fill="#848D97" />
              </svg>
            </a>
          </button> */}
              <div className='mt-2 flex flex-col items-start justify-start gap-2'>
              {wallet.publicKey ? <button onClick={handleSwap} className='bg-black w-full border border-white rounded-xl btn'>{loading && <Spin />} BUY</button> : <div className="w-full flex items-center justify-center border border-white opacity-50 rounded-xl"><WalletMultiButtonNoSSR /></div>}
            </div>
            </div>
        </div>
      </div>
          
          </div>
      </section>
    </>
  )
}