'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { PhotoData } from '@/components/lightbox/PhotoLightbox';
import {
  PRINT_SIZES,
  PRINT_MATERIALS,
  PrintSize,
  PrintMaterial,
  PrintProduct,
} from '@/types/printShop';
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
      const printProduct: PrintProduct = {
        id: `print-${photo.asset._ref}-${selectedSize.id}-${selectedMaterial.id}`,
        type: 'print',
        name: photo.title || 'Untitled Photo',
        slug: `print-${photo.asset._ref}`,
        description: `High-quality print of ${photo.title || 'gallery photo'}`,
        shortDescription: photo.title || 'Gallery Photo',
        price: totalPrice,
        isActive: true,
        isFeatured: false,
        images: [
          {
            id: '1',
            url: urlForImage(photo as any)?.url() || '',
            alt: photo.alt || photo.title || 'Gallery photo',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
        seo: {
          metaTitle: photo.title || 'Gallery Photo Print',
          metaDescription: `High-quality print of ${photo.title || 'gallery photo'}`,
          keywords: photo.tags || [],
          slug: `print-${photo.asset._ref}`,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        photoId: photo.asset._ref,
        photoTitle: photo.title || 'Untitled Photo',
        photoUrl: urlForImage(photo as any)?.url() || '',
        photoAlt: photo.alt,
        variants: [
          {
            id: `${selectedSize.id}-${selectedMaterial.id}`,
            size: selectedSize,
            material: selectedMaterial,
            price: totalPrice,
            isAvailable: true,
          },
        ],
      };

      const variant = {
        size: selectedSize,
        material: selectedMaterial,
      };

      addToCart(printProduct, quantity, variant);
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='z-70 fixed inset-0 flex items-center justify-center bg-steeldark-900/80 p-4 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-steeldark-600 bg-steeldark-800'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between border-b border-steeldark-600 p-6'>
              <h2 className='text-xl font-semibold text-steelpolished-400'>Order Print</h2>
              <button
                onClick={onClose}
                className='rounded-full p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-700'
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='space-y-6 p-6'>
              {/* Photo Preview */}
              <div className='flex gap-4'>
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-steeldark-700'>
                  <img
                    src={urlForImage(photo as any)?.url() || ''}
                    alt={photo.alt || 'Photo preview'}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium text-steelpolished-400'>
                    {photo.title || 'Untitled Photo'}
                  </h3>
                  {photo.location && (
                    <p className='text-sm text-steelpolished-500'>
                      {typeof photo.location === 'string'
                        ? photo.location
                        : [
                            photo.location.venue,
                            photo.location.city,
                            photo.location.state,
                            photo.location.country,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                    </p>
                  )}
                  {photo.description && (
                    <p className='mt-1 line-clamp-2 text-sm text-steelpolished-500'>
                      {photo.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div className='space-y-3'>
                <h4 className='font-medium text-steelpolished-400'>Size</h4>
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  {PRINT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border p-3 text-left transition-colors ${
                        selectedSize.id === size.id
                          ? 'border-accent bg-accent/10 text-steelpolished-300'
                          : 'border-steeldark-600 text-steelpolished-500 hover:border-steeldark-500'
                      }`}
                    >
                      <div className='font-medium'>{size.name}</div>
                      <div className='text-sm'>${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className='space-y-3'>
                <h4 className='font-medium text-steelpolished-400'>Material</h4>
                <div className='space-y-2'>
                  {PRINT_MATERIALS.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${
                        selectedMaterial.id === material.id
                          ? 'border-accent bg-accent/10 text-steelpolished-300'
                          : 'border-steeldark-600 text-steelpolished-500 hover:border-steeldark-500'
                      }`}
                    >
                      <div className='font-medium'>{material.name}</div>
                      <div className='text-sm'>{material.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className='space-y-3'>
                <h4 className='font-medium text-steelpolished-400'>Quantity</h4>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className='rounded-lg border border-steeldark-600 p-2 text-steelpolished-400 hover:bg-steeldark-700 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Minus size={16} />
                  </button>
                  <span className='w-12 text-center font-medium text-steelpolished-400'>
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className='rounded-lg border border-steeldark-600 p-2 text-steelpolished-400 hover:bg-steeldark-700 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className='space-y-2 rounded-lg bg-steeldark-700/50 p-4'>
                <div className='flex justify-between text-steelpolished-500'>
                  <span>Size: {selectedSize.name}</span>
                  <span>${selectedSize.price}</span>
                </div>
                <div className='flex justify-between text-steelpolished-500'>
                  <span>Material: {selectedMaterial.name}</span>
                  <span>{selectedMaterial.priceMultiplier}x</span>
                </div>
                <div className='flex justify-between text-steelpolished-500'>
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <hr className='border-steeldark-600' />
                <div className='flex justify-between text-lg font-semibold text-steelpolished-300'>
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className='flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isAdding ? (
                  <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
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
