'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { PhotoData } from '@/components/lightbox/PhotoLightbox';
import { PRINT_SIZES, PRINT_MATERIALS, PrintSize, PrintMaterial } from '@/types/printShop';
import { usePrintShop } from '@/contexts/PrintShopContext';
import { getPrintShopService } from '@/lib/printShop/printShopService';
import urlForImage from '@/lib/util/urlForImage';

interface PrintOrderModalProps {
  photo: PhotoData;
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintOrderModal({ photo, isOpen, onClose }: PrintOrderModalProps) {
  const [selectedSize, setSelectedSize] = useState<PrintSize>(PRINT_SIZES[1]); // Default to 8x10
  const [selectedMaterial, setSelectedMaterial] = useState<PrintMaterial>(PRINT_MATERIALS[0]); // Default to standard
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = usePrintShop();
  const printShopService = getPrintShopService();

  const totalPrice = printShopService.calculateItemPrice(selectedSize, selectedMaterial, quantity);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      const product = {
        photoId: photo.asset._ref,
        photoTitle: photo.title || 'Untitled Photo',
        photoUrl: urlForImage(photo as any)?.url() || '',
        size: selectedSize,
        material: selectedMaterial,
        quantity,
        totalPrice,
      };

      addToCart(product);
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 flex items-center justify-center bg-steeldark-900/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-steeldark-800 rounded-lg border border-steeldark-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-steeldark-600">
              <h2 className="text-xl font-semibold text-steelpolished-400">Order Print</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-steelpolished-400 hover:bg-steeldark-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Photo Preview */}
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-steeldark-700 flex-shrink-0">
                  <img
                    src={urlForImage(photo as any)?.url() || ''}
                    alt={photo.alt || 'Photo preview'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-steelpolished-400">
                    {photo.title || 'Untitled Photo'}
                  </h3>
                  {photo.location && (
                    <p className="text-sm text-steelpolished-500">{photo.location}</p>
                  )}
                  {photo.description && (
                    <p className="text-sm text-steelpolished-500 mt-1 line-clamp-2">
                      {photo.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h4 className="font-medium text-steelpolished-400">Size</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRINT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedSize.id === size.id
                          ? 'border-accent bg-accent/10 text-steelpolished-300'
                          : 'border-steeldark-600 text-steelpolished-500 hover:border-steeldark-500'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="space-y-3">
                <h4 className="font-medium text-steelpolished-400">Material</h4>
                <div className="space-y-2">
                  {PRINT_MATERIALS.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        selectedMaterial.id === material.id
                          ? 'border-accent bg-accent/10 text-steelpolished-300'
                          : 'border-steeldark-600 text-steelpolished-500 hover:border-steeldark-500'
                      }`}
                    >
                      <div className="font-medium">{material.name}</div>
                      <div className="text-sm">{material.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h4 className="font-medium text-steelpolished-400">Quantity</h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-steelpolished-400 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="p-2 rounded-lg border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-steeldark-700/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-steelpolished-500">
                  <span>Size: {selectedSize.name}</span>
                  <span>${selectedSize.price}</span>
                </div>
                <div className="flex justify-between text-steelpolished-500">
                  <span>Material: {selectedMaterial.name}</span>
                  <span>{selectedMaterial.priceMultiplier}x</span>
                </div>
                <div className="flex justify-between text-steelpolished-500">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <hr className="border-steeldark-600" />
                <div className="flex justify-between text-steelpolished-300 font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAdding ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart size={20} />
                )}
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
