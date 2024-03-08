import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevWifHat (DWH)",
  description: "You either die a dev or live long enough to see yourself turn into a maxi. Shipping on a L1 near you, and remember.. what happens on chain, stays on chain.",
  icons: {
    icon: { url: '/dev_wif_hat_icon.png', type: 'image/png'}, // /public path
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
        <link rel="icon" href="/dev_wif_hat_icon.png" sizes="any" />
        {children}
      </body>
    </html>
  );
}
