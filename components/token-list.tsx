import Image from 'next/image'

const tokens = [
  { name: 'Pi', symbol: 'PI', balance: 1000, value: 500, logo: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=32&width=32' },
  { name: 'Ethereum', symbol: 'ETH', balance: 0.5, value: 750, logo: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=32&width=32' },
  { name: 'USD Coin', symbol: 'USDC', balance: 250, value: 250, logo: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=32&width=32' },
]

export default function TokenList({ onTokenClick }) {
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
              <div>{token.balance} {token.symbol}</div>
              <div className="text-sm text-muted-foreground">${token.value.toFixed(2)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

