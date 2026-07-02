import React, { useState } from 'react'
import { Plus, Minus, Mic } from 'lucide-react'
import useCartStore from '../store/cartStore'

function InstantDeliverySection({ products }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [voiceActive, setVoiceActive] = useState(false)
  const addInstantItem = useCartStore((state) => state.addInstantItem)
  const updateQuantity = useCartStore((state) => state.updateInstantItemQuantity)
  const instantItems = useCartStore((state) => state.instantItems)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleVoiceOrder = () => {
    setVoiceActive(!voiceActive)
    alert('🎤 Voice Order Mode Active!\n\nSay your order (e.g., "2 kg rice, 1 liter oil")\n\nSimulated Markets:\n- Quila Market\n- Main Bazaar\n- Chiller Market')
  }

  const getCartQuantity = (productId) => {
    const item = instantItems.find(i => i.id === productId)
    return item?.quantity || 0
  }

  const groupedByCategory = {}
  filteredProducts.forEach(product => {
    if (!groupedByCategory[product.category]) {
      groupedByCategory[product.category] = []
    }
    groupedByCategory[product.category].push(product)
  })

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">⚡ Instant Delivery</h2>
        <p className="text-sm text-gray-600">Fast delivery within 30 minutes</p>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button
            onClick={handleVoiceOrder}
            className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              voiceActive
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
            title="Voice Order"
          >
            <Mic size={20} />
            <span className="hidden sm:inline">Voice</span>
          </button>
        </div>
      </div>

      {Object.entries(groupedByCategory).map(([category, categoryProducts]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 ml-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryProducts.map(product => {
              const quantity = getCartQuantity(product.id)
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-card p-3 hover:shadow-lg-card transition-shadow">
                  <div className="text-4xl text-center mb-2">{product.image}</div>
                  <h4 className="font-semibold text-sm text-gray-800 truncate">{product.name}</h4>
                  <p className="text-emerald-600 font-bold text-lg mt-2">₹{product.price}</p>
                  
                  {quantity === 0 ? (
                    <button
                      onClick={() => addInstantItem(product)}
                      className="w-full mt-3 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add
                    </button>
                  ) : (
                    <div className="flex items-center justify-between mt-3 bg-emerald-50 rounded-lg p-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"><Minus size={16} /></button>
                      <span className="font-bold text-emerald-700">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"><Plus size={16} /></button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default InstantDeliverySection
