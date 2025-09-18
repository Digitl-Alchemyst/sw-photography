'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { cart, cartSummary, removeFromCart, updateQuantity, clearCart } = usePrintShop();

  const handleCheckout = () => {
    // TODO: Implement checkout process
    console.log('Proceeding to checkout with items:', cart);
    alert('Checkout functionality will be implemented with payment processing.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='z-60 fixed inset-0 bg-steeldark-900/50 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-60 fixed right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-steeldark-600 bg-steeldark-800'
          >
            {/* Header */}
            <div className='flex items-center justify-between border-b border-steeldark-600 p-6'>
              <div className='flex items-center gap-2'>
                <ShoppingBag size={20} className='text-steelpolished-400' />
                <h2 className='text-lg font-semibold text-steelpolished-400'>
                  Shopping Cart ({cart.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className='rounded-full p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-700'
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Content */}
            <div className='flex h-full flex-col'>
              {cart.length === 0 ? (
                <div className='flex flex-1 items-center justify-center p-6'>
                  <div className='text-center'>
                    <ShoppingBag size={48} className='mx-auto mb-4 text-steelpolished-600' />
                    <p className='text-steelpolished-500'>Your cart is empty</p>
                    <p className='mt-1 text-sm text-steelpolished-600'>
                      Add some prints to get started
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className='flex-1 space-y-4 p-6'>
                    {cart.map((item) => (
                      <div key={item.id} className='space-y-3 rounded-lg bg-steeldark-700/50 p-4'>
                        {/* Item Header */}
                        <div className='flex items-start gap-3'>
                          <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-steeldark-700'>
                            <Image
                              src={item.photoUrl || '/placeholder-product.jpg'}
                              alt={item.photoTitle || 'Product image'}
                              width={64}
                              height={64}
                              className='h-full w-full object-cover'
                            />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <h3 className='truncate font-medium text-steelpolished-400'>
                              {item.photoTitle}
                            </h3>
                            <p className='text-sm text-steelpolished-500'>
                              {item.size?.name} • {item.material?.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className='p-1 text-steelpolished-500 transition-colors hover:text-steelpolished-400'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className='rounded border border-steeldark-600 p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-600'
                            >
                              <Minus size={14} />
                            </button>
                            <span className='w-8 text-center text-sm text-steelpolished-400'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className='rounded border border-steeldark-600 p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-600'
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className='font-medium text-steelpolished-400'>
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Footer */}
                  <div className='space-y-4 border-t border-steeldark-600 p-6'>
                    {/* Clear Cart */}
                    <button
                      onClick={clearCart}
                      className='w-full text-sm text-steelpolished-500 transition-colors hover:text-steelpolished-400'
                    >
                      Clear Cart
                    </button>

                    {/* Total */}
                    <div className='flex items-center justify-between text-lg font-semibold text-steelpolished-300'>
                      <span>Total</span>
                      <span>${cartSummary.total.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className='w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent/90'
                    >
                      Proceed to Checkout
                    </button>

                    {/* Continue Shopping */}
                    <button
                      onClick={onClose}
                      className='w-full py-2 text-sm text-steelpolished-400 transition-colors hover:text-steelpolished-300'
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
