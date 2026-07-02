import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import useCartStore from '../store/cartStore'

function CartPage() {
  const navigate = useNavigate()
  const instantItems = useCartStore((state) => state.instantItems)
  const lifestyleItems = useCartStore((state) => state.lifestyleItems)
  const updateInstantQuantity = useCartStore((state) => state.updateInstantItemQuantity)
  const updateLifestyleQuantity = useCartStore((state) => state.updateLifestyleItemQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)
  const [deliveryFee] = useState(50)

  const handleCheckout = () => {
    if (instantItems.length === 0 && lifestyleItems.length === 0) {
      alert('Please add items to your cart')
      return
    }
    const orderId = 'PD-' + Date.now()
    clearCart()
    navigate(`/order-tracking/${orderId}`)
  }

  const allItems = [...instantItems, ...lifestyleItems]
  const subtotal = getTotalPrice()
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + tax

  if (allItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-card p-8 text-center space-y-4">
            <div className="text-6xl">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600">Start adding items to your cart!</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {allItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-card p-4 flex items-center gap-4">
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.brand || item.category}</p>
                  <p className="text-emerald-600 font-bold mt-2">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2">
                  <button
                    onClick={() => item.category === 'instant'
                      ? updateInstantQuantity(item.id, item.quantity - 1)
                      : updateLifestyleQuantity(item.id, item.quantity - 1)
                    }
                    className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-emerald-700">{item.quantity}</span>
                  <button
                    onClick={() => item.category === 'instant'
                      ? updateInstantQuantity(item.id, item.quantity + 1)
                      : updateLifestyleQuantity(item.id, item.quantity + 1)
                    }
                    className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => item.category === 'instant'
                      ? updateInstantQuantity(item.id, 0)
                      : updateLifestyleQuantity(item.id, 0)
                    }
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-card p-6 h-fit sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
              <span>Total</span>
              <span className="text-emerald-600">₹{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors mb-2"
            >
              Place Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
