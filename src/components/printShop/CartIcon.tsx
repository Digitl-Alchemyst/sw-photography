'use client';

import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { cartSummary, toggleCart } = usePrintShop();

  return (
    <button
      onClick={toggleCart}
      className={`relative p-2 text-steelpolished-400 transition-colors hover:text-steelpolished-300 ${className}`}
      aria-label={`Shopping cart with ${cartSummary.itemCount} items`}
    >
      <ShoppingCart size={24} />

      {/* Cart Count Badge */}
      <AnimatePresence>
        {cartSummary.itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white'
          >
            {cartSummary.itemCount > 99 ? '99+' : cartSummary.itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
