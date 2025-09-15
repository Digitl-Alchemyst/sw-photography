import {
  Gallery,
  PopulatedGallery,
  GalleryDisplayConfig,
  LightboxPhoto,
  PhotoshootGallery,
  EventGallery,
  ShowcaseGallery,
  TypedGallery,
} from '@/types/gallery';
import urlForImage from '@/lib/util/urlForImage';

/**
 * Type guards for gallery types
 */
export function isPhotoshootGallery(gallery: Gallery): gallery is PhotoshootGallery {
  return gallery.galleryType === 'photoshoot';
}

export function isEventGallery(gallery: Gallery): gallery is EventGallery {
  return gallery.galleryType === 'event';
}

export function isShowcaseGallery(gallery: Gallery): gallery is ShowcaseGallery {
  return gallery.galleryType === 'showcase';
}

/**
 * Get default display configuration based on gallery type
 */
export function getDefaultDisplayConfig(
  galleryType: Gallery['galleryType'],
): GalleryDisplayConfig {
  const baseConfig: GalleryDisplayConfig = {
    type: galleryType,
    layout: 'masonry',
    showMetadata: true,
    enableLightbox: true,
    enablePrintShop: true,
  };

  switch (galleryType) {
    case 'photoshoot':
      return {
        ...baseConfig,
        layout: 'grid',
        aspectRatio: 'portrait',
      };
    case 'event':
      return {
        ...baseConfig,
        layout: 'timeline',
        aspectRatio: 'auto',
      };
    case 'showcase':
      return {
        ...baseConfig,
        layout: 'featured',
        aspectRatio: 'auto',
      };
    default:
      return baseConfig;
  }
}

/**
 * Get gallery-specific CSS classes
 */
export function getGalleryTypeClasses(galleryType: Gallery['galleryType']): string {
  const baseClasses = 'gallery-container';

  switch (galleryType) {
    case 'photoshoot':
      return `${baseClasses} gallery-photoshoot portrait-optimized`;
    case 'event':
      return `${baseClasses} gallery-event timeline-layout`;
    case 'showcase':
      return `${baseClasses} gallery-showcase featured-layout`;
    default:
      return baseClasses;
  }
}

/**
 * Transform gallery photos to lightbox format
 */
export function transformPhotosForLightbox(gallery: PopulatedGallery): LightboxPhoto[] {
  return gallery.galleryPhotos.map((photo, index) => ({
    id: photo._key || `photo-${index}`,
    src: urlForImage(photo.asset)?.width(1920).height(1080).url() || '',
    alt: photo.alt,
    title: photo.title,
    description: photo.description,
    location: photo.location
      ? {
          venue: photo.location.venue,
          city: photo.location.city,
          state: photo.location.state,
          country: photo.location.country,
        }
      : undefined,
    dateTaken: photo.dateTaken,
    tags: photo.tags,
    cameraSettings: photo.cameraSettings,
    printOptions: photo.printOptions,
    photographer: gallery.author
      ? {
          name: gallery.author.name,
          slug: gallery.author.slug.current,
        }
      : undefined,
    gallery: {
      title: gallery.title,
      slug: gallery.slug.current,
      type: gallery.galleryType,
    },
  }));
}

/**
 * Get gallery title with type prefix
 */
export function getGalleryDisplayTitle(gallery: Gallery): string {
  const typeLabels = {
    photoshoot: 'Photoshoot',
    event: 'Event',
    showcase: 'Showcase',
  };

  const typeLabel = typeLabels[gallery.galleryType];
  return `${typeLabel}: ${gallery.title}`;
}

/**
 * Get gallery description based on type and content
 */
export function getGalleryDescription(gallery: PopulatedGallery): string {
  if (gallery.seoSettings?.metaDescription) {
    return gallery.seoSettings.metaDescription;
  }

  if (gallery.snippet) {
    return gallery.snippet;
  }

  // Generate description based on gallery type
  const photoCount = gallery.galleryPhotos.length;
  const photographer = gallery.author?.name || 'Unknown photographer';

  switch (gallery.galleryType) {
    case 'photoshoot':
      const shootType = gallery.photoshootDetails?.shootType || 'photoshoot';
      return `${shootType} session by ${photographer} featuring ${photoCount} professional photographs.`;

    case 'event':
      const eventType = gallery.eventDetails?.eventType || 'event';
      const venue = gallery.eventDetails?.venue;
      return `${eventType} photography${venue ? ` at ${venue}` : ''} by ${photographer}. ${photoCount} photos capturing the special moments.`;

    case 'showcase':
      return `Fine art photography showcase by ${photographer}. A collection of ${photoCount} artistic photographs.`;

    default:
      return `Photography gallery by ${photographer} featuring ${photoCount} photographs.`;
  }
}

/**
 * Get structured data for SEO
 */
