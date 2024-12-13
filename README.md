# Pi Smart Wallet

Ví điện tử thông minh tích hợp với Pi Network, cho phép người dùng quản lý và giao dịch token một cách dễ dàng.

## Cấu trúc thư mục
pi-smart-wallet/
├── app/ # Next.js app router
│ ├── fund/ # Trang quản lý token và giao dịch
│ ├── layout.tsx # Layout chung cho ứng dụng
│ └── page.tsx # Trang chủ
├── components/ # React components có thể tái sử dụng
│ ├── ui/ # Components UI cơ bản
│ ├── onchain-provider.tsx # Provider cho Web3
│ ├── scan-qr-code.tsx # Component quét mã QR
│ ├── token-list.ts # Danh sách token được hỗ trợ
│ ├── transfer-native-button.tsx # Button chuyển token gốc
│ └── write-contract-button.tsx # Button tương tác với smart contract
├── constants/ # Các hằng số và cấu hình
├── hooks/ # Custom React hooks
├── public/ # Assets tĩnh
└── styles/ # CSS và style definitions

## Tính năng chính
### Quản lý Token
- Xem số dư các loại token
- Gửi và nhận token
- Hỗ trợ nhiều loại token khác nhau
- Quét mã QR để nhận địa chỉ ví

### Tương tác với Blockchain
- Kết nối với ví Web3
- Tương tác với smart contracts
- Xử lý giao dịch native token
- Theo dõi trạng thái giao dịch

### UI/UX
- Giao diện thân thiện người dùng
- Responsive design
- Loading states và error handling
- Toast notifications

### Bảo mật
- Xác thực địa chỉ ví
- Kiểm tra tính hợp lệ của giao dịch
- Xử lý lỗi an toàn

## Công nghệ sử dụng

- Next.js 15+ với App Router
- TypeScript
- TailwindCSS
- wagmi & viem cho Web3
- RainbowKit cho wallet connection
- shadcn/ui cho components

## Cài đặt và Phát triển
### Cài đặt dependencies    
```bash
pnpm install
```
### Chạy môi trường development
```bash
pnpm dev
```
### Build production
``` bash 
pnpm build
```
### Chạy tests
```bash
pnpm test
```

## Môi trường

Tạo file `.env.local` với các biến môi trường cần thiết:

```bash
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_CHAIN_ID=your_chain_id
NEXT_PUBLIC_CHAIN_NAME=your_chain_name
NEXT_PUBLIC_CHAIN_RPC_URL=your_chain_rpc_url
NEXT_PUBLIC_CHAIN_BLOCK_EXPLORER_URL=your_chain_block_explorer_url
NEXT_PUBLIC_CHAIN_BLOCK_EXPLORER_API_KEY=your_chain_block_explorer_api_key
```
