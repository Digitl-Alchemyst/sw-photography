// Enhanced Gallery Types for Sanity CMS Integration

export interface GalleryPhoto {
  _key?: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt: string;
  title: string;
  location: {
    venue?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  dateTaken: string;
  description?: string;
  tags?: string[];
  photographerInfo?: {
    photographer?: {
      _ref: string;
      _type: 'reference';
    };
    assistants?: string[];
    credits?: string;
  };
  cameraSettings?: CameraSettings;
  printOptions?: PrintOptions;
}

export interface CameraSettings {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  flashUsed?: boolean;
  flashDetails?: string;
  shootingMode?: 'manual' | 'aperture_priority' | 'shutter_priority' | 'program' | 'auto';
  meteringMode?: 'matrix' | 'center_weighted' | 'spot';
  whiteBalance?: 'auto' | 'daylight' | 'cloudy' | 'tungsten' | 'fluorescent' | 'custom';
  fileFormat?: 'raw' | 'jpeg' | 'raw_jpeg';
}

export interface PrintOptions {
  available: boolean;
  featured?: boolean;
  limitedEdition?: boolean;
  editionSize?: number;
  printsSold?: number;
  pricingTiers?: PricingTier[];
  printDescription?: string;
  printId?: string;
  printfulId?: string;
  printifyId?: string;
  shippingNotes?: string;
}

export interface PricingTier {
  size: '5x7' | '8x10' | '11x14' | '16x20' | '20x24' | '24x36' | '30x40';
  material: 'standard_paper' | 'premium_paper' | 'canvas' | 'metal' | 'acrylic' | 'fine_art_paper';
  price: number;
  available: boolean;
}

export interface PhotoshootDetails {
  clientName?: string;
  shootType?:
    | 'portrait'
    | 'fashion'
    | 'commercial'
    | 'headshots'
    | 'lifestyle'
    | 'beauty'
    | 'editorial';
  stylingNotes?: string;
  makeupArtist?: string;
  locationDetails?: {
    venue?: string;
    address?: string;
    locationNotes?: string;
  };
}

export interface EventDetails {
  eventName?: string;
  eventType?:
    | 'wedding'
    | 'corporate'
    | 'birthday'
    | 'anniversary'
    | 'conference'
    | 'concert'
    | 'festival'
    | 'graduation'
    | 'other';
  venue?: string;
  eventDate?: string;
  duration?: string;
  attendeeCount?: number;
  eventDescription?: string;
}

export interface ShowcaseDetails {
  artisticStatement?: string;
  exhibitionInfo?: {
    exhibitionName?: string;
    gallery?: string;
    exhibitionDate?: string;
    curator?: string;
  };
  awards?: Array<{
    awardName: string;
    organization: string;
    year: number;
  }>;
  techniqueDetails?: {
    technique?: 'digital' | 'film' | 'mixed' | 'hdr' | 'long_exposure' | 'macro' | 'aerial';
    postProcessing?: string;
    specialEquipment?: string;
  };
}

export interface LayoutSettings {
  displayStyle: 'grid' | 'masonry' | 'timeline' | 'featured';
  photosPerRow: 2 | 3 | 4 | 5;
  showMetadata: boolean;
  enableDownloads: boolean;
}

export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
  socialImage?: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Gallery {
  _id: string;
  _type: 'gallery';
  _createdAt: string;
  _updatedAt: string;
  slug: {
    current: string;
  };
  title: string;
  galleryType: 'photoshoot' | 'event' | 'showcase';
  keywords?: string;
  snippet?: string;
  author: {
    _ref: string;
    _type: 'reference';
  };
  mainImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  photoshootDetails?: PhotoshootDetails;
  eventDetails?: EventDetails;
  showcaseDetails?: ShowcaseDetails;
  galleryCategories?: Array<{
    _ref: string;
    _type: 'reference';
  }>;
  publishedAt?: string;
  tripDate?: string;
  galleryPhotos: GalleryPhoto[];
  layoutSettings?: LayoutSettings;
  seoSettings?: SEOSettings;
  body?: any; // Block content type
}

// Populated gallery with resolved references
export interface PopulatedGallery extends Omit<Gallery, 'author' | 'galleryCategories'> {
  author: {
    _id: string;
    name: string;
    slug: { current: string };
    image?: {
      asset: { _ref: string };
    };
    bio?: any[];
  };
  galleryCategories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
  }>;
}

// Gallery type-specific interfaces for frontend components
export interface PhotoshootGallery extends Gallery {
  galleryType: 'photoshoot';
  photoshootDetails: PhotoshootDetails;
}

export interface EventGallery extends Gallery {
  galleryType: 'event';
  eventDetails: EventDetails;
}

export interface ShowcaseGallery extends Gallery {
  galleryType: 'showcase';
  showcaseDetails: ShowcaseDetails;
}

// Union type for type-safe gallery handling
export type TypedGallery = PhotoshootGallery | EventGallery | ShowcaseGallery;

// Gallery display configuration
export interface GalleryDisplayConfig {
  type: 'photoshoot' | 'event' | 'showcase';
  layout: 'grid' | 'masonry' | 'timeline' | 'featured';
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  showMetadata: boolean;
  enableLightbox: boolean;
  enablePrintShop: boolean;
}

// Lightbox photo data structure
export interface LightboxPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  location?: {
    venue?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  dateTaken?: string;
  tags?: string[];
  cameraSettings?: CameraSettings;
  printOptions?: PrintOptions;
  photographer?: {
    name: string;
    slug: string;
  };
  gallery: {
    title: string;
    slug: string;
    type: 'photoshoot' | 'event' | 'showcase';
  };
}

// Gallery grid component props
export interface GalleryGridProps {
  gallery: PopulatedGallery | Gallery;
  photos?: LightboxPhoto[];
  displayConfig?: Partial<GalleryDisplayConfig>;
  className?: string;
}

// Gallery type selector for Sanity Studio
export const GALLERY_TYPES = [
  { title: 'Photoshoot Gallery', value: 'photoshoot' },
  { title: 'Event Gallery', value: 'event' },
  { title: 'Showcase Gallery', value: 'showcase' },
] as const;

// Print material options
export const PRINT_MATERIALS = [
  { title: 'Standard Paper', value: 'standard_paper' },
  { title: 'Premium Paper', value: 'premium_paper' },
  { title: 'Canvas', value: 'canvas' },
  { title: 'Metal', value: 'metal' },
  { title: 'Acrylic', value: 'acrylic' },
  { title: 'Fine Art Paper', value: 'fine_art_paper' },
] as const;

// Print size options
export const PRINT_SIZES = [
  { title: '5x7 inches', value: '5x7' },
  { title: '8x10 inches', value: '8x10' },
  { title: '11x14 inches', value: '11x14' },
  { title: '16x20 inches', value: '16x20' },
  { title: '20x24 inches', value: '20x24' },
  { title: '24x36 inches', value: '24x36' },
  { title: '30x40 inches', value: '30x40' },
] as const;
