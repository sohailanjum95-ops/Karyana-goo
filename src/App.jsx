import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import OrderTrackingPage from './pages/OrderTrackingPage'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
      </Routes>
    </Router>
  )
}

export default App
