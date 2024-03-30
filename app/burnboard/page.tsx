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
import Head from 'next/head';
import MyMultiButton from '@/components/shared/MyMultiButton';


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
      const response = await fetch(`/api/burn/${amount}`, {
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


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboard.leaderboard.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(leaderboard.leaderboard.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // add handle lastpage and previouspage
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  }

  const handleFirstPage = () => {
    setCurrentPage(1);
  }

  return (
    <>
      <Head>
        <title>BurnBoard - Burn your $DWH</title>
        <meta name="description" content="Participate in the BurnBoard event. Burn your $DWH tokens and get ranked among the top contributors." />
        <meta property="og:title" content="BurnBoard - Burn your $DWH" />
        <meta property="og:description" content="Participate in the BurnBoard event. Burn your $DWH tokens and get ranked among the top contributors." />
        <meta property="og:image" content="/path/to/your/image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="BurnBoard - Burn your $DWH" />
        <meta property="twitter:description" content="Participate in the BurnBoard event. Burn your $DWH tokens and get ranked among the top contributors." />
        <meta property="twitter:image" content="/path/to/your/twitter-image.jpg" />
        {/* Add any additional metadata here */}
      </Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-WDCZKHSTM8"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WDCZKHSTM8');
      `,
        }}
      ></script>
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
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2 bg-black border border-white border-opacity-50"
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
                className=""><QRCode value={`solana:https://www.devwifhat.xyz/api/burn/${amount}`} /></div>
            </div> : <button
              onClick={() => setShowQR(!showQR)}
              className="w-full rounded-xl border border-white border-opacity-50 opacity-50 flex items-center justify-center py-2">
              Show QR
            </button>}

            {/* Buttons */}
            <div className='mt-6 flex flex-col items-start justify-start gap-2'>
              <span className='opacity-50 text-lg'>Or connect and burn directly</span>
              {wallet.publicKey ? <button onClick={handleBurnTx} className='bg-black w-full border border-white rounded-xl btn'>
                {loading && <Spin />} Burn $DWH</button> :
                <MyMultiButton />
              }
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
                  <div className='w-full h-[40%] flex items-center justify-center'><Spin /></div>
                ) : leaderboard.error ? (
                  <div>Error loading leaderboard.</div>
                ) : (
                  currentItems.map((item, index) => {
                    const itemIndex = indexOfFirstItem + index;

                    return (
                      <div key={itemIndex} className="w-full flex items-center justify-between bg-black border-b border-b-white border-opacity-20 bg-opacity-50 p-4">
                        {itemIndex < 3 ? (
                          <img src={`/icons/${itemIndex + 1}.png`} alt={`Place ${itemIndex + 1}`} className="w-6 h-6" />
                        ) : (
                          <span className='text-xl font-bold'>{itemIndex + 1}</span>
                        )}
                        <span className='text-xl font-bold'>{truncateMiddle(item.wallet)}</span>
                        <span className='text-xl font-bold'>{item.amount.toLocaleString()}</span>
                      </div>
                    )
                  })
                )
              }
            </div>


            {/* Pagination */}
            <div className="w-full flex justify-between p-4 bg-black rounded-b-xl border-t border-t-white opacity-50 mt-4">
              <button
                disabled={currentPage === 1}
                className='flex items-center justify-center gap-2'
              >
                <svg
                  onClick={handleFirstPage}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
                <svg
                  onClick={handlePreviousPage}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages}
                className='flex items-center justify-center gap-2'
              >
                <svg
                  onClick={handleNextPage}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <svg
                  onClick={handleLastPage}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>

              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}