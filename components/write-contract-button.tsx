'use client'

import * as React from 'react'
import { useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { toast, useToast } from '@/hooks/use-toast'


interface WriteContractButtonProps {
  address: string
  abi: any
  functionName: string
  args: any[]
  buttonText?: string
  className?: string
  onSuccess?: () => void
  disabled?: boolean
}

export function WriteContractButton({
  address,
  abi,
  functionName,
  args,
  buttonText = 'Thực hiện',
  className,
  onSuccess,
  disabled
}: WriteContractButtonProps) {
  const { data: hash, writeContract, isPending, isError } = useWriteContract()
  const { toast } = useToast()
  const handleWrite = async () => {
    
    try {
      await writeContract({
        address: address as `0x${string}`,
        abi,
        functionName,
        args,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Transaction failed.",
        variant: "destructive",
        duration: 5000
      })
      console.error('Write contract error:', error)
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
        onClick={handleWrite}
        disabled={isPending || disabled }
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