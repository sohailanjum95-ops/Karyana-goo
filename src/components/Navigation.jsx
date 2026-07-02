import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Home } from 'lucide-react'
import useCartStore from '../store/cartStore'

function Navigation() {
  const location = useLocation()
  const totalItems = useCartStore((state) => state.getTotalItems())

  if (location.pathname === '/order-tracking') {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <span className="text-2xl">🚚</span>
          <span>Poonch Delivery</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            location.pathname === '/' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
          }`}>
            <Home size={20} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <Link to="/cart" className="relative">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === '/cart' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
