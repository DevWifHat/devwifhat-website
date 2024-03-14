'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import QRCode from "react-qr-code";
import { truncateMiddle } from '@/lib/utils';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { walletAdapterIdentity} from "@metaplex-foundation/umi-signer-wallet-adapters"
import { toast } from 'sonner';

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

  const [amount, setAmount] = useState<number | string>("");

  const handleBurnTx = async () => {
    console.log("Requesting wallet sig");

    const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS_URL!).use(mplTokenMetadata());
    umi.use(walletAdapterIdentity(wallet, true));

    const response = await fetch(`/burn/${amount}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account: wallet.publicKey!.toString() }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create burn transaction');
    }
    const base64Transaction = data.transaction;
    const serializedTransaction = Buffer.from(base64Transaction, 'base64');

    const umiTx = umi.transactions.deserialize(serializedTransaction);

    try {
      const sig = await umi.rpc.sendTransaction(umiTx);
      console.log(sig);

    } catch (error) {
      toast.error((error as Error).message);
    }
  }

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
          <input
            type="number"
            className="w-full input input-bordered rounded-xl py-2 px-6 mb-4"
            min="1"
            placeholder="1000000" // Placeholder shown when input is empty
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update state with the input's new value
            onFocus={(e) => e.target.value === '1000000' ? setAmount('') : null} // Clear the input when focused if the value is '1000'
            onBlur={(e) => e.target.value === '' ? setAmount('1000') : null} // Reset to '1000' if input is left empty
          />
            <p>Scan with a mobile wallet</p>
            <div style={{ background: 'white', padding: '16px' }}>
              <QRCode value={`solana:https://www.devwifhat.xyz/burn/${amount}`} />
            </div>
            <div>
              <p>Or connect and burn directly</p>
              {wallet.publicKey ? <button onClick={handleBurnTx} className='bg-black w-full border border-white rounded-xl btn'>Burn $DWH</button> : <WalletMultiButtonNoSSR />}
            </div>
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