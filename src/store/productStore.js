import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialInstantProducts = [
  {
    id: 1,
    name: 'Atta (Flour) 5kg',
    category: 'instant',
    price: 280,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Milk 1L',
    category: 'instant',
    price: 65,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1563636619-e36524416424?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Rice 2kg',
    category: 'instant',
    price: 180,
    originalPrice: 200,
    image: 'https://images.unsplash.com/photo-1586909693033-d9d24e58e0e7?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Sugar 1kg',
    category: 'instant',
    price: 50,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Chips - Pack',
    category: 'instant',
    price: 40,
    originalPrice: 50,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Cold Drinks - 2L',
    category: 'instant',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1557804506-669714d2e753?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Bread 400g',
    category: 'instant',
    price: 35,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Butter 200g',
    category: 'instant',
    price: 145,
    originalPrice: 165,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=400&h=400&fit=crop',
  },
];

const initialLifestyleProducts = [
  {
    id: 101,
    name: 'Casual Running Shoes',
    brand: 'SportZone',
    category: 'lifestyle',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  },
  {
    id: 102,
    name: 'Classic White Sneakers',
    brand: 'StyleFit',
    category: 'lifestyle',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1525966222134-fcebfc17192b?w=400&h=400&fit=crop',
  },
  {
    id: 103,
    name: 'Premium Leather Shoes',
    brand: 'LuxeStep',
    category: 'lifestyle',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
  },
  {
    id: 104,
    name: 'Basketball Shoes',
    brand: 'AthleticPro',
    category: 'lifestyle',
    price: 3999,
    originalPrice: 5499,
    image: 'https://images.unsplash.com/photo-1556993413-8e0e9d7a6cf6?w=400&h=400&fit=crop',
  },
  {
    id: 105,
    name: 'Formal Office Shoes',
    brand: 'BusinessClass',
    category: 'lifestyle',
    price: 2799,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1574992768969-4d63bb19a1a5?w=400&h=400&fit=crop',
  },
  {
    id: 106,
    name: 'Summer Casual Sandals',
    brand: 'ComfortStep',
    category: 'lifestyle',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1566572933382-c10ba9e0b00d?w=400&h=400&fit=crop',
  },
];

export const useProductStore = create(
  persist(
    (set, get) => ({
      instantProducts: initialInstantProducts,
      lifestyleProducts: initialLifestyleProducts,

      // Get all products
      getAllProducts: () => {
        const { instantProducts, lifestyleProducts } = get();
        return [...instantProducts, ...lifestyleProducts];
      },

      // Get product by ID and category
      getProduct: (id, category) => {
        const { instantProducts, lifestyleProducts } = get();
        const products = category === 'instant' ? instantProducts : lifestyleProducts;
        return products.find((p) => p.id === id);
      },

      // Update product
      updateProduct: (id, category, updates) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          return {
            [key]: state[key].map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          };
        });
      },

      // Update price
      updatePrice: (id, category, newPrice) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          return {
            [key]: state[key].map((p) =>
              p.id === id ? { ...p, price: newPrice } : p
            ),
          };
        });
      },

      // Update image
      updateImage: (id, category, newImage) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          return {
            [key]: state[key].map((p) =>
              p.id === id ? { ...p, image: newImage } : p
            ),
          };
        });
      },

      // Update original price (strike-through)
      updateOriginalPrice: (id, category, originalPrice) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          return {
            [key]: state[key].map((p) =>
              p.id === id ? { ...p, originalPrice } : p
            ),
          };
        });
      },

      // Add new product
      addProduct: (product, category) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          const newId = Math.max(...state[key].map((p) => p.id), 0) + 1;
          return {
            [key]: [...state[key], { ...product, id: newId, category }],
          };
        });
      },

      // Delete product
      deleteProduct: (id, category) => {
        set((state) => {
          const key = category === 'instant' ? 'instantProducts' : 'lifestyleProducts';
          return {
            [key]: state[key].filter((p) => p.id !== id),
          };
        });
      },

      // Reset to defaults
      resetToDefaults: () => {
        set({
          instantProducts: initialInstantProducts,
          lifestyleProducts: initialLifestyleProducts,
        });
      },
    }),
    {
      name: 'product-store',
    }
  )
);
