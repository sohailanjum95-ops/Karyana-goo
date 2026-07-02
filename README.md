# Poonch Delivery App 🚚

A modern, fast delivery application built with React, Tailwind CSS, and Zustand for Poonch's local commerce needs.

## Features

### ⚡ Instant Delivery
- **Karyana Items**: Fresh groceries and daily essentials
- **Snacks**: Popular local and branded snacks
- **Cold Drinks**: Refreshing beverages
- **Groceries**: Fresh fruits and vegetables
- **Voice Ordering**: Order using voice commands
- **Real-time Search**: Instant filtering by category and name

### 👕 Lifestyle & Fashion
- **Footwear**: Shoes, sneakers, sandals, and loafers
- **Clothing**: T-shirts, jeans, and casual wear
- **Product Ratings**: Star ratings and customer reviews
- **Size Selection**: Multiple size options per product
- **Brand Filtering**: Shop by your favorite brands

### 🛒 Shopping Cart
- **Multi-category Support**: Combine instant delivery and lifestyle items
- **Quantity Management**: Easily add/remove items
- **Price Calculation**: Real-time total with tax and delivery fee
- **Order Summary**: Clear breakdown of costs

### 📍 Order Tracking
- **Real-time Status**: Processing → Preparing → On the Way → Delivered
- **Delivery Partner Info**: Driver details and contact
- **ETA Updates**: Estimated delivery time
- **Order Timeline**: Visual progress indicator

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx
│   ├── InstantDeliverySection.jsx
│   └── LifestyleSection.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── CartPage.jsx
│   └── OrderTrackingPage.jsx
├── store/
│   └── cartStore.js
├── data/
│   ├── instantDeliveryProducts.js
│   └── lifestyleProducts.js
├── App.jsx
├── main.jsx
└── index.css
```

## Features in Detail

### Voice Ordering
Click the microphone button to enable voice order mode and speak your orders.

### Real-time Cart Updates
Cart count updates in real-time as you add/remove items. Navigate between instant delivery and lifestyle products seamlessly.

### Responsive Design
Fully responsive design optimized for mobile, tablet, and desktop screens.

### Order Management
- Add items from multiple categories
- View real-time pricing with tax and delivery fees
- Track orders with animated status updates
- Contact delivery partner directly

## Future Enhancements

- Payment gateway integration
- User authentication and profiles
- Order history and wishlist
- Real-time GPS tracking
- Push notifications
- Restaurant partnerships
- Multiple language support

## License

MIT License - feel free to use this project for commercial purposes.

## Support

For issues or suggestions, please contact the development team.

---

**Built with ❤️ for Poonch Community**
