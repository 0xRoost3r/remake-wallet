import { useState } from 'react'
import { QrCode } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function TransferPopup({ token, onClose }) {
  const [showQR, setShowQR] = useState(false)

  const handleTransfer = (e) => {
    e.preventDefault()
    // Here you would typically call a function to transfer tokens
    toast({
      title: "Transfer Successful",
      description: `${e.target.amount.value} ${token.symbol} has been sent.`,
    })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer {token.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleTransfer}>
          <div className="mb-4">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input id="recipient" placeholder="0x..." />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0" />
          </div>
          <div className="flex justify-between">
            <Button type="submit">Send</Button>
            <Button type="button" variant="outline" onClick={() => setShowQR(!showQR)}>
              <QrCode className="mr-2 h-4 w-4" />
              {showQR ? 'Hide' : 'Show'} QR Code
            </Button>
          </div>
        </form>
        {showQR && (
          <div className="mt-4 text-center">
            <p>Scan this QR code to receive tokens:</p>
            <img src="https://kzmlu5pdotz9nvgqjknk.lite.vusercontent.net/placeholder.svg?height=200&width=200" alt="QR Code" className="mx-auto mt-2" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

