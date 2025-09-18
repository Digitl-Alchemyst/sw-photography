export interface PhotoData {
  asset: {
    _ref: string;
  };
  alt?: string;
  title?: string;
  location?:
    | string
    | {
        venue?: string;
        city?: string;
        state?: string;
        country?: string;
      };
  dateTaken?: string;
  description?: string;
  tags?: string[];
  photographer?: string;
  gallery?: {
    title: string;
    slug: string;
    type: 'photoshoot' | 'event' | 'showcase';
  };
  cameraSettings?: {
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
  };
  printOptions?: {
    available: boolean;
    featured?: boolean;
    limitedEdition?: boolean;
    editionSize?: number;
    printsSold?: number;
    basePrice?: number;
    sizes?: string[];
    pricingTiers?: Array<{
      size: string;
      material: string;
      price: number;
      available: boolean;
    }>;
    printDescription?: string;
    printId?: string;
    printfulId?: string;
    printifyId?: string;
    shippingNotes?: string;
  };
}
