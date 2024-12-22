import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import {
  Transaction,
  TransactionButton,
  TransactionError,
  TransactionResponse,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'
import {
  nftContractAddress,
  ERC20ABI,
} from '@/constants';
import type { ContractFunctionParameters } from 'viem';
import { DEFAULT_CHAIN_ID } from '@/config'

interface NFT {
  id: number;
  name: string;
  tokenId: string;
  image: string;
}


const nfts = [
  { id: 1, name: 'Cool NFT #1', tokenId: '1234', image: 'https://metadata.nftscan.com/eth-app/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x00000000000000000000000000000000000000000000000000000000000019b8.png' },
  { id: 2, name: 'Awesome NFT #2', tokenId: '5678', image: 'https://metadata.nftscan.com/eth-app/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x00000000000000000000000000000000000000000000000000000000000004d7.png' },
  { id: 3, name: 'Epic NFT #3', tokenId: '9012', image: 'https://metadata.nftscan.com/eth-app/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x00000000000000000000000000000000000000000000000000000000000011fd.png' },
]

export default function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState<NFT>(nfts[0]);
  const [recipient, setRecipient] = useState<string>('0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66');


  const handleTransfer = (e: any) => {
    e.preventDefault()
    // Here you would typically call a function to transfer the NFT
    toast({
      title: "NFT Transferred",
      description: `${selectedNFT.name} has been transferred successfully.`,
      duration: 5000  
    })
    setSelectedNFT(nfts[0])
  }

  const contracts = [
    {
      address: nftContractAddress,
      abi: ERC20ABI,
      functionName: 'safeMint',
      args: ['0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66'],
    },
  ] as unknown as ContractFunctionParameters[];


  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

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
                  <Input id="recipient" placeholder="0xE5aEb1927ec6B30cc6AB0a42679C897bf76e7C66" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                </div>
                <Transaction
                  contracts={contracts}
                  chainId={DEFAULT_CHAIN_ID}
                  onError={handleError}
                  onSuccess={handleSuccess}
                >
                  <TransactionButton text="Send" className='relative text-black left-0 border-black' />
                  <TransactionStatus>
                    <TransactionStatusLabel />
                    <TransactionStatusAction />
                  </TransactionStatus>
                </Transaction>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

