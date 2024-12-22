'use client'

import { ERC20ABI, mintContractAddress } from '@/constants'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import Image from 'next/image'
import { WriteContractButton } from "@/components/write-contract-button"
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/global'

export default function ClaimPage() {
    const { address } = useAccount()
    const router = useRouter()
    const { setIsClaimed } = useStore()

    const handleSuccess = () => {
        console.log('handleSuccess')
        setIsClaimed(true)
        router.push('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-center text-2xl mb-6">🎉 Welcome! 🎉</h1>
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Image 
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png" 
                            alt="OP Token" 
                            width={80} 
                            height={80}
                            priority
                        />
                    </div>
                    <h2 className="text-lg font-semibold mb-2">
                        Get 1,000 OP for free
                    </h2>
                    <h3 className="text-sm text-muted-foreground mb-6">
                        Get tokens to start experiencing Remake Wallet
                    </h3>
                    <WriteContractButton
                        address={mintContractAddress}
                        abi={ERC20ABI}
                        functionName="mint"
                        args={[address, ethers.parseUnits('1000', "ether").toString()]}
                        buttonText="Get 1,000 OP for free"
                        className="w-full text-white border-black border-2 border-solid rounded-lg"
                        onSuccess={handleSuccess}
                    />
                </div>
            </div>
        </div>
    )
} 