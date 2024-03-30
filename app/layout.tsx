import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import Footer from '@/components/shared/Footer';
import { Toaster } from 'sonner'
require("@solana/wallet-adapter-react-ui/styles.css");

import dynamic from 'next/dynamic';
import ContextProvider from '@/context/ContextProvider';
import NewAppBar from '@/components/shared/NewAppBar';
import ScrollUp from '@/components/shared/ScrollUp';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';

// Import Disclaimer with SSR disabled
const DisclaimerWithNoSSR = dynamic(() => import('../components/shared/Disclaimer'), {
  ssr: false,
});



const inter = Anonymous_Pro({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevWifHat (DWH)",
  description: "You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.",
  icons: [
    {
      url: '/dev_wif_hat_icon.png',
      type: 'image/png',
      sizes: 'any' // Specify sizes if necessary, 'any' is used as a placeholder
    }
  ],
  // Adding Open Graph (OG) image
  openGraph: {
    title: "DevWifHat (DWH)", // OG title (optional if you want it different from the main title)
    description: "You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.", // OG description (optional if you want it different from the main description)
    images: {
      url: '/dev_wif_hat_icon.png', // Specify the path to your OG image
      type: 'image/png',
      width: '1200', // Specify the width of your OG image
      height: '630', // Specify the height of your OG image
      alt: 'You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.',
    },
  },
  // Adding Twitter card information
  twitter: {
    card: 'summary_large_image', // Use "summary_large_image" for large image card or "summary" for small
    site: '@thedevwifhat', // Your Twitter handle
    creator: '@thedevwifhat', // The Twitter handle of the content creator
    images: {
      url: '/dev_wif_hat_icon.png', // Path to the image for Twitter card
      alt: 'You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();

  return (
    <html lang="en">
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
      <ContextProvider>
        <body className={` relative`}>
          {/* <AppBar /> */}
          <NewAppBar />
          <DisclaimerWithNoSSR />
          <link rel="icon" href="/dev_wif_hat_icon.png" sizes="any" />
          <div className="w-full mx-auto relative">
            {children}
          </div>
          <ScrollUp />
          <Footer />
          <Toaster theme='dark' />
        </body>
      </ContextProvider>
    </html>
  );
}
