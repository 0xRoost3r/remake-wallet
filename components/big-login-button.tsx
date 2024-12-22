import { useConnect } from 'wagmi'
import { Button } from '@/components/ui/button'

export default function BigLoginButton() {
  const { connect, connectors } = useConnect()
  const metamaskConnector = connectors[0] // Thường là MetaMask connector

  return (
    <Button 
      onClick={() => connect({ connector: metamaskConnector })}
      size="lg"
      className="px-8 py-6 text-lg flex items-center gap-3 h-auto bg-white text-black"
        >
      Login
    </Button>
  )
} 