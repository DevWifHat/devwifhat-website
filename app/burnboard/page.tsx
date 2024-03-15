'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import QRCode from "react-qr-code";
import { truncateMiddle } from '@/lib/utils';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { toast } from 'sonner';
import { base58 } from '@metaplex-foundation/umi-serializers-encodings';
import { Spin } from 'antd';
import useLeaderboard from '@/hooks/useLeaderboard';
import useTokenData from '@/hooks/useTokenData';

const WalletMultiButtonNoSSR = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Burnboard() {
  const wallet = useWallet();
  const leaderboard = useLeaderboard();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | string>("");

  const { currentSupply, isLoading } = useTokenData();

  const totalSupply = 760000000;
  const currentSupplyValue = currentSupply / Math.pow(10, 6);
  const burnedAmount = totalSupply - currentSupplyValue;

  const handleBurnTx = async () => {
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
      const { transaction, blockhash } = data;
      const serializedTransaction = Buffer.from(transaction, 'base64');

      let umiTx = umi.transactions.deserialize(serializedTransaction);

      umiTx = await umi.identity.signTransaction(umiTx)

      const sig = await umi.rpc.sendTransaction(umiTx);
      const stringSig = base58.deserialize(sig);
      console.log(stringSig);
      const conf = await umi.rpc.confirmTransaction(sig, {
        strategy: {
          type: "blockhash",
          blockhash: blockhash.blockhash,
          lastValidBlockHeight: blockhash.lastValidBlockHeight,
        },
        commitment: "confirmed"
      });
      console.log(conf);
      toast.success("Burn successful")
      leaderboard.reload();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false)
    }
  }

  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <section className="my-10 w-full">
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          {/* Title */}
          <div className='text-center '>
            <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>BurnBoard</h1>
            <span className='opacity-50'>Burn your $DWH and get ranked</span>
          </div>

          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 ">
            <div className="w-full flex flex-col items-center justify-center gap-2 py-4  border border-white bg-black border-opacity-50  rounded-xl">
              <span className='text-xl font-black uppercase'>🔥 Burned 🔥</span>
              <span className='text-4xl font-black'>
                {isLoading ? <Spin /> : <>{burnedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $DWH</>}
              </span>
            </div>
          </div>

          {/* Button */}

          <div className="text-center bg-black max-w-xl mx-auto  border border-white rounded-xl border-opacity-50 mt-8 p-6 ">
            {/* Input Amount  */}
            <div className="w-full flex flex-col items-start justify-start gap-2 mb-4 ">
              <span className='opacity-50 text-lg'>Enter Amount</span>
              <input
                type="number"
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2"
                min="1"
                placeholder="1000000" // Placeholder shown when input is empty
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update state with the input's new value
                onFocus={(e) => e.target.value === '1000000' ? setAmount('') : null} // Clear the input when focused if the value is '1000'
                onBlur={(e) => e.target.value === '' ? setAmount('1000') : null} // Reset to '1000' if input is left empty
              />
            </div>

            {/* QR CODE */}
            <span className='opacity-50 text-lg'>Scan with your Mobile Wallet</span>
            {showQR ? <div style={{ background: 'white', padding: '16px' }}>
              <div
                onClick={() => setShowQR(!showQR)}
                className=""><QRCode value={`solana:https://www.devwifhat.xyz/burn/${amount}`} /></div>
            </div> : <button
              onClick={() => setShowQR(!showQR)}
              className="w-full rounded-xl border border-white border-opacity-50 opacity-50 flex items-center justify-center py-2">
              Show QR
            </button>}

            {/* Buttons */}
            <div className='mt-6 flex flex-col items-start justify-start gap-2'>
              <span className='opacity-50 text-lg'>Or connect and burn directly</span>
              {wallet.publicKey ? <button onClick={handleBurnTx} className='bg-black w-full border border-white rounded-xl btn'>{loading && <Spin />} Burn $DWH</button> : <div className="w-full flex items-center justify-center border border-white opacity-50 rounded-xl"><WalletMultiButtonNoSSR /></div>}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center border border-white border-opacity-50 mt-10 rounded-xl">
            <div className="w-full  px-4 py-2 flex flex-row items-center justify-between border-b border-b-white border-opacity-50 ">
              <span className='text-xl font-bold'>S.No</span>
              <span className='text-xl font-bold'>Address</span>
              <span className='text-xl font-bold'>Burn Amount</span>
            </div>
            <div className="w-full   flex flex-col items-start justify-start gap-4">
              {
                leaderboard.isLoading ? (
                  <div className='w-full h-[20%] flex items-center justify-center'><Spin /></div>
                ) : leaderboard.error ? (
                  <div>Error loading leaderboard.</div>
                ) : (
                  leaderboard.leaderboard.map((item, index) => {
                    return (
                      <div key={index} className="w-full flex items-center justify-between bg-black border-b border-b-white border-opacity-20 bg-opacity-50 p-4">
                        {index < 3 ? (
                          <img src={`/icons/${index + 1}.png`} alt={`Place ${index + 1}`} className="w-6 h-6" />
                        ) : (
                          <span className='text-xl font-bold'>{index + 1}</span>
                        )}
                        <span className='text-xl font-bold'>{truncateMiddle(item.wallet)}</span>
                        <span className='text-xl font-bold'>{item.amount.toLocaleString()}</span>
                      </div>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}