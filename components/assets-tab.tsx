import TokenList from './token-list'
import NFTGallery from './nft-gallery'

export default function AssetsTab({ onTokenClick }) {
  return (
    <div className="space-y-6">
      <TokenList onTokenClick={onTokenClick} />
      <NFTGallery />
    </div>
  )
}

