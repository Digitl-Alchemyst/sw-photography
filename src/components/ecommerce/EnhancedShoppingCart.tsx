'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Package, Download, CreditCard } from 'lucide-react';
import { usePrintShop } from '@/contexts/PrintShopContext';
import { PRODUCT_TYPE_CONFIG } from '@/types/printShop';

interface EnhancedShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnhancedShoppingCart({ isOpen, onClose }: EnhancedShoppingCartProps) {
  const { cart, cartSummary, removeFromCart, updateQuantity, clearCart, validateCart } =
    usePrintShop();

  const handleCheckout = () => {
    const validation = validateCart();
    if (!validation.isValid) {
      alert(`Cart validation failed: ${validation.errors.join(', ')}`);
      return;
    }

    // TODO: Implement checkout process
    console.log('Proceeding to checkout with items:', cart);
    console.log('Cart summary:', cartSummary);
    alert('Checkout functionality will be implemented with payment processing.');
  };

  const getProductTypeIcon = (productType: string) => {
    const config = PRODUCT_TYPE_CONFIG[productType as keyof typeof PRODUCT_TYPE_CONFIG];
    if (config?.isDigital) {
      return <Download size={16} className='text-steelpolished-400' />;
    }
    return <Package size={16} className='text-steelpolished-400' />;
  };

  const formatVariantText = (item: any) => {
    if (item.variant?.size && item.variant?.material) {
      return `${item.variant.size.name} - ${item.variant.material.name}`;
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 bg-steeldark-900/80 backdrop-blur-sm'
          onClick={onClose}
        >
          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-60 fixed right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-steeldark-600 bg-steeldark-800'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between border-b border-steeldark-600 p-6'>
              <div className='flex items-center gap-2'>
                <ShoppingBag size={20} className='text-steelpolished-400' />
                <h2 className='text-lg font-semibold text-steelpolished-400'>
                  Shopping Cart ({cartSummary.itemCount})
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
                      Add some products to get started
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
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className='h-full w-full object-cover'
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <div className='flex items-start justify-between'>
                              <div>
                                <h3 className='text-sm font-medium text-steelpolished-400'>
                                  {item.productName}
                                </h3>
                                <div className='mt-1 flex items-center gap-1'>
                                  {getProductTypeIcon(item.productType)}
                                  <span className='text-xs text-steelpolished-500'>
                                    {PRODUCT_TYPE_CONFIG[
                                      item.productType as keyof typeof PRODUCT_TYPE_CONFIG
                                    ]?.name || item.productType}
                                  </span>
                                </div>
                                {formatVariantText(item) && (
                                  <p className='mt-1 text-xs text-steelpolished-500'>
                                    {formatVariantText(item)}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className='rounded p-1 text-steelpolished-500 transition-colors hover:bg-steeldark-600 hover:text-red-400'
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
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
                          <div className='text-right'>
                            <div className='font-medium text-steelpolished-400'>
                              ${item.totalPrice.toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className='text-xs text-steelpolished-500'>
                                ${item.unitPrice.toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className='space-y-4 border-t border-steeldark-600 p-6'>
                    {/* Summary Details */}
                    <div className='space-y-2'>
                      <div className='flex justify-between text-steelpolished-500'>
                        <span>Subtotal ({cartSummary.totalQuantity} items)</span>
                        <span>${cartSummary.subtotal.toFixed(2)}</span>
                      </div>

                      {cartSummary.hasPhysicalItems && (
                        <div className='flex justify-between text-steelpolished-500'>
                          <span>Shipping</span>
                          <span>
                            {cartSummary.estimatedShipping === 0
                              ? 'FREE'
                              : `$${cartSummary.estimatedShipping.toFixed(2)}`}
                          </span>
                        </div>
                      )}

                      {cartSummary.estimatedTax > 0 && (
                        <div className='flex justify-between text-steelpolished-500'>
                          <span>Estimated Tax</span>
                          <span>${cartSummary.estimatedTax.toFixed(2)}</span>
                        </div>
                      )}

                      <hr className='border-steeldark-600' />

                      <div className='flex justify-between text-lg font-semibold text-steelpolished-300'>
                        <span>Total</span>
                        <span>${cartSummary.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Product Type Summary */}
                    {(cartSummary.hasPhysicalItems || cartSummary.hasDigitalItems) && (
                      <div className='rounded-lg bg-steeldark-700/30 p-3'>
                        <div className='space-y-1 text-xs text-steelpolished-500'>
                          {cartSummary.hasDigitalItems && (
                            <div className='flex items-center gap-1'>
                              <Download size={12} />
                              <span>
                                Digital products will be available for download immediately
                              </span>
                            </div>
                          )}
                          {cartSummary.hasPhysicalItems && (
                            <div className='flex items-center gap-1'>
                              <Package size={12} />
                              <span>Physical items will be shipped to your address</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className='space-y-2'>
                      <button
                        onClick={handleCheckout}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent/90'
                      >
                        <CreditCard size={20} />
                        Checkout
                      </button>

                      <button
                        onClick={clearCart}
                        className='w-full py-2 text-sm text-steelpolished-500 transition-colors hover:text-steelpolished-400'
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
