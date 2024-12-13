import { useState } from 'react'
import { QrCode } from 'lucide-react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import {
  Transaction,
  TransactionButton,
  TransactionError,
  TransactionResponse,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'
import {
  ERC20ABI,
  mintContractAddress,
} from '@/constants';
import type { Address, ContractFunctionParameters } from 'viem';
import { BarcodeScanner } from './scan-qr-code'
import { QRCodeSVG } from 'qrcode.react'
import { DEFAULT_CHAIN_ID } from '@/config'


interface Props {
  token?: any
  onClose?: any
  // any props that come into the component
}

export default function TransferPopup({ token, onClose } : Props) {
  const { address } = useAccount()
  const [showQR, setShowQR] = useState(false)
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<string>('0')
  const [showScanner, setShowScanner] = useState(false)

  const contracts = [
    {
      address: mintContractAddress,
      abi: ERC20ABI,
      functionName: 'mint',
      args: [recipient, amount.length ? ethers.parseUnits(amount,"ether").toString().replace('n', '') : 0],
    },
  ] as unknown as ContractFunctionParameters[];


  const handleTransfer = (e: any) => {
    e.preventDefault()
    // Here you would typically call a function to transfer tokens
    toast({
      title: "Transfer Successful",
      description: `${e.target.amount.value} ${token.symbol} has been sent.`,
      duration: 5000
    })
    onClose()
  }

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  const handleQRScan = (result: string) => {
    setRecipient(result);
    setShowScanner(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer {token.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleTransfer}>
        <div className="mb-4">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input 
              id="recipient" 
              placeholder="0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.001"
            />
          </div>
          <div className="flex justify-between gap-2">
            <Transaction
              contracts={contracts}
              chainId={DEFAULT_CHAIN_ID}
              onError={handleError}
              onSuccess={handleSuccess}
            >
              <TransactionButton text="Send" className='relative text-black left-0 border-black' />
              <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
              </TransactionStatus>
            </Transaction>
          </div>
          <div className="flex justify-between gap-2">
            <Button className='w-full' type="button" variant="outline" onClick={() => setShowQR(!showQR)}>
              <QrCode className="h-4 w-4 mr-2" />
              {showQR ? 'Ẩn' : 'Hiện'} Mã QR
            </Button>
            <Button className='w-full' type="button" variant="outline" onClick={() => setShowScanner(!showScanner)}>
              <QrCode className="h-4 w-4 mr-2" />
              {showScanner ? 'Tắt Camera' : 'Quét Mã QR'}
            </Button>
          </div>
        </form>
        {showScanner ? (
          <div className="mt-4">
            <BarcodeScanner 
              onScan={handleQRScan}
            />
          </div>
        ) : null}
        {showQR && (
          <div className="mt-4 text-center">
            <p>Quét mã QR này để nhận token:</p>
            <div className="mx-auto mt-2 flex justify-center">
              <QRCodeSVG
                value={address || ''}
                size={200}
                level="L"
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

