'use client';

import { useMemo } from 'react';
import GalleryPhoto from './GalleryPhoto';
import PhotoLightbox, { PhotoData } from '@/components/lightbox/PhotoLightbox';
import useLightbox from '@/hooks/useLightbox';
import { PopulatedGallery, GalleryDisplayConfig } from '@/types/gallery';
import {
  transformPhotosForLightbox,
  getDefaultDisplayConfig,
  getGalleryTypeClasses,
  sortPhotosByGalleryType,
  getGalleryTypeMetadata,
} from '@/lib/gallery/galleryUtils';

interface GalleryGridProps {
  gallery: PopulatedGallery;
  displayConfig?: Partial<GalleryDisplayConfig>;
  className?: string;
}

export default function GalleryGrid({ gallery, displayConfig, className = '' }: GalleryGridProps) {
  const lightbox = useLightbox();

  // Get display configuration
  const config = useMemo(() => {
    const defaultConfig = getDefaultDisplayConfig(gallery.galleryType);
    const layoutSettings = gallery.layoutSettings;

    return {
      ...defaultConfig,
      ...displayConfig,
      // Override with Sanity layout settings if available
      ...(layoutSettings && {
        layout: layoutSettings.displayStyle,
        showMetadata: layoutSettings.showMetadata,
      }),
    };
  }, [gallery.galleryType, gallery.layoutSettings, displayConfig]);

  // Get gallery type metadata
  const typeMetadata = useMemo(() => getGalleryTypeMetadata(gallery), [gallery]);

  // Transform and sort gallery photos with enhanced metadata
  const photoData: PhotoData[] = useMemo(() => {
    if (!gallery.galleryPhotos?.length) return [];

    return gallery.galleryPhotos.map((photo) => ({
      asset: photo.asset,
      alt: photo.alt || 'Gallery photo',
      title: photo.title,
      location: photo.location,
      dateTaken: photo.dateTaken,
      description: photo.description,
      tags: photo.tags,
      photographer: photo.photographerInfo?.photographer?.name || gallery.author?.name,
      gallery: {
        title: gallery.title,
        slug: gallery.slug.current,
        type: gallery.galleryType,
      },
      cameraSettings: {
        camera: photo.cameraSettings?.camera,
        lens: photo.cameraSettings?.lens,
        focalLength: photo.cameraSettings?.focalLength,
        aperture: photo.cameraSettings?.aperture,
        shutterSpeed: photo.cameraSettings?.shutterSpeed,
        iso: photo.cameraSettings?.iso,
        flashUsed: photo.cameraSettings?.flashUsed,
        flashDetails: photo.cameraSettings?.flashDetails,
        shootingMode: photo.cameraSettings?.shootingMode,
        meteringMode: photo.cameraSettings?.meteringMode,
        whiteBalance: photo.cameraSettings?.whiteBalance,
        fileFormat: photo.cameraSettings?.fileFormat,
      },
      printOptions: {
        available: photo.printOptions?.available ?? true,
        featured: photo.printOptions?.featured,
        limitedEdition: photo.printOptions?.limitedEdition,
        editionSize: photo.printOptions?.editionSize,
        printsSold: photo.printOptions?.printsSold,
        basePrice: photo.printOptions?.basePrice || 25,
        sizes: photo.printOptions?.sizes || ['8x10', '11x14', '16x20', '20x24'],
        pricingTiers: photo.printOptions?.pricingTiers,
        printDescription: photo.printOptions?.printDescription,
        printId: photo.printOptions?.printId,
        printfulId: photo.printOptions?.printfulId,
        printifyId: photo.printOptions?.printifyId,
        shippingNotes: photo.printOptions?.shippingNotes,
      },
    }));
  }, [gallery]);

  const handlePhotoClick = (index: number) => {
    lightbox.openLightbox(photoData, index);
  };

  if (!gallery.galleryPhotos?.length) {
    return (
      <div className='flex h-64 items-center justify-center text-steelpolished-500'>
        <div className='text-center'>
          <div className='mb-2 text-2xl'>{typeMetadata.icon}</div>
          <p>No photos available in this {typeMetadata.type.toLowerCase()}.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Photos Grid */}
      <div className='grid h-full w-full auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 xxl:grid-cols-4'>
        {gallery.galleryPhotos.map((photo, index) => {
          const refString = photo.asset?._ref;
          if (!refString) return null;

          const refParts = refString.split('-');
          if (refParts.length < 3) return null;

          const resolutionParts = refParts[2].split('x');
          if (resolutionParts.length < 2) return null;

          const width = parseInt(resolutionParts[0]);
          const height = parseInt(resolutionParts[1]);

          const aspectRatio = height / width;
          const galleryHeight = Math.ceil(170 * aspectRatio);
          const photoSpans = Math.round(galleryHeight / 10) + 1;

          return (
            <div
              key={photo.asset?._ref || `photo-${index}`}
              className='flex justify-center'
              style={{ gridRowEnd: `span ${photoSpans}` }}
            >
              <GalleryPhoto
                photo={photoData[index]}
                index={index}
                width={535}
                height={galleryHeight}
                onClick={handlePhotoClick}
                className='w-full'
                priority={index < 6} // Prioritize first 6 images
                showMetadata={true}
                galleryType={gallery.galleryType}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={lightbox.photos}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        onNavigate={lightbox.navigateToPhoto}
        galleryTitle={gallery.title}
        galleryDate={gallery.tripDate}
        photographer={gallery.author?.name}
      />
    </>
  );
}
