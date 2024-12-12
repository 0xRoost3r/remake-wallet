import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
 
export const sdk = createCoinbaseWalletSDK({
    appName: "Pi Smart Wallet",
    appLogoUrl: "https://example.com/logo.png",
    appChainIds: [84532],
    preference: {
        options: "smartWalletOnly",
        attribution: {
            auto: true,
        }
    },
});