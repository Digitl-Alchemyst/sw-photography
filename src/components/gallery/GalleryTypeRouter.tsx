'use client';

import { PopulatedGallery, TypedGallery } from '@/types/gallery';
import {
  isPhotoshootGallery,
  isEventGallery,
  isShowcaseGallery,
} from '@/lib/gallery/galleryUtils';
import PhotoshootGallery from './PhotoshootGallery';
import EventGallery from './EventGallery';
import ShowcaseGallery from './ShowcaseGallery';
import GalleryGrid from './GalleryGrid';

interface GalleryTypeRouterProps {
  gallery: PopulatedGallery;
  className?: string;
}

/**
 * Router component that renders the appropriate gallery type component
 * based on the gallery's type field
 */
export default function GalleryTypeRouter({ gallery, className = '' }: GalleryTypeRouterProps) {
  // Type-safe routing based on gallery type
  if (isPhotoshootGallery(gallery)) {
    return <PhotoshootGallery gallery={gallery} className={className} />;
  }

  if (isEventGallery(gallery)) {
    return <EventGallery gallery={gallery} className={className} />;
  }

  if (isShowcaseGallery(gallery)) {
    return <ShowcaseGallery gallery={gallery} className={className} />;
  }

  // Fallback to generic gallery grid for unknown types or legacy galleries
  if (gallery.galleryType) {
    console.warn(`Unknown gallery type: ${gallery.galleryType}. Falling back to generic gallery.`);
  }
  return <GalleryGrid gallery={gallery} className={className} />;
}
