'use client';
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';

type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({
  className,
}: WalletWrapperParams) {
  return (
    <>
      <Wallet>
        <ConnectWallet
          className={className}
        >
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
      </Wallet>
    </>
  );
}