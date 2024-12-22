import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OnchainProviders from "@/components/onchain-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remake Wallet",
  description: "Remake Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <div className="max-w-md mx-auto border border-black">
          <OnchainProviders>{children}</OnchainProviders>
          <Toaster/>
          <div className="fixed bottom-6 right-6">
            <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F0xRoost3r%2Fremake-wallet.git&env=NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,NEXT_PUBLIC_CDP_API_KEY,NEXT_PUBLIC_ENVIRONMENT,NEXT_PUBLIC_WC_PROJECT_ID,NEXT_PUBLIC_DEFAULT_CHAIN_ID&project-name=remake-walelt&repository-name=remake-wallet"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
          </div>
        </div>
      </body>
    </html>
  );
}
