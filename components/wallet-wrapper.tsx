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
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';


type WalletWrapperParams = {
  text?: string;
  className?: string;
};
export default function WalletWrapper({
  className,
}: WalletWrapperParams) {
  return (
    // omitted for brevity
 
    <Wallet>
      <ConnectWallet>
        <ConnectWalletText>Log In</ConnectWalletText>
        <Avatar className="h-6 w-6" />
        <Name className='text-black' />
      </ConnectWallet>
      <WalletDropdown className='bg-gray-100'>
        <Identity 
          className="px-4 py-6 pb-2 hover:bg-black-200"
          hasCopyAddressOnClick
        >
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect className='hover:bg-black-200 pb-6' />
      </WalletDropdown>
    </Wallet>
  );
}