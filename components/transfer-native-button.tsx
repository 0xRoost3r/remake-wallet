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
  buttonText = 'Gửi Token',
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
        title: "Lỗi",
        description: "Không thể thực hiện giao dịch. Vui lòng thử lại.",
        variant: "destructive",
      })
      console.error('Send transaction error:', error)
    }
  }

  React.useEffect(() => {
    if (hash) {
      toast({
        title: "Thành công", 
        description: `Hash giao dịch: ${hash}`,
      })
      onSuccess?.()
    }
  }, [hash, onSuccess])

  return (
    <div>
      <Button 
        onClick={handleSend}
        disabled={isPending}
        className={className}
      >
        {isPending ? 'Đang xử lý...' : buttonText}
      </Button>
      {isError && (
        <p className="text-red-500 text-sm mt-2">
          Đã xảy ra lỗi. Vui lòng thử lại.
        </p>
      )}
    </div>
  )
}