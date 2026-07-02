import { create } from 'zustand'

const useOrderStore = create((set) => ({
  currentOrder: null,
  orders: [],
  
  createOrder: (orderData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      createdAt: new Date(),
      status: 'placed',
      timeline: [
        { status: 'placed', timestamp: new Date(), completed: true },
        { status: 'packing', timestamp: null, completed: false },
        { status: 'delivery', timestamp: null, completed: false },
        { status: 'delivered', timestamp: null, completed: false }
      ]
    }
    set((state) => ({
      currentOrder: order,
      orders: [order, ...state.orders]
    }))
    return order
  },

  updateOrderStatus: (orderId, status) => set((state) => {
    if (state.currentOrder?.id === orderId) {
      const updatedOrder = {
        ...state.currentOrder,
        status,
        timeline: state.currentOrder.timeline.map((item) => {
          if (item.status === status) {
            return { ...item, completed: true, timestamp: new Date() }
          }
          return item
        })
      }
      return { currentOrder: updatedOrder }
    }
    return {}
  }),

  getOrderById: (orderId) => {
    const state = useOrderStore.getState()
    return state.orders.find(order => order.id === orderId) || state.currentOrder
  }
}))

export default useOrderStore
