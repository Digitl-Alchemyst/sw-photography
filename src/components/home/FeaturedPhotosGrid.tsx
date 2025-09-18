'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import urlForImage from '@/lib/util/urlForImage';
import PhotoLightbox from '@/components/lightbox/PhotoLightbox';
import { PhotoData } from '@/types/lightbox';
import useLightbox from '@/hooks/useLightbox';

interface FeaturedPhotosGridProps {
  featuredPhotos: any[];
}

export default function FeaturedPhotosGrid({ featuredPhotos }: FeaturedPhotosGridProps) {
  const lightbox = useLightbox();

  // Transform featured photos to PhotoData format
  const photoData: PhotoData[] = useMemo(() => {
    return (
      featuredPhotos?.map((photo) => ({
        asset: photo.asset,
        alt: photo.alt || 'Featured work',
        title: photo.title || 'Featured Photography',
        description: photo.description,
        printOptions: {
          available: true,
          basePrice: 35,
          sizes: ['8x10', '11x14', '16x20', '20x24', '24x36'],
        },
      })) || []
    );
  }, [featuredPhotos]);

  const handlePhotoClick = (index: number) => {
    lightbox.openLightbox(photoData, index);
  };

  if (!featuredPhotos?.length) {
    return null;
  }

  return (
    <>
      {/* Featured Photos Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8'>
        {featuredPhotos.map((photo, index) => (
          <motion.div
            key={index}
            className='group relative cursor-pointer overflow-hidden rounded-lg border border-steeldark-400 bg-steelpolished-600/20 shadow-2xl shadow-steeldark-800 drop-shadow-lg'
            onClick={() => handlePhotoClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className='relative h-64 w-full md:h-80 lg:h-72 xl:h-80'>
              <Image
                src={urlForImage(photo as any)?.url() || ''}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                alt={photo.alt || `Featured work ${index + 1}`}
                className='object-cover object-center transition-all duration-300 group-hover:opacity-90'
              />

              {/* Overlay on hover */}
              <div className='absolute inset-0 bg-gradient-to-t from-steeldark-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

              {/* Content overlay */}
              <div className='absolute bottom-4 left-4 right-4 translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                <h3 className='text-lg font-semibold text-steelpolished-200'>
                  {photo.title || 'Featured Work'}
                </h3>
                {photo.description && (
                  <p className='mt-1 line-clamp-2 text-sm text-steelpolished-300'>
                    {photo.description}
                  </p>
                )}
              </div>

              {/* Click indicator */}
              <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <div className='rounded-full bg-steeldark-800/80 p-3 backdrop-blur-sm'>
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
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={lightbox.photos}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        onNavigate={lightbox.navigateToPhoto}
        galleryTitle='Featured Portfolio'
        photographer='Steven Watkins'
      />
    </>
  );
}
