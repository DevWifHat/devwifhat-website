'use client';

import { Adapter, WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { FC, ReactNode, useCallback } from 'react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Initialize wallets array outside of the component to prevent re-creation on every render
const wallets: Adapter[] = [];

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_HELIUS_URL!}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={false}>
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;