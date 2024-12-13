import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Balance {
  hideBalance: boolean
  isClaimed: boolean
  setShowBalance: (by: boolean) => void
  setIsClaimed: (by: boolean) => void
}

export const useStore = create<Balance>()(
  persist(
    (set) => ({
      hideBalance: false,
      isClaimed: false,
      setShowBalance: (by) => set({ hideBalance: by }),
      setIsClaimed: (by) => set({ isClaimed: by }),
    }),
    {
      name: 'pi-wallet-storage',
    }
  )
)
