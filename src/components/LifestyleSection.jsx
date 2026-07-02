import React, { useState } from 'react'
import { Plus, Minus, Star } from 'lucide-react'
import useCartStore from '../store/cartStore'

function LifestyleSection({ products }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const addLifestyleItem = useCartStore((state) => state.addLifestyleItem)
  const updateQuantity = useCartStore((state) => state.updateLifestyleItemQuantity)
  const lifestyleItems = useCartStore((state) => state.lifestyleItems)

  const categories = ['All', ...new Set(products.map(p => p.category))]
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCartQuantity = (productId) => {
    const item = lifestyleItems.find(i => i.id === productId)
    return item?.quantity || 0
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">👕 Lifestyle & Fashion</h2>
        <p className="text-sm text-gray-600">Quality clothing and footwear</p>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search by brand or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const quantity = getCartQuantity(product.id)
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-lg-card transition-shadow">
              <div className="text-6xl text-center p-6 bg-gray-100">{product.image}</div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-emerald-600 font-bold text-lg">₹{product.price}</p>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>
                </div>

                {quantity === 0 ? (
                  <button
                    onClick={() => addLifestyleItem(product)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-2">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"><Minus size={16} /></button>
                    <span className="font-bold text-emerald-700">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 text-emerald-700 hover:bg-emerald-200 rounded transition-colors"><Plus size={16} /></button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LifestyleSection
