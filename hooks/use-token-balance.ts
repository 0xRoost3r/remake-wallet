import { useBalance, useReadContract } from 'wagmi'
import { ERC20ABI, ETH_ADDRESS } from '@/constants'

export function useTokenBalance(tokenAddress: string, walletAddress?: string) {
  const isNativeToken = tokenAddress.toLowerCase() === ETH_ADDRESS.toLowerCase()

  const { data: nativeBalance } = useBalance({
    address: walletAddress as `0x${string}`,
  })

  const { data: tokenBalance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [walletAddress as `0x${string}`],
  })

  return {
    balance: isNativeToken ? nativeBalance?.value : tokenBalance,
    symbol: isNativeToken ? 'ETH' : undefined,
    decimals: isNativeToken ? 18 : undefined,
    isLoading: false,
  }
} 