'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, PrintProduct } from '@/types/printShop';
import { getPrintShopService } from '@/lib/printShop/printShopService';

interface PrintShopContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: PrintProduct) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const PrintShopContext = createContext<PrintShopContextType | undefined>(undefined);

interface PrintShopProviderProps {
  children: ReactNode;
}

export function PrintShopProvider({ children }: PrintShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const printShopService = getPrintShopService();

  // Load cart data on mount
  useEffect(() => {
    updateCartState();
  }, []);

  const updateCartState = () => {
    const currentCart = printShopService.getCart();
    const currentCount = printShopService.getCartCount();
    const currentTotal = printShopService.getCartTotal();

    setCart(currentCart);
    setCartCount(currentCount);
    setCartTotal(currentTotal);
  };

  const addToCart = (product: PrintProduct) => {
    printShopService.addToCart(product);
    updateCartState();
    
    // Show a brief notification or open cart
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000); // Auto-close after 3 seconds
  };

  const removeFromCart = (itemId: string) => {
    printShopService.removeFromCart(itemId);
    updateCartState();
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      printShopService.updateCartItemQuantity(itemId, quantity);
      updateCartState();
    }
  };

  const clearCart = () => {
    printShopService.clearCart();
    updateCartState();
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const value: PrintShopContextType = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return (
    <PrintShopContext.Provider value={value}>
      {children}
    </PrintShopContext.Provider>
  );
}

export function usePrintShop(): PrintShopContextType {
  const context = useContext(PrintShopContext);
  if (context === undefined) {
    throw new Error('usePrintShop must be used within a PrintShopProvider');
  }
  return context;
}
