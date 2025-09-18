'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import urlForImage from '@/lib/util/urlForImage';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import PhotoDetailsPanel from './PhotoDetailsPanel';
import { PhotoData } from '@/types/lightbox';

interface PhotoLightboxProps {
  photos: PhotoData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  galleryTitle?: string;
  galleryDate?: string;
  photographer?: string;
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  galleryTitle,
  galleryDate,
  photographer,
}: PhotoLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const currentPhoto = photos[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < photos.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
        case 'i':
        case 'I':
          setShowDetails(!showDetails);
          break;
      }
    },
    [isOpen, currentIndex, photos.length, onNavigate, onClose, showDetails],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handlePrintOrder = () => {
    // TODO: Implement print shop integration
    console.log('Order print for photo:', currentPhoto);
  };

  // Touch gesture handling for mobile
  const bind = useGesture({
    onDrag: ({ direction: [dx], distance, cancel }) => {
      // Only handle horizontal swipes
      const swipeDistance = Math.sqrt(distance[0] ** 2 + distance[1] ** 2);
      if (swipeDistance > 50) {
        if (dx > 0 && currentIndex > 0) {
          // Swipe right - go to previous
          handlePrevious();
          cancel();
        } else if (dx < 0 && currentIndex < photos.length - 1) {
          // Swipe left - go to next
          handleNext();
          cancel();
        }
      }
    },
    onPinch: ({ offset: [scale], cancel }) => {
      // Prevent pinch zoom on the lightbox
      if (scale !== 1) {
        cancel();
      }
    },
  });

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-steeldark-900/95 backdrop-blur-sm'
          onClick={onClose}
        >
          {/* Main Content Container */}
          <div
            className='relative flex h-full w-full max-w-7xl items-center justify-center p-4'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className='absolute right-4 top-4 z-10 rounded-full bg-steeldark-800/80 p-2 text-steelpolished-400 transition-all duration-200 hover:bg-steeldark-700 hover:text-steelpolished-300'
              aria-label='Close lightbox'
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-steeldark-800/80 p-3 text-steelpolished-400 transition-all duration-200 hover:bg-steeldark-700 hover:text-steelpolished-300'
                aria-label='Previous photo'
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next Button */}
            {currentIndex < photos.length - 1 && (
              <button
                onClick={handleNext}
                className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-steeldark-800/80 p-3 text-steelpolished-400 transition-all duration-200 hover:bg-steeldark-700 hover:text-steelpolished-300'
                aria-label='Next photo'
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Image Container */}
            <div className='relative flex h-full w-full items-center justify-center' {...bind()}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='relative max-h-[90vh] max-w-[90vw] touch-none'
              >
                {isLoading && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='h-8 w-8 animate-spin rounded-full border-2 border-steelpolished-400 border-t-transparent' />
                  </div>
                )}

                <Image
                  src={urlForImage(currentPhoto as any)?.url() || ''}
                  alt={currentPhoto.alt || 'Gallery photo'}
                  width={1200}
                  height={800}
                  className='max-h-[90vh] max-w-[90vw] object-contain'
                  onLoad={handleImageLoad}
                  priority
                />
              </motion.div>
            </div>

            {/* Photo Counter */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-steeldark-800/80 px-4 py-2 text-sm text-steelpolished-400'>
              {currentIndex + 1} of {photos.length}
            </div>

            {/* Info Toggle Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className='absolute bottom-4 right-4 rounded-full bg-steeldark-800/80 p-2 text-steelpolished-400 transition-all duration-200 hover:bg-steeldark-700 hover:text-steelpolished-300'
              aria-label='Toggle photo details'
            >
              <Info size={20} />
            </button>
          </div>

          {/* Photo Details Panel */}
          <PhotoDetailsPanel
            photo={currentPhoto}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
            galleryTitle={galleryTitle}
            galleryDate={galleryDate}
            photographer={photographer}
            onOrderPrint={handlePrintOrder}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
