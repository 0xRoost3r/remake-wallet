'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TransferPopup from '@/components/transfer-popup'
import AssetsTab from '@/components/assets-tab'
import FarmingTab from '@/components/farming-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginButton from '@/components/login-button'

export default function WalletPage() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true)
  const [isTransferPopupOpen, setIsTransferPopupOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  const toggleBalanceVisibility = () => setIsBalanceHidden(!isBalanceHidden)

  const openTransferPopup = (token) => {
    setSelectedToken(token)
    setIsTransferPopupOpen(true)
  }

  const closeTransferPopup = () => {
    setSelectedToken(null)
    setIsTransferPopupOpen(false)
  }

  const handleConnect = () => {
    // Here you would typically implement the wallet connection logic
    setIsConnected(!isConnected)
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
            {/* <Button onClick={handleConnect}>
              {isConnected ? 'Disconnect' : 'Connect'}
            </Button> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-10">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Total Balance
              <Button variant="ghost" size="icon" onClick={toggleBalanceVisibility}>
                {isBalanceHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {isBalanceHidden ? '••••••' : '$1,234.56'}
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
      </main>
    </div>
  )
}

