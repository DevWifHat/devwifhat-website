import dynamic from 'next/dynamic';
import React from 'react'

const WalletMultiButtonNoSSR = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const MyMultiButton = () => {
  return (
    <>
      <WalletMultiButtonNoSSR />
    </>
  )
}

export default MyMultiButton