import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import AppBar from '@/components/shared/AppBar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'sonner'
import Disclaimer from '@/components/shared/Disclaimer';

import dynamic from 'next/dynamic';

// Import Disclaimer with SSR disabled
const DisclaimerWithNoSSR = dynamic(() => import('../components/shared/Disclaimer'), {
  ssr: false,
});

const inter = Anonymous_Pro({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevWifHat (DWH)",
  description: "You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.",
  icons: {
    icon: { url: '/dev_wif_hat_icon.png', type: 'image/png' }, // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <AppBar />
        <DisclaimerWithNoSSR />
        <link rel="icon" href="/dev_wif_hat_icon.png" sizes="any" />
        <div className="w-full max-w-7xl mx-auto relative">
          {children}
        </div>
        <Footer />
        <Toaster theme='dark' />
      </body>
    </html>
  );
}
