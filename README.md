# ReWallet

A fast, open-source web wallet built for Base Chain, designed to help you quickly integrate wallet functionality into your project.

## Project Structure
```plaintext
rewallet/
├── app/ # Next.js app router
│ ├── fund/ # Token and transaction management pages
│ ├── layout.tsx # App-wide layout
│ └── page.tsx # Homepage
├── components/ # Reusable React components
│ ├── ui/ # Base UI components
│ ├── onchain-provider.tsx # Web3 provider
│ ├── scan-qr-code.tsx # QR code scanner
│ ├── token-list.ts # Supported tokens list
│ ├── transfer-native-button.tsx # Native token transfer button
│ └── write-contract-button.tsx # Smart contract interaction button
├── constants/ # Constants and configurations
├── hooks/ # Custom React hooks
├── public/ # Static assets
└── styles/ # CSS and style definitions
```

## Core Features
### Token Management
- View token balances
- Send and receive tokens
- Multi-token support
- QR code scanning for wallet addresses

### Blockchain Integration
- Web3 wallet connection
- Smart contract interactions
- Native token transactions
- Transaction status tracking

### UI/UX
- User-friendly interface
- Responsive design
- Loading states and error handling
- Toast notifications

### Security
- Wallet address verification
- Transaction validation
- Secure error handling

## Tech Stack

- Next.js 15+ with App Router
- TypeScript
- TailwindCSS
- wagmi & viem for Web3
- RainbowKit for wallet connection
- shadcn/ui for components

## Setup & Development
### Install Dependencies    
```bash
pnpm install
```
### Run Development Server
```bash
pnpm dev
```
### Build for Production
```bash
pnpm build
```
### Run Tests
```bash
pnpm test
```

## Environment Setup

Create `.env.local` with required environment variables:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
# See https://www.coinbase.com/developer-platform/products/base-node
NEXT_PUBLIC_CDP_API_KEY=""
NEXT_PUBLIC_ENVIRONMENT="development"
# See https://cloud.walletconnect.com/
NEXT_PUBLIC_WC_PROJECT_ID=""
NEXT_PUBLIC_DEFAULT_CHAIN_ID=84532
```
