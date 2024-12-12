import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { DEFAULT_CHAIN_ID } from './config';
 
export const sdk = createCoinbaseWalletSDK({
    appName: "Pi Smart Wallet",
    appLogoUrl: "https://onchainkit.xyz/favicon/48x48.png?v4-19-24",
    appChainIds: [DEFAULT_CHAIN_ID],
    preference: {
        options: "smartWalletOnly",
        attribution: {
            auto: true,
        }
    },
});