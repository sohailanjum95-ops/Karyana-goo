import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  instantItems: [],
  lifestyleItems: [],
  
  addInstantItem: (product) => set((state) => ({
    instantItems: [...state.instantItems, { ...product, quantity: 1, category: 'instant' }],
  })),
  
  addLifestyleItem: (product) => set((state) => ({
    lifestyleItems: [...state.lifestyleItems, { ...product, quantity: 1, category: 'lifestyle' }],
  })),
  
  updateInstantItemQuantity: (productId, quantity) => set((state) => ({
    instantItems: quantity === 0
      ? state.instantItems.filter(item => item.id !== productId)
      : state.instantItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
  })),
  
  updateLifestyleItemQuantity: (productId, quantity) => set((state) => ({
    lifestyleItems: quantity === 0
      ? state.lifestyleItems.filter(item => item.id !== productId)
      : state.lifestyleItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
  })),
  
  getTotalItems: () => {
    const state = get()
    return state.instantItems.length + state.lifestyleItems.length
  },
  
  getTotalPrice: () => {
    const state = get()
    const instantTotal = state.instantItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const lifestyleTotal = state.lifestyleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    return instantTotal + lifestyleTotal
  },
  
  clearCart: () => set({ instantItems: [], lifestyleItems: [] }),
}))

export default useCartStore
