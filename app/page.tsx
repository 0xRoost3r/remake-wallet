'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TransferPopup from '@/components/transfer-popup'
import AssetsTab from '@/components/assets-tab'
import FarmingTab from '@/components/farming-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginButton from '@/components/login-button'
import { useStore } from '@/store/global'
import { FundButton } from '@coinbase/onchainkit/fund';
import { useAccount } from 'wagmi'
import Image from 'next/image'
import BigLoginButton from '@/components/big-login-button'
import ClaimPopup from '@/components/claim-popup'

export default function WalletPage() {
  const [isTransferPopupOpen, setIsTransferPopupOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)
  const { isConnected, address } = useAccount()
  const {hideBalance, setShowBalance} = useStore((state) => state)
  const [showClaimPopup, setShowClaimPopup] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isConnected) {
      timeoutId = setTimeout(() => {
        setShowClaimPopup(true)
      }, 2000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isConnected])

  const handleCloseClaimPopup = () => {
    setShowClaimPopup(false)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-6 md:gap-10 ml-4">
              <h1 className="text-xl font-bold">Pi Network Wallet</h1>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Chào mừng Pioneer đã quay trở lại</h2>
          <div className="flex justify-center">
            <Image 
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/16193.png" 
              alt="Smart Wallet" 
              width={64} 
              height={64}
            />
          </div>
          <div className="flex justify-center">
            <BigLoginButton />
          </div>
        </div>
      </div>
    )
  }

  const toggleBalanceVisibility = () => {setShowBalance(!hideBalance)}

  const openTransferPopup = (token: any) => {
    setSelectedToken(token)
    setIsTransferPopupOpen(true)
  }

  const closeTransferPopup = () => {
    setSelectedToken(null)
    setIsTransferPopupOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10 ml-4">
            <h1 className="text-xl font-bold">Pi Network Wallet</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4 mr-8">
            <LoginButton/>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-10">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                Total Balance
                <FundButton hideText={true} className="[&_svg]:fill-black" />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleBalanceVisibility}>
                {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {hideBalance ? '••••••' : '$1,234.56'}
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="assets" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="farming">Farming</TabsTrigger>
          </TabsList>
          <TabsContent value="assets">
            <AssetsTab onTokenClick={openTransferPopup} />
          </TabsContent>
          <TabsContent value="farming">
            <FarmingTab />
          </TabsContent>
        </Tabs>

        {isTransferPopupOpen && (
          <TransferPopup token={selectedToken} onClose={closeTransferPopup} />
        )}

        <ClaimPopup 
          isOpen={showClaimPopup} 
          onClose={handleCloseClaimPopup}
        />
      </main>
    </div>
  )
}

