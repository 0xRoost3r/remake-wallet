import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function TokenFarming() {
  const [lockedAmount, setLockedAmount] = useState(0)
  const [earnedAmount, setEarnedAmount] = useState(0)
  const totalPoolSize = 1000000 // Example total pool size
  const currentPoolSize = 750000 // Example current pool size

  const handleLock = (e) => {
    e.preventDefault()
    // Here you would typically call a function to lock tokens
    setLockedAmount(lockedAmount + Number(e.target.amount.value))
  }

  const handleWithdraw = () => {
    // Here you would typically call a function to withdraw tokens
    setLockedAmount(0)
    setEarnedAmount(0)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Token Farming</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label>Pool Progress</Label>
          <Progress value={(currentPoolSize / totalPoolSize) * 100} className="mt-2" />
          <p className="text-sm text-gray-500 mt-1">
            {currentPoolSize.toLocaleString()} / {totalPoolSize.toLocaleString()} PI locked
          </p>
        </div>
        <div className="mb-4">
          <p>Locked Amount: {lockedAmount} PI</p>
          <p>Earned USDC: ${earnedAmount.toFixed(2)}</p>
        </div>
        <form onSubmit={handleLock} className="mb-4">
          <Label htmlFor="amount">Amount to Lock (PI)</Label>
          <Input id="amount" type="number" placeholder="0" className="mb-2" />
          <Button type="submit">Lock PI</Button>
        </form>
        <Button onClick={handleWithdraw} variant="outline">Withdraw</Button>
      </CardContent>
    </Card>
  )
}

