import React from 'react'
import InstantDeliverySection from '../components/InstantDeliverySection'
import LifestyleSection from '../components/LifestyleSection'
import { instantDeliveryProducts } from '../data/instantDeliveryProducts'
import { lifestyleProducts } from '../data/lifestyleProducts'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome to Poonch Delivery 🚚</h1>
            <p className="text-lg opacity-90">Your trusted delivery partner in Poonch</p>
          </div>
        </div>

        <div className="space-y-12">
          <InstantDeliverySection products={instantDeliveryProducts} />
          <div className="border-t-2 border-gray-300"></div>
          <LifestyleSection products={lifestyleProducts} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
