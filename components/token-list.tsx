import { useStore } from '@/store/global'
import Image from 'next/image'

const tokens = [
  { name: 'Pi', symbol: 'PI', balance: 1000, value: 500, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16193.png' },
  { name: 'Ethereum', symbol: 'ETH', balance: 0.5, value: 750, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { name: 'USD Coin', symbol: 'USDC', balance: 250, value: 250, logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png' },
]


interface Props {
  onTokenClick?: any
  // any props that come into the component
}

export default function TokenList({ onTokenClick }: Props) {
  const {hideBalance} = useStore((state) => state)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tokens</h2>
      <ul className="space-y-2">
        {tokens.map((token) => (
          <li 
            key={token.symbol} 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent rounded-lg transition-colors"
            onClick={() => onTokenClick(token)}
          >
            <div className="flex items-center space-x-3">
              <Image src={token.logo} alt={token.name} width={32} height={32} className="rounded-full" />
              <span className="font-medium">{token.name}</span>
            </div>
            <div className="text-right">
              <div>{ hideBalance ? "***** " : token.balance} {token.symbol}</div>
              <div className="text-sm text-muted-foreground">{ hideBalance ? "***** " : "$" +token.value.toFixed(2)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}