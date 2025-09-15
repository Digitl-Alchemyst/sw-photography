'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = usePrintShop();

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
            className="fixed inset-0 z-60 bg-steeldark-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-60 h-full w-full max-w-md overflow-y-auto bg-steeldark-800 border-l border-steeldark-600"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-steeldark-600 p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-steelpolished-400" />
                <h2 className="text-lg font-semibold text-steelpolished-400">
                  Shopping Cart ({cart.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="text-center">
                    <ShoppingBag size={48} className="mx-auto text-steelpolished-600 mb-4" />
                    <p className="text-steelpolished-500">Your cart is empty</p>
                    <p className="text-sm text-steelpolished-600 mt-1">
                      Add some prints to get started
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 p-6 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-steeldark-700/50 rounded-lg p-4 space-y-3"
                      >
                        {/* Item Header */}
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-steeldark-700 flex-shrink-0">
                            <img
                              src={item.photoUrl}
                              alt={item.photoTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-steelpolished-400 truncate">
                              {item.photoTitle}
                            </h3>
                            <p className="text-sm text-steelpolished-500">
                              {item.size.name} • {item.material.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-steelpolished-500 hover:text-steelpolished-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-600 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-steelpolished-400 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-600 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium text-steelpolished-400">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Footer */}
                  <div className="border-t border-steeldark-600 p-6 space-y-4">
                    {/* Clear Cart */}
                    <button
                      onClick={clearCart}
                      className="w-full text-sm text-steelpolished-500 hover:text-steelpolished-400 transition-colors"
                    >
                      Clear Cart
                    </button>

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg font-semibold text-steelpolished-300">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    >
                      Proceed to Checkout
                    </button>

                    {/* Continue Shopping */}
                    <button
                      onClick={onClose}
                      className="w-full text-steelpolished-400 py-2 text-sm hover:text-steelpolished-300 transition-colors"
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
