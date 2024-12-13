import TokenList from './token-list'
import NFTGallery from './nft-gallery'

interface Props {
  onTokenClick?: any
  onBalanceUpdate?: any
  // any props that come into the component
}

export default function AssetsTab({ onTokenClick, onBalanceUpdate }: Props) {
  return (
    <div className="space-y-6">
      <TokenList onTokenClick={onTokenClick} onTotalValueChange={onBalanceUpdate} />
      <NFTGallery />
    </div>
  )
}

