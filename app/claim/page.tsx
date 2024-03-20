'use client'

import MyMultiButton from '@/components/shared/MyMultiButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Head from 'next/head';

export default function ClaimPage() {
  const wallet = useWallet();

  return (
    <>
      <Head>
        <title>Claim.</title>
        <meta name="description" content="Claim." />
        <meta property="og:title" content="Claim." />
        <meta property="og:description" content="Claim." />
        <meta property="og:image" content="/dev_wif_hat_icon.png" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Claim." />
        <meta property="twitter:description" content="Claim." />
        <meta property="twitter:image" content="/dev_wif_hat_icon.png" />
        {/* Add any additional metadata here */}
      </Head>
      <main className='w-full my-20 border-b border-b-white border-opacity-50 min-h-[80vh]'>
        <div className="w-full px-2 flex flex-col items-center justify-center gap-4 h-full">
          <h1 style={{ textShadow: '0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red' }} className='text-xl md:text-2xl lg:text-6xl'>$DWH Claim.</h1>
          <span className='opacity-50'>DWH wants to give to the devs and founders</span>
          <div className="w-full my-10 relative flex items-center justify-center ">

            <div className="w-full flex flex-col items-center justify-center gap-4  rounded-xl">
              <div className="w-full  bg-opacity-70 flex items-center justify-center flex-col rounded-xl backdrop-blur-sm p-4 gap-4">

                <div className=" rounded-xl p-12 flex items-center justify-center flex-col bg-black border border-white border-opacity-50 backdrop-blur-xl bg-opacity-40">
                  <h2 className='opacity-50'>Claim your $DWH</h2>
                  {
                    wallet.publicKey ? <>
                      <p className='text-xl font-black'>420<br />$DWH</p>
                    </> : <>
                      <p>Connect your wallet to claim your $DWH tokens.</p>
                    </>
                  }
                </div>

                {
                  wallet.publicKey ? <>
                    <button className='w-1/2 p-2 rounded-[8px] btn bg-black border border-white text-white transition-all ease-in-out duration-400 font-black uppercase hover:scale-110'>
                      Claim WIF
                    </button>
                  </> : <>
                    {/* Wallet COnnect */}
                    <div className="flex items-center justify-center">
                      <MyMultiButton />
                    </div>
                  </>
                }

              </div>
            </div>


          </div>
        </div>
      </main>
    </>
  )
}