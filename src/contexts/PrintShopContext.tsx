'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, CartItemVariant } from '@/types/printShop';
import { getCartService, CartSummary } from '@/lib/ecommerce/cartService';

interface PrintShopContextType {
  cart: CartItem[];
  cartSummary: CartSummary;
  addToCart: (product: Product, quantity?: number, variant?: CartItemVariant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  validateCart: () => { isValid: boolean; errors: string[] };
}

const PrintShopContext = createContext<PrintShopContextType | undefined>(undefined);

interface PrintShopProviderProps {
  children: ReactNode;
}

export function PrintShopProvider({ children }: PrintShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    itemCount: 0,
    totalQuantity: 0,
    subtotal: 0,
    estimatedTax: 0,
    estimatedShipping: 0,
    total: 0,
    hasPhysicalItems: false,
    hasDigitalItems: false,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartService = getCartService();

  // Load cart data on mount and subscribe to changes
  useEffect(() => {
    updateCartState();

    const unsubscribe = cartService.subscribe((updatedCart) => {
      setCart(updatedCart);
      setCartSummary(cartService.getCartSummary());
    });

    return unsubscribe;
  }, [cartService]);

  const updateCartState = () => {
    const currentCart = cartService.getCart();
    const currentSummary = cartService.getCartSummary();

    setCart(currentCart);
    setCartSummary(currentSummary);
  };

  const addToCart = (product: Product, quantity: number = 1, variant?: CartItemVariant) => {
    try {
      cartService.addItem(product, quantity, variant);

      // Show cart briefly for user feedback
      setIsCartOpen(true);
      setTimeout(() => setIsCartOpen(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You could show a toast notification here
    }
  };

  const removeFromCart = (itemId: string) => {
    cartService.removeItem(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        cartService.removeItem(itemId);
      } else {
        cartService.updateQuantity(itemId, quantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = () => {
    cartService.clearCart();
  };

  const validateCart = () => {
    return cartService.validateCart();
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const value: PrintShopContextType = {
    cart,
    cartSummary,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    validateCart,
  };

  return <PrintShopContext.Provider value={value}>{children}</PrintShopContext.Provider>;
}

export function usePrintShop(): PrintShopContextType {
  const context = useContext(PrintShopContext);
  if (context === undefined) {
    throw new Error('usePrintShop must be used within a PrintShopProvider');
  }
  return context;
}
