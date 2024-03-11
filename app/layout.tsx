import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import AppBar from '@/components/shared/AppBar';
import Footer from '@/components/shared/Footer';

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
      <body className={inter.className}>
        <AppBar />
        <link rel="icon" href="/dev_wif_hat_icon.png" sizes="any" />
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
