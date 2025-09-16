'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import urlForImage from '@/lib/util/urlForImage';
import { PhotoData } from '@/components/lightbox/PhotoLightbox';
import { usePrintShop } from '@/contexts/PrintShopContext';

interface GalleryPhotoProps {
  photo: PhotoData;
  index: number;
  width: number;
  height: number;
  onClick: (index: number) => void;
  className?: string;
  priority?: boolean;
  showMetadata?: boolean;
  galleryType?: 'photoshoot' | 'event' | 'showcase';
}

export default function GalleryPhoto({
  photo,
  index,
  width,
  height,
  onClick,
  className = '',
  priority = false,
  showMetadata = true,
  galleryType,
}: GalleryPhotoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = usePrintShop();

  const handleClick = () => {
    onClick(index);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening lightbox

    if (!photo.printOptions?.available) return;

    // Create a mock print product from the photo
    const printProduct = {
      id: `photo-${index}`,
      type: 'print' as const,
      name: photo.title || `Gallery Photo ${index + 1}`,
      slug: `gallery-photo-${index}`,
      description: `High-quality print of ${photo.title || 'gallery photo'}`,
      shortDescription: photo.title || `Gallery Photo ${index + 1}`,
      price: 25, // Default price since basePrice is not in PrintOptions
      isActive: true,
      isFeatured: false,
      images: [
        {
          id: '1',
          url: urlForImage(photo as any)?.url() || '',
          alt: photo.alt || 'Gallery photo',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
      categories: ['prints', 'gallery'],
      tags: photo.tags || [],
      seo: {
        metaTitle: `${photo.title || 'Gallery Photo'} Print`,
        metaDescription: `High-quality print of ${photo.title || 'gallery photo'}`,
        keywords: photo.tags || [],
        slug: `gallery-photo-${index}`,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      variants: [],
    };

    // Add to cart with default size and material
    addToCart(printProduct as any, 1, {
      size: {
        id: '8x10',
        name: '8" x 10"',
        dimensions: '8x10',
        price: 25, // Default price since basePrice is not in PrintOptions
      },
      material: {
        id: 'standard',
        name: 'Standard Paper',
        description: 'High-quality photo paper',
        priceMultiplier: 1.0,
      },
    });
  };

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-md ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div
          className='absolute inset-0 animate-pulse bg-steeldark-700'
          style={{ width, height }}
        />
      )}

      {/* Main Image */}
      <Image
        src={urlForImage(photo as any)?.url() || ''}
        width={width}
        height={height}
        priority={priority}
        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        alt={photo.alt || 'Gallery photo'}
        className={`w-full rounded-md transition-all duration-300 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'brightness-110' : ''}`}
        onLoad={handleImageLoad}
      />

      {/* Hover Overlay */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-t from-steeldark-900/60 via-transparent to-transparent'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Photo Info on Hover */}
      {showMetadata && (photo.title || photo.location || photo.tags) && (
        <motion.div
          className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-steeldark-900/90 to-transparent p-3 text-white'
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {photo.title && (
            <h3 className='truncate text-sm font-medium text-steelpolished-200'>{photo.title}</h3>
          )}
          {photo.location && (
            <p className='truncate text-xs text-steelpolished-300'>
              {typeof photo.location === 'string'
                ? photo.location
                : [photo.location.venue, photo.location.city, photo.location.state]
                    .filter(Boolean)
                    .join(', ')}
            </p>
          )}
          {photo.tags && photo.tags.length > 0 && (
            <div className='mt-1 flex flex-wrap gap-1'>
              {photo.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className='rounded bg-steelpolished-400/20 px-1 py-0.5 text-xs text-steelpolished-300'
                >
                  {tag}
                </span>
              ))}
              {photo.tags.length > 3 && (
                <span className='text-xs text-steelpolished-400'>+{photo.tags.length - 3}</span>
              )}
            </div>
          )}
          {photo.printOptions?.available && (
            <div className='mt-2 flex items-center gap-2'>
              <span className='rounded bg-steelpolished-400/30 px-2 py-1 text-xs text-steelpolished-200'>
                Available for Print
              </span>
              <button
                onClick={handleAddToCart}
                className='flex items-center gap-1 rounded bg-accent/80 px-2 py-1 text-xs text-white transition-colors hover:bg-accent'
              >
                <ShoppingCart size={12} />
                Add to Cart
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Click Indicator */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className='rounded-full bg-steeldark-800/80 p-2 backdrop-blur-sm'>
          <svg
            className='h-6 w-6 text-steelpolished-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
