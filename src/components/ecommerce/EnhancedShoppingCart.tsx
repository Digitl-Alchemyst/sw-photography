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
  const { cart, cartSummary, removeFromCart, updateQuantity, clearCart } = usePrintShop();

  const handleCheckout = () => {
    const validation = usePrintShop().validateCart();
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
      return <Download size={16} className="text-steelpolished-400" />;
    }
    return <Package size={16} className="text-steelpolished-400" />;
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
          className="fixed inset-0 z-50 bg-steeldark-900/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-60 h-full w-full max-w-md overflow-y-auto bg-steeldark-800 border-l border-steeldark-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-steeldark-600 p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-steelpolished-400" />
                <h2 className="text-lg font-semibold text-steelpolished-400">
                  Shopping Cart ({cartSummary.itemCount})
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
                      Add some products to get started
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
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-steelpolished-400 text-sm">
                                  {item.productName}
                                </h3>
                                <div className="flex items-center gap-1 mt-1">
                                  {getProductTypeIcon(item.productType)}
                                  <span className="text-xs text-steelpolished-500">
                                    {PRODUCT_TYPE_CONFIG[item.productType as keyof typeof PRODUCT_TYPE_CONFIG]?.name || item.productType}
                                  </span>
                                </div>
                                {formatVariantText(item) && (
                                  <p className="text-xs text-steelpolished-500 mt-1">
                                    {formatVariantText(item)}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 rounded text-steelpolished-500 hover:text-red-400 hover:bg-steeldark-600 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
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
                          <div className="text-right">
                            <div className="font-medium text-steelpolished-400">
                              ${item.totalPrice.toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-steelpolished-500">
                                ${item.unitPrice.toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t border-steeldark-600 p-6 space-y-4">
                    {/* Summary Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-steelpolished-500">
                        <span>Subtotal ({cartSummary.totalQuantity} items)</span>
                        <span>${cartSummary.subtotal.toFixed(2)}</span>
                      </div>
                      
                      {cartSummary.hasPhysicalItems && (
                        <div className="flex justify-between text-steelpolished-500">
                          <span>Shipping</span>
                          <span>
                            {cartSummary.estimatedShipping === 0 ? 'FREE' : `$${cartSummary.estimatedShipping.toFixed(2)}`}
                          </span>
                        </div>
                      )}
                      
                      {cartSummary.estimatedTax > 0 && (
                        <div className="flex justify-between text-steelpolished-500">
                          <span>Estimated Tax</span>
                          <span>${cartSummary.estimatedTax.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <hr className="border-steeldark-600" />
                      
                      <div className="flex justify-between text-steelpolished-300 font-semibold text-lg">
                        <span>Total</span>
                        <span>${cartSummary.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Product Type Summary */}
                    {(cartSummary.hasPhysicalItems || cartSummary.hasDigitalItems) && (
                      <div className="bg-steeldark-700/30 rounded-lg p-3">
                        <div className="text-xs text-steelpolished-500 space-y-1">
                          {cartSummary.hasDigitalItems && (
                            <div className="flex items-center gap-1">
                              <Download size={12} />
                              <span>Digital products will be available for download immediately</span>
                            </div>
                          )}
                          {cartSummary.hasPhysicalItems && (
                            <div className="flex items-center gap-1">
                              <Package size={12} />
                              <span>Physical items will be shipped to your address</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                      >
                        <CreditCard size={20} />
                        Checkout
                      </button>
                      
                      <button
                        onClick={clearCart}
                        className="w-full text-steelpolished-500 hover:text-steelpolished-400 py-2 text-sm transition-colors"
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
