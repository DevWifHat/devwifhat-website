'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const WalletMultiButtonNoSSR = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Burnboard() {
  const wallet = useWallet();

  const dummyData = [
    { rank: 1, address: '0x123456789', amount: 100 },
    { rank: 2, address: '0x123456789', amount: 90 },
    { rank: 3, address: '0x123456789', amount: 80 },
    { rank: 4, address: '0x123456789', amount: 70 },
    { rank: 5, address: '0x123456789', amount: 60 },
    { rank: 6, address: '0x123456789', amount: 50 },
    { rank: 7, address: '0x123456789', amount: 40 },
    { rank: 8, address: '0x123456789', amount: 30 },
    { rank: 9, address: '0x123456789', amount: 20 },
    { rank: 10, address: '0x123456789', amount: 10 },
  ]

  function truncateMiddle(text: string, startChars = 3, endChars = 3, separator = '...') {
    if (text.length <= startChars + endChars) {
      return text;
    }
    return `${text.substring(0, startChars)}${separator}${text.substring(text.length - endChars)}`;
  }

  const [loading, setLoading] = useState(false)

  return (
    <>
      <section className="my-10 w-full">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Title */}
          <div className='text-center'>
            <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>BurnBoard</h1>
            <span className='opacity-50'>Burn your $DWH and get ranked</span>
          </div>

          {/* Button */}

          <div className="text-center bg-black max-w-xl mx-auto rounded-lg border border-white border-opacity-30 mt-8 p-6">
            <input type="number" className="w-full input input-bordered rounded-xl py-2 px-6 mb-4" min="1" />
            {wallet.publicKey ? <button className='bg-black w-full border border-white rounded-xl btn'>Burn $DWH</button> : <WalletMultiButtonNoSSR />}
          </div>


          {/* Leaderboard */}

          <div className="w-full max-w-xl mx-auto mt-8 flex flex-col items-start justify-start gap-4">
            {
              dummyData.map((item, index) => {
                return (
                  <div key={index} className="w-full flex items-center justify-between bg-black border-b border-b-white border-opacity-20 bg-opacity-50 rounded-xl p-4">
                    <span className='text-xl font-bold'>{item.rank}</span>
                    <span className='text-xl font-bold'>{truncateMiddle(item.address)}</span>
                    <span className='text-xl font-bold'>{item.amount}</span>
                  </div>
                )
              })
            }
          </div>

        </div>
      </section>
    </>
  )
}