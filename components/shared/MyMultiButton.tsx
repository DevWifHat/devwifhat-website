'use client'

import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function MyMultiButton() {
  const customClassNames = "bg-blue-500 text-white hover:bg-blue-700";

  return (
    <div className=" relative z-[999]">
      <WalletMultiButtonDynamic className={customClassNames} />
    </div>
  );
}
