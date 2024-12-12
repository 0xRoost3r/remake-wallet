import { useState } from 'react'
import { QrCode } from 'lucide-react'
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
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '@/constants';
import type { Address, ContractFunctionParameters } from 'viem';


interface Props {
  token?: any
  onClose?: any
  // any props that come into the component
}

export default function TransferPopup({ token, onClose } : Props) {
  const [showQR, setShowQR] = useState(false)

  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mint',
      args: ['0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66', '1000000000000000000000'],
    },
  ] as unknown as ContractFunctionParameters[];


  const handleTransfer = (e: any) => {
    e.preventDefault()
    // Here you would typically call a function to transfer tokens
    toast({
      title: "Transfer Successful",
      description: `${e.target.amount.value} ${token.symbol} has been sent.`,
    })
    onClose()
  }

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
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
            <Input id="recipient" placeholder="0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66" />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="1000" />
          </div>
          <div className="flex justify-between">
            <Transaction
              contracts={contracts}
              chainId={BASE_SEPOLIA_CHAIN_ID}
              onError={handleError}
              onSuccess={handleSuccess}
            >
              <TransactionButton text="Send" className='relative left-0 border-black' />
            </Transaction>
            <Button type="button" variant="outline" onClick={() => setShowQR(!showQR)}>
              <QrCode className="mr-2 h-4 w-4" />
              {showQR ? 'Hide' : 'Show'} QR Code
            </Button>
          </div>
        </form>
        {showQR && (
          <div className="mt-4 text-center">
            <p>Scan this QR code to receive tokens:</p>
            <img src="https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=200&width=200" alt="QR Code" className="mx-auto mt-2" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

