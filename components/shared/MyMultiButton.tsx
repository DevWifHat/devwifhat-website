'use client'

import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function MyMultiButton() {
  const customClassNames = "glow-on-hover";

  return (
    <div className="relative z-[999]">
      <WalletMultiButtonDynamic className={customClassNames} />
    </div>
  );
}
