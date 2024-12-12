'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { TransactionError, TransactionResponse, TransactionStatusAction } from '@coinbase/onchainkit/transaction'
import { TransactionStatusLabel } from '@coinbase/onchainkit/transaction'
import { TransactionStatus } from '@coinbase/onchainkit/transaction'
import { TransactionButton } from '@coinbase/onchainkit/transaction'
import { Transaction } from '@coinbase/onchainkit/transaction'
import { DEFAULT_CHAIN_ID } from '@/config'
import { ERC20ABI, mintContractAddress } from '@/constants'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ContractFunctionParameters } from 'viem'
import { toast } from '@/hooks/use-toast'

interface ClaimPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClaimPopup({ isOpen, onClose }: ClaimPopupProps) {
    const { address } = useAccount()
    const contracts = [
        {
          address: mintContractAddress,
          abi: ERC20ABI,
          functionName: 'mint',
          args: [address,  ethers.parseUnits('1000',"ether").toString().replace('n', '')],
        },
    ] as unknown as ContractFunctionParameters[];
    
    
    const handleTransfer = (e: any) => {
    e.preventDefault()
    // Here you would typically call a function to transfer tokens
    toast({
        title: "Nhận Pi thành công",
        description: `Bạn đã nhận 1,000 Pi miễn phí`,
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">🎉 Chào mừng bạn! 🎉</DialogTitle>
          <DialogDescription className="text-center pt-4">
            <div className="flex justify-center mb-4">
              <Image 
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/16193.png" 
                alt="Pi Token" 
                width={80} 
                height={80}
                priority
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">
              Nhận ngay 1,000 Pi miễn phí
            </h2>
            <h3 className="text-sm text-muted-foreground">
              Nhận token để bắt đầu trải nghiệm Pi Smart Wallet
            </h3>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
        <Transaction
              contracts={contracts}
              chainId={DEFAULT_CHAIN_ID}
              onError={handleError}
              onSuccess={handleSuccess}
            >
              <TransactionButton text="Nhận 1,000 Pi miễn phí" className='relative text-black left-0 border-black border-2 border-solid rounded-lg' />
              <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
              </TransactionStatus>
            </Transaction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 