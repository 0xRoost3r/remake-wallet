import { useStore } from '@/store/global'
import Image from 'next/image'
import { mintContractAddress, ERC20ABI } from '@/constants'
import { useAccount, useReadContract, useBlockNumber, useBalance } from 'wagmi'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { DEFAULT_CHAIN_ID } from '@/config'

interface Token {
  name: string
  symbol: string
  address: string
  balance: number
  value: number
  logo: string
}

export const defaultTokens: Token[] = [
  { name: 'Pi', symbol: 'PI', address: mintContractAddress, balance: 0, value: 31.4, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16193.png' },
  { name: 'Ethereum', symbol: 'ETH', address: '0x4200000000000000000000000000000000000006', balance: 0, value: 3900, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { name: 'USD Coin', symbol: 'USDC', address: '0x62dA74A3aCd9e2dde72E093f638B1BeB41ab28E8', balance: 0, value: 1, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png' },
]

interface Props {
  onTokenClick?: (token: Token) => void
  onTotalValueChange?: (value: number) => void
}

export default function TokenList({ onTokenClick, onTotalValueChange }: Props) {
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { hideBalance } = useStore((state) => state)
  const { address } = useAccount()
  const [tokens, setTokens] = useState<Token[]>(defaultTokens)

  const piBalance = useReadContract({
    address: defaultTokens[0].address as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: DEFAULT_CHAIN_ID,
  })

  const ethBalance = useBalance({
    address: address as `0x${string}`,
    chainId: DEFAULT_CHAIN_ID,
  });

  const usdcBalance = useReadContract({
    address: defaultTokens[2].address as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: DEFAULT_CHAIN_ID,
  })

  useEffect(() => {
    if (!address) return;

    const updatedTokens = defaultTokens.map((token, index) => {
      let balance = 0;
      const balanceData = [piBalance.data, ethBalance.data, usdcBalance.data][index];
      
      if (balanceData) {
        // Xử lý riêng cho ETH balance
        balance = index === 1 
          ? Number(ethBalance.data?.formatted || 0)
          : Number(formatEther(balanceData as bigint));
      }

      return {
        ...token,
        balance,
      };
    });

    setTokens(updatedTokens);

    const totalValue = updatedTokens.reduce((sum, token) => {
      return sum + (token.balance * token.value);
    }, 0);

    onTotalValueChange?.(totalValue);
  }, [address, piBalance.data, ethBalance.data, usdcBalance.data, onTotalValueChange]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tokens</h2>
      <ul className="space-y-2">
        {tokens.map((token) => (
          <li 
            key={token.symbol} 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent rounded-lg transition-colors"
            onClick={() => onTokenClick?.(token)}
          >
            <div className="flex items-center space-x-3">
              <Image src={token.logo} alt={token.name} width={32} height={32} className="rounded-full" />
              <span className="font-medium">{token.name}</span>
            </div>
            <div className="text-right">
              <div>{ hideBalance ? "***** " : token.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 })} {token.symbol}</div>
              <div className="text-sm text-muted-foreground">{ hideBalance ? "***** " : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(token.balance * token.value)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}