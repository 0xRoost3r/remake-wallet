'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AssetsTab from '@/components/assets-tab'
import FarmingTab from '@/components/farming-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginButton from '@/components/login-button'
import { useStore } from '@/store/global'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import BigLoginButton from '@/components/big-login-button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { Token } from '@/types/token'

export default function WalletPage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const { hideBalance, setShowBalance, isClaimed } = useStore()
  const { toast } = useToast()
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isConnected && !isClaimed) {
      timeoutId = setTimeout(() => {
        toast({
          title: "🎉 Welcome back!",
          description: "Get 1,000 OP for free",
          action: <ToastAction altText="Claim now" onClick={() => router.push('/claim')}>Claim now</ToastAction>,
        })
      }, 2000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isConnected])


  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-6 md:gap-10 ml-4">
              <h1 className="text-xl font-bold">Remake Wallet (WIP)</h1>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome back</h2>
          <div className="flex justify-center">
            <BigLoginButton />
          </div>
        </div>
      </div>
    )
  }

  const toggleBalanceVisibility = () => {setShowBalance(!hideBalance)}

  const openTransferPopup = (token: Token) => {
    router.push(`/fund?action=send&address=${token.address}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10 ml-4">
            <h1 className="text-xl font-bold">Remake Wallet (WIP)</h1>
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
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => router.push('/fund?action=send')}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => router.push('/fund?action=receive')}
                  >
                    <ArrowDownLeft className="h-4 w-4" />
                    Receive
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleBalanceVisibility}>
                {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {hideBalance ? '••••••' : `$${totalBalance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="assets" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="farming">Farming</TabsTrigger>
          </TabsList>
          <TabsContent value="assets">
            <AssetsTab 
              onTokenClick={openTransferPopup}
              onBalanceUpdate={(total: number) => {
                setTotalBalance(total)
              }}
            />
          </TabsContent>
          <TabsContent value="farming">
            <FarmingTab />
          </TabsContent>
        </Tabs>

      </main>
    </div>
  )
}
