'use client';

import { useState, useCallback } from 'react';
import { PhotoData } from '@/components/lightbox/PhotoLightbox';

export interface UseLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  photos: PhotoData[];
  openLightbox: (photos: PhotoData[], index: number) => void;
  closeLightbox: () => void;
  navigateToPhoto: (index: number) => void;
  nextPhoto: () => void;
  previousPhoto: () => void;
}

export default function useLightbox(): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState<PhotoData[]>([]);

  const openLightbox = useCallback((photoArray: PhotoData[], index: number) => {
    setPhotos(photoArray);
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    // Small delay to allow animation to complete before clearing data
    setTimeout(() => {
      setPhotos([]);
      setCurrentIndex(0);
    }, 300);
  }, []);

  const navigateToPhoto = useCallback((index: number) => {
    if (index >= 0 && index < photos.length) {
      setCurrentIndex(index);
    }
  }, [photos.length]);

  const nextPhoto = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, photos.length]);

  const previousPhoto = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  return {
    isOpen,
    currentIndex,
    photos,
    openLightbox,
    closeLightbox,
    navigateToPhoto,
    nextPhoto,
    previousPhoto,
  };
}
