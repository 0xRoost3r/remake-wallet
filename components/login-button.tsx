'use client';
import WalletWrapper from '@/components/wallet-wrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[300px"
      text="Connect"
      withWalletAggregator={true}
    />
  );
}