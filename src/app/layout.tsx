import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaniAsset | Tokenized Real-World Agricultural Assets",
  description: "Connect real-world agricultural assets to blockchain infrastructure using Stellar Testnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col text-slate-900 bg-slate-50 relative selection:bg-emerald-200 selection:text-emerald-900`}>
        {/* Ambient background decoration */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <DisclaimerBanner />
        <Navbar />
        <main className="flex-grow z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
