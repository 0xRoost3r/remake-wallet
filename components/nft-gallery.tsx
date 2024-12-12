import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const nfts = [
  { id: 1, name: 'Cool NFT #1', tokenId: '0x123...abc', image: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Awesome NFT #2', tokenId: '0x456...def', image: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Epic NFT #3', tokenId: '0x789...ghi', image: 'https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=200&width=200' },
]

export default function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState(null)

  const handleTransfer = (e) => {
    e.preventDefault()
    // Here you would typically call a function to transfer the NFT
    toast({
      title: "NFT Transferred",
      description: `${selectedNFT.name} has been transferred successfully.`,
    })
    setSelectedNFT(null)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">NFTs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <Dialog key={nft.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer space-y-2">
                <Image src={nft.image} alt={nft.name} width={200} height={200} className="rounded-lg w-full h-auto" />
                <h3 className="font-semibold truncate">{nft.name}</h3>
                <p className="text-sm text-muted-foreground truncate">ID: {nft.tokenId}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{nft.name}</DialogTitle>
              </DialogHeader>
              <Image src={nft.image} alt={nft.name} width={300} height={300} className="rounded-lg mx-auto" />
              <p className="text-center">Token ID: {nft.tokenId}</p>
              <form onSubmit={handleTransfer} className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input id="recipient" placeholder="0x..." />
                </div>
                <Button type="submit" className="w-full">Transfer NFT</Button>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