export function getGalleryStructuredData(gallery: PopulatedGallery) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const galleryUrl = `${baseUrl}/gallery/${gallery.slug.current}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: gallery.title,
    description: getGalleryDescription(gallery),
    url: galleryUrl,
    author: {
      '@type': 'Person',
      name: gallery.author?.name,
    },
    datePublished: gallery.publishedAt,
    dateModified: gallery._updatedAt,
    numberOfItems: gallery.galleryPhotos.length,
    image: gallery.galleryPhotos.map((photo) => ({
      '@type': 'ImageObject',
      url: urlForImage(photo.asset)?.width(1200).height(800).url() || '',
      name: photo.title,
      description: photo.description,
      dateCreated: photo.dateTaken,
      creator: {
        '@type': 'Person',
        name: gallery.author?.name,
      },
    })),
  };
}

/**
 * Filter photos by availability for print
 */
export function getAvailablePrintPhotos(gallery: PopulatedGallery): LightboxPhoto[] {
  const allPhotos = transformPhotosForLightbox(gallery);
  return allPhotos.filter((photo) => photo.printOptions?.available);
}

/**
 * Get gallery statistics
 */
export function getGalleryStats(gallery: PopulatedGallery) {
  const totalPhotos = gallery.galleryPhotos.length;
  const printablePhotos = gallery.galleryPhotos.filter(
    (photo) => photo.printOptions?.available,
  ).length;
  const featuredPhotos = gallery.galleryPhotos.filter(
    (photo) => photo.printOptions?.featured,
  ).length;
  const limitedEditionPhotos = gallery.galleryPhotos.filter(
    (photo) => photo.printOptions?.limitedEdition,
  ).length;

  return {
    totalPhotos,
    printablePhotos,
    featuredPhotos,
    limitedEditionPhotos,
    printablePercentage: totalPhotos > 0 ? Math.round((printablePhotos / totalPhotos) * 100) : 0,
  };
}

/**
 * Sort photos based on gallery type preferences
 */
export function sortPhotosByGalleryType(
  photos: LightboxPhoto[],
  galleryType: Gallery['galleryType'],
): LightboxPhoto[] {
  switch (galleryType) {
    case 'event':
      // Sort by date taken for chronological order
      return [...photos].sort((a, b) => {
        if (!a.dateTaken || !b.dateTaken) return 0;
        return new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime();
      });

    case 'showcase':
      // Sort featured prints first, then by date
      return [...photos].sort((a, b) => {
        const aFeatured = a.printOptions?.featured ? 1 : 0;
        const bFeatured = b.printOptions?.featured ? 1 : 0;

        if (aFeatured !== bFeatured) {
          return bFeatured - aFeatured; // Featured first
        }

        if (!a.dateTaken || !b.dateTaken) return 0;
        return new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime();
      });

    case 'photoshoot':
    default:
      // Keep original order or sort by date taken (newest first)
      return [...photos].sort((a, b) => {
        if (!a.dateTaken || !b.dateTaken) return 0;
        return new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime();
      });
  }
}

/**
 * Get gallery type-specific metadata for display
 */
export function getGalleryTypeMetadata(gallery: PopulatedGallery) {
  switch (gallery.galleryType) {
    case 'photoshoot':
      return {
        type: 'Photoshoot',
        icon: '📸',
        details: gallery.photoshootDetails
          ? [
              gallery.photoshootDetails.shootType &&
                `Type: ${gallery.photoshootDetails.shootType}`,
              gallery.photoshootDetails.clientName &&
                `Client: ${gallery.photoshootDetails.clientName}`,
              gallery.photoshootDetails.locationDetails?.venue &&
                `Location: ${gallery.photoshootDetails.locationDetails.venue}`,
            ].filter(Boolean)
          : [],
      };

    case 'event':
      return {
        type: 'Event',
        icon: '🎉',
        details: gallery.eventDetails
          ? [
              gallery.eventDetails.eventType && `Type: ${gallery.eventDetails.eventType}`,
              gallery.eventDetails.venue && `Venue: ${gallery.eventDetails.venue}`,
              gallery.eventDetails.eventDate &&
                `Date: ${new Date(gallery.eventDetails.eventDate).toLocaleDateString()}`,
              gallery.eventDetails.attendeeCount &&
                `Attendees: ${gallery.eventDetails.attendeeCount}`,
            ].filter(Boolean)
          : [],
      };

    case 'showcase':
      return {
        type: 'Showcase',
        icon: '🎨',
        details: gallery.showcaseDetails
          ? [
              gallery.showcaseDetails.techniqueDetails?.technique &&
                `Technique: ${gallery.showcaseDetails.techniqueDetails.technique}`,
              gallery.showcaseDetails.exhibitionInfo?.exhibitionName &&
                `Exhibition: ${gallery.showcaseDetails.exhibitionInfo.exhibitionName}`,
              gallery.showcaseDetails.awards?.length &&
                `Awards: ${gallery.showcaseDetails.awards.length}`,
            ].filter(Boolean)
          : [],
      };

    default:
      return {
        type: 'Gallery',
        icon: '📷',
        details: [],
      };
  }
}

/**
 * Validate gallery data completeness
 */
export function validateGalleryData(gallery: Gallery): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!gallery.title) errors.push('Gallery title is required');
  if (!gallery.slug?.current) errors.push('Gallery slug is required');
  if (!gallery.author) errors.push('Gallery author is required');
  if (!gallery.galleryPhotos || gallery.galleryPhotos.length === 0) {
    errors.push('Gallery must have at least one photo');
  }

  // Type-specific validation
  switch (gallery.galleryType) {
    case 'photoshoot':
      if (!gallery.photoshootDetails?.shootType) {
        errors.push('Photoshoot type is required for photoshoot galleries');
      }
      break;
    case 'event':
      if (!gallery.eventDetails?.eventType) {
        errors.push('Event type is required for event galleries');
      }
      break;
    case 'showcase':
      if (!gallery.showcaseDetails?.artisticStatement) {
        errors.push('Artistic statement is recommended for showcase galleries');
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
