import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Clock, CheckCircle, Truck, Phone } from 'lucide-react'

function OrderTrackingPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [orderStatus, setOrderStatus] = useState('processing')
  const [eta, setEta] = useState(25)

  useEffect(() => {
    const statusSequence = ['processing', 'preparing', 'on-the-way', 'delivered']
    const timings = [5000, 15000, 10000]
    
    const timers = []
    let currentIndex = 0

    timers.push(setTimeout(() => {
      const updateStatus = setInterval(() => {
        if (currentIndex < statusSequence.length - 1) {
          currentIndex++
          setOrderStatus(statusSequence[currentIndex])
        } else {
          clearInterval(updateStatus)
        }
      }, timings[0]))
    }, 0))

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  useEffect(() => {
    if (orderStatus === 'on-the-way') {
      const interval = setInterval(() => {
        setEta(prev => (prev > 0 ? prev - 1 : 0))
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [orderStatus])

  const getStatusColor = (status) => {
    const colors = {
      'processing': 'bg-blue-100 text-blue-700',
      'preparing': 'bg-yellow-100 text-yellow-700',
      'on-the-way': 'bg-purple-100 text-purple-700',
      'delivered': 'bg-green-100 text-green-700',
    }
    return colors[status] || colors.processing
  }

  const statusMessages = {
    'processing': '⏳ Order Processing',
    'preparing': '🛍️ Preparing Your Order',
    'on-the-way': '🚚 On the Way',
    'delivered': '✅ Delivered',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-card p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
            <p className="text-gray-600">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
          </div>

          <div className={`${getStatusColor(orderStatus)} rounded-lg p-4 text-center`}>
            <p className="text-lg font-bold">{statusMessages[orderStatus]}</p>
          </div>

          {orderStatus === 'on-the-way' && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                <Clock size={20} />
                <span>Estimated Delivery in {eta} minutes</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={20} /> Delivery Details
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📍</div>
                <div>
                  <p className="font-semibold text-gray-800">Delivery Location</p>
                  <p className="text-sm text-gray-600">Poonch Main Bazaar, Azad Jammu & Kashmir</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">👥</div>
                <div>
                  <p className="font-semibold text-gray-800">Delivery Partner</p>
                  <p className="text-sm text-gray-600">Ahmed Khan</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone size={16} className="text-emerald-600" />
                    <a href="tel:+923001234567" className="text-emerald-600 font-medium">+92 300 1234567</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle size={20} /> Order Timeline
            </h2>
            <div className="space-y-3">
              {[
                { stage: 'processing', label: 'Order Confirmed', icon: '✅' },
                { stage: 'preparing', label: 'Preparing Items', icon: '🛍️' },
                { stage: 'on-the-way', label: 'Out for Delivery', icon: '🚚' },
                { stage: 'delivered', label: 'Delivered', icon: '🎉' },
              ].map((item, index) => {
                const statusIndex = ['processing', 'preparing', 'on-the-way', 'delivered'].indexOf(orderStatus)
                const itemIndex = ['processing', 'preparing', 'on-the-way', 'delivered'].indexOf(item.stage)
                const isCompleted = itemIndex <= statusIndex
                const isCurrent = itemIndex === statusIndex

                return (
                  <div key={item.stage} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        isCurrent ? 'text-emerald-600' : isCompleted ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </p>
                    </div>
                    {isCurrent && <span className="text-sm text-emerald-600 font-bold">In Progress</span>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full btn-primary"
            >
              Back to Home
            </button>
            <p className="text-sm text-gray-600 text-center">
              Thank you for using Poonch Delivery! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTrackingPage
