'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Download, 
  Package, 
  Star, 
  Tag, 
  Info, 
  Check,
  Plus,
  Minus,
  Heart,
  Share2
} from 'lucide-react';
import { 
  Product, 
  PrintProduct, 
  PresetProduct, 
  LUTProduct, 
  BundleProduct,
  PRODUCT_TYPE_CONFIG,
  PrintSize,
  PrintMaterial,
  PRINT_SIZES,
  PRINT_MATERIALS
} from '@/types/printShop';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface ProductDetailProps {
  product: Product;
  className?: string;
}

export default function ProductDetail({ product, className = '' }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<PrintSize | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<PrintMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  const { addToCart } = usePrintShop();
  const productConfig = PRODUCT_TYPE_CONFIG[product.type];

  // Initialize print product selections
  useState(() => {
    if (product.type === 'print' && 'variants' in product) {
      const printProduct = product as PrintProduct;
      if (printProduct.variants.length > 0) {
        setSelectedSize(printProduct.variants[0].size);
        setSelectedMaterial(printProduct.variants[0].material);
      }
    }
  });

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const getCurrentPrice = () => {
    if (product.type === 'print' && selectedSize && selectedMaterial) {
      const basePrice = selectedSize.price;
      const materialMultiplier = selectedMaterial.priceMultiplier;
      return Math.round(basePrice * materialMultiplier * 100) / 100;
    }
    return product.price;
  };

  const canAddToCart = () => {
    if (product.type === 'print') {
      return selectedSize && selectedMaterial;
    }
    return product.isActive;
  };

  const handleAddToCart = async () => {
    if (!canAddToCart()) return;

    setIsLoading(true);
    try {
      const variant = product.type === 'print' && selectedSize && selectedMaterial
        ? { size: selectedSize, material: selectedMaterial }
        : undefined;

      addToCart(product, quantity, variant);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getProductImages = () => {
    if (product.images && product.images.length > 0) {
      return product.images.map(img => img.url);
    }
    return ['/placeholder-product.jpg'];
  };

  const images = getProductImages();

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-steeldark-700 rounded-lg overflow-hidden">
            <Image
              src={images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Product Type Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-steeldark-900/80 backdrop-blur-sm rounded-full px-3 py-1">
              {productConfig?.isDigital ? (
                <Download size={14} className="text-steelpolished-400" />
              ) : (
                <Package size={14} className="text-steelpolished-400" />
              )}
              <span className="text-sm text-steelpolished-400 font-medium">
                {productConfig?.name}
              </span>
            </div>

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1">
                <span className="text-sm font-bold">-{discountPercentage}%</span>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-accent'
                      : 'border-steeldark-600 hover:border-steelpolished-400'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-steelpolished-400">{product.name}</h1>
              <div className="flex items-center gap-2">
                <button className="p-2 text-steelpolished-400 hover:text-accent transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 text-steelpolished-400 hover:text-accent transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {product.isFeatured && (
              <div className="flex items-center gap-1 text-accent mb-2">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-medium">Featured Product</span>
              </div>
            )}

            {product.shortDescription && (
              <p className="text-steelpolished-500">{product.shortDescription}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-steelpolished-300">
                {formatPrice(getCurrentPrice())}
              </span>
              {hasDiscount && (
                <span className="text-xl text-steelpolished-500 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>
            {product.type === 'print' && selectedSize && selectedMaterial && (
              <p className="text-sm text-steelpolished-500">
                Price for {selectedSize.name} on {selectedMaterial.name}
              </p>
            )}
          </div>

          {/* Print Product Options */}
          {product.type === 'print' && 'variants' in product && (
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium text-steelpolished-400 mb-2">Size</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRINT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedSize?.id === size.id
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
              <div>
                <h3 className="text-lg font-medium text-steelpolished-400 mb-2">Material</h3>
                <div className="space-y-2">
                  {PRINT_MATERIALS.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        selectedMaterial?.id === material.id
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
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-medium text-steelpolished-400 mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-700 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-steelpolished-400 font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="p-2 rounded-lg border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart() || isLoading}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShoppingCart size={20} />
              )}
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>

            {productConfig?.isDigital && (
              <div className="flex items-center gap-2 text-sm text-steelpolished-500">
                <Download size={16} />
                <span>Digital download available immediately after purchase</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-steelpolished-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 text-sm text-steelpolished-500 bg-steeldark-700 px-3 py-1 rounded-full"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 border-t border-steeldark-600 pt-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-steeldark-600">
          {[
            { id: 'description', label: 'Description' },
            { id: 'details', label: 'Details' },
            { id: 'reviews', label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-steelpolished-500 hover:text-steelpolished-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p className="text-steelpolished-500">No description available.</p>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-steelpolished-400 mb-2">Product Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-steelpolished-500">Type:</dt>
                      <dd className="text-steelpolished-400">{productConfig?.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-steelpolished-500">Digital:</dt>
                      <dd className="text-steelpolished-400">
                        {productConfig?.isDigital ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-steelpolished-500">Shipping Required:</dt>
                      <dd className="text-steelpolished-400">
                        {productConfig?.requiresShipping ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-steelpolished-500">Reviews feature coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
