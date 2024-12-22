'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAccount } from 'wagmi'
import { ArrowLeft, Copy, ChevronDown, QrCode } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { defaultTokens } from '@/components/token-list'
import { ethers } from 'ethers'
import { isAddress } from 'ethers'
import { BarcodeScanner } from '@/components/scan-qr-code'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ERC20ABI } from '@/constants'
import { WriteContractButton } from '@/components/write-contract-button'
import { TransferNativeButton } from '@/components/transfer-native-button'
import { ETH_ADDRESS } from '@/constants'
import { useTokenBalance } from '@/hooks/use-token-balance'
import { formatUnits } from 'viem'
import { Suspense } from 'react'

function FundPageContent() {
  const searchParams = useSearchParams()
  const action = searchParams?.get('action')
  const tokenAddress = searchParams?.get('address')
  const { address } = useAccount()
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const { toast } = useToast()
  const [selectedToken, setSelectedToken] = useState(defaultTokens[0])
  const [recipientAddress, setRecipientAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  
  const { balance, symbol, decimals } = useTokenBalance(selectedToken.address, address)
  const [formattedBalance, setFormattedBalance] = useState<string>('0')

  useEffect(() => {
    if (balance) {
      const formatted = formatUnits(balance, decimals || 18)
      const numberFormatted = Number(formatted).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5
      })
      setFormattedBalance(numberFormatted)
    }
  }, [balance, decimals])

  useEffect(() => {
    if (tokenAddress) {
      const token = defaultTokens.find(t => t.address.toLowerCase() === tokenAddress.toLowerCase())
      if (token) {
        setSelectedToken(token)
      }
    }
  }, [tokenAddress])

  const copyToClipboard = async () => {
    if (!address) return
    
    try {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Copied",
        description: "Wallet address has been copied to clipboard",
        duration: 5000
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not copy wallet address",
        variant: "destructive",
        duration: 5000
      })
    }
  }

  const handleAddressChange = (value: string) => {
    setRecipientAddress(value)
    
    if (!value) {
      setAddressError('')
      return
    }

    if (!isAddress(value)) {
      setAddressError('Invalid wallet address')
    } else {
      setAddressError('')
    }
  }

  const handleScan = (address: string) => {
    handleAddressChange(address)
    setIsScanning(false)
    if (isAddress(address)) {
      toast({
        title: "Scan successful",
        description: "Recipient wallet address received",
        duration: 5000
      })
    }
  }

  const handleScanError = (error: string) => {
    toast({
      title: "Error",
      description: "Could not scan QR code",
      variant: "destructive",
      duration: 5000
    })
  }

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: `Successfully sent ${amount} ${selectedToken.symbol}`,
      duration: 5000
    })
    setAmount('')
    setRecipientAddress('')
  }

  const isValidTransaction = amount.length > 0 && 
    recipientAddress.length > 0 && 
    !addressError && 
    Number(amount) > 0

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Token Management</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-10">
        <Tabs 
          defaultValue={action === 'send' ? 'send' : 'receive'} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="receive">Receive Token</TabsTrigger>
            <TabsTrigger value="send">Send Token</TabsTrigger>
          </TabsList>
          
          <TabsContent value="receive">
            <Card>
              <CardHeader>
                <CardTitle>Scan to Receive</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <QRCodeSVG value={address || ''} size={200} />
                <div 
                  className="flex items-center gap-2 text-sm text-center text-muted-foreground break-all cursor-pointer hover:text-foreground"
                  onClick={copyToClipboard}
                >
                  <p>{address}</p>
                  <Copy className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send">
            <Card>
              <CardHeader>
                <CardTitle>Send Token</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                  <Button variant="outline" onClick={() => setIsScanning(true)}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR
                  </Button>
                </div>
                
                {isScanning && (
                  <div className="text-sm text-center text-muted-foreground break-all">
                    <BarcodeScanner 
                      onScan={handleScan}
                      onError={handleScanError}
                    />
                    <Button 
                      variant="destructive" 
                      onClick={() => setIsScanning(false)}
                      className="mt-4"
                    >
                      Close Scanner
                    </Button>
                  </div>
                )}

                <div className="w-full max-w-xs space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={selectedToken.logo} 
                            alt={selectedToken.name} 
                            width={24} 
                            height={24} 
                            className="rounded-full"
                          />
                          {selectedToken.name}
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[200px]">
                      {defaultTokens.map((token) => (
                        <DropdownMenuItem
                          key={token.symbol}
                          onClick={() => setSelectedToken(token)}
                          className="flex items-center gap-2"
                        >
                          <Image 
                            src={token.logo} 
                            alt={token.name} 
                            width={24} 
                            height={24} 
                            className="rounded-full"
                          />
                          {token.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="text-sm text-muted-foreground">
                    Balance: {hideBalance ? '••••••' : formattedBalance} {selectedToken.symbol}
                  </div>

                  <Input
                    type="number"
                    placeholder={`Enter amount of ${selectedToken.symbol}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Input
                    type="string"
                    placeholder="Enter recipient wallet address"
                    value={recipientAddress}
                    onChange={(e) => handleAddressChange(e.target.value)}
                  />
                  {addressError && (
                    <p className="text-sm text-red-500">{addressError}</p>
                  )}
                  {selectedToken.address.toLowerCase() === ETH_ADDRESS.toLowerCase() ? (
                    <TransferNativeButton
                      to={recipientAddress}
                      amount={amount}
                      buttonText="Send Token"
                      className="w-full text-white border-black border-2 border-solid rounded-lg"
                      onSuccess={handleSuccess}
                      disabled={!isValidTransaction}
                    />
                  ) : (
                    <WriteContractButton
                      address={selectedToken.address}
                      abi={ERC20ABI}
                      functionName="transfer"
                      args={[recipientAddress, amount.length ? ethers.parseUnits(amount,"ether").toString().replace('n', '') : 0]}
                      buttonText="Send Token"
                      className="w-full text-white border-black border-2 border-solid rounded-lg"
                      onSuccess={handleSuccess}
                      disabled={!isValidTransaction}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default function FundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <FundPageContent/>
    </Suspense>
  )
} 