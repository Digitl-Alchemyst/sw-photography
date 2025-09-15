'use client';

import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { cartCount, toggleCart } = usePrintShop();

  return (
    <button
      onClick={toggleCart}
      className={`relative p-2 text-steelpolished-400 hover:text-steelpolished-300 transition-colors ${className}`}
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <ShoppingCart size={24} />
      
      {/* Cart Count Badge */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {cartCount > 99 ? '99+' : cartCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
