import TokenList from './token-list'
import NFTGallery from './nft-gallery'

interface Props {
  onTokenClick?: any
  // any props that come into the component
}

export default function AssetsTab({ onTokenClick }: Props) {
  return (
    <div className="space-y-6">
      <TokenList onTokenClick={onTokenClick} />
      <NFTGallery />
    </div>
  )
}

