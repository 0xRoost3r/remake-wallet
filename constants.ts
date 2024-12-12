export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const nftContractAddress = '0x1e9932B30774b994c1ADf290e790754b3EBf44c5';
export const mintContractAddress = '0xBD9b27cf921d213b2e651D6438f1fA90C565Fa70';
export const mintABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256" 
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export const safeMintABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;