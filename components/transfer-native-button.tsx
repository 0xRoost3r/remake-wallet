'use client'

import * as React from 'react'
import { useSendTransaction } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { parseEther } from 'viem'

interface TransferNativeButtonProps {
  to: string
  amount: string
  buttonText?: string
  className?: string
  onSuccess?: () => void
  disabled?: boolean
}

export function TransferNativeButton({
  to,
  amount,
  buttonText = 'Send',
  className,
  onSuccess
}: TransferNativeButtonProps) {
  const { data: hash, sendTransaction, isPending, isError } = useSendTransaction()
  const { toast } = useToast()

  const handleSend = async () => {
    try {
      await sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(amount || '0')
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Transaction failed.",
        variant: "destructive",
        duration: 5000
      })
      console.error('Send transaction error:', error)
    }
  }

  React.useEffect(() => {
    if (hash) {
      toast({
        title: "Success", 
        description: `Transaction hash: ${hash}`,
        duration: 5000
      })
      onSuccess?.()
    }
  }, [hash])

  return (
    <div>
      <Button 
        onClick={handleSend}
        disabled={isPending}
        className={className}
      >
        {isPending ? 'Processing...' : buttonText}
      </Button>
      {isError && (
        <p className="text-red-500 text-sm mt-2">
          Error. Please try again.
        </p>
      )}
    </div>
  )
}