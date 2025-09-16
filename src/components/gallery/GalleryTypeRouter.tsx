'use client';

import { PopulatedGallery, Gallery, TypedGallery } from '@/types/gallery';
import PhotoshootGallery from './PhotoshootGallery';
import EventGallery from './EventGallery';
import ShowcaseGallery from './ShowcaseGallery';
import GalleryGrid from './GalleryGrid';

interface GalleryTypeRouterProps {
  gallery: PopulatedGallery | Gallery;
  className?: string;
}

/**
 * Router component that renders the appropriate gallery type component
 * based on the gallery's type field
 */
export default function GalleryTypeRouter({ gallery, className = '' }: GalleryTypeRouterProps) {
  // Type-safe routing based on gallery type
  if (gallery.galleryType === 'photoshoot') {
    return <PhotoshootGallery gallery={gallery as any} className={className} />;
  }

  if (gallery.galleryType === 'event') {
    return <EventGallery gallery={gallery as any} className={className} />;
  }

  if (gallery.galleryType === 'showcase') {
    return <ShowcaseGallery gallery={gallery as any} className={className} />;
  }

  // Fallback to generic gallery grid for unknown types or legacy galleries
  if (gallery.galleryType) {
    console.warn(`Unknown gallery type: ${gallery.galleryType}. Falling back to generic gallery.`);
  }
  return <GalleryGrid gallery={gallery} className={className} />;
}
