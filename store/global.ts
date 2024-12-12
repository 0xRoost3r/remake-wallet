import { create } from 'zustand'

interface Balance {
    hideBalance: boolean
    setShowBalance: (by: boolean) => void
  }
  

export const useStore = create<Balance>((set) => ({
  hideBalance: false,
  setShowBalance: (by) => set((state) => ({ hideBalance: by })),

}))
