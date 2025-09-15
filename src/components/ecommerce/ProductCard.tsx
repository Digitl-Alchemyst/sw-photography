'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Download, Package, Star, Tag } from 'lucide-react';
import { Product, PRODUCT_TYPE_CONFIG } from '@/types/printShop';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickAdd?: boolean;
  showPreview?: boolean;
}

export default function ProductCard({ 
  product, 
  className = '', 
  showQuickAdd = true,
  showPreview = true 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = usePrintShop();

  const productConfig = PRODUCT_TYPE_CONFIG[product.type];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.type === 'print') {
      // For print products, we need variant selection - redirect to product page
      return;
    }

    setIsLoading(true);
    try {
      addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    return '/placeholder-product.jpg';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      className={`group relative bg-steeldark-800 rounded-lg border border-steeldark-600 overflow-hidden transition-all duration-300 hover:border-steelpolished-400/30 hover:shadow-lg hover:shadow-steeldark-900/20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      <Link href={`/shop/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-steeldark-700">
          <Image
            src={getProductImage()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Product Type Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-steeldark-900/80 backdrop-blur-sm rounded-full px-2 py-1">
            {productConfig?.isDigital ? (
              <Download size={12} className="text-steelpolished-400" />
            ) : (
              <Package size={12} className="text-steelpolished-400" />
            )}
            <span className="text-xs text-steelpolished-400 font-medium">
              {productConfig?.name}
            </span>
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-accent text-white rounded-full px-2 py-1">
              <span className="text-xs font-bold">-{discountPercentage}%</span>
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Star size={12} className="text-white fill-current" />
              <span className="text-xs text-white font-medium">Featured</span>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-steeldark-900/60 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {showPreview && (
              <button className="p-2 bg-steelpolished-400 text-steeldark-900 rounded-full hover:bg-steelpolished-300 transition-colors">
                <Eye size={16} />
              </button>
            )}
            
            {showQuickAdd && product.type !== 'print' && (
              <button
                onClick={handleQuickAdd}
                disabled={isLoading}
                className="p-2 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart size={16} />
                )}
              </button>
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Product Name */}
          <h3 className="font-medium text-steelpolished-400 line-clamp-2 group-hover:text-steelpolished-300 transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-sm text-steelpolished-500 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <Tag size={12} className="text-steelpolished-600" />
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-steelpolished-600 bg-steeldark-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs text-steelpolished-600">
                  +{product.tags.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-steelpolished-300">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-steelpolished-500 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>
            
            {!product.isActive && (
              <span className="text-xs text-steelpolished-600 bg-steeldark-700 px-2 py-1 rounded">
                Unavailable
              </span>
            )}
          </div>

          {/* Print Product Variants Info */}
          {product.type === 'print' && 'variants' in product && (
            <div className="text-xs text-steelpolished-500">
              {product.variants.length} size{product.variants.length !== 1 ? 's' : ''} available
            </div>
          )}

          {/* Digital Product Info */}
          {productConfig?.isDigital && (
            <div className="flex items-center gap-2 text-xs text-steelpolished-500">
              <Download size={12} />
              <span>Instant download</span>
            </div>
          )}
        </div>
      </Link>

      {/* Quick Add Button for Print Products */}
      {showQuickAdd && product.type === 'print' && (
        <div className="absolute bottom-4 right-4">
          <Link href={`/shop/products/${product.slug}`}>
            <button className="p-2 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors shadow-lg">
              <Eye size={16} />
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
