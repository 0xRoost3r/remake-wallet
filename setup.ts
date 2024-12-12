import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
 
export const sdk = createCoinbaseWalletSDK({
    appName: "Pi Smart Wallet",
    appLogoUrl: "https://onchainkit.xyz/favicon/48x48.png?v4-19-24",
    appChainIds: [84532],
    preference: {
        options: "smartWalletOnly",
        attribution: {
            auto: true,
        }
    },
});