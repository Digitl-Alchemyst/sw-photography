// Base Product Types
export type ProductType = 'print' | 'digital_preset' | 'digital_lut' | 'digital_bundle';

export interface BaseProduct {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  category?: string;
}

// Print Product Types
export interface PrintSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  description?: string;
}

export interface PrintMaterial {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
}

export interface PrintVariant {
  id: string;
  size: PrintSize;
  material: PrintMaterial;
  price: number;
  isAvailable: boolean;
}

export interface PrintProduct extends BaseProduct {
  type: 'print';
  photoId: string;
  photoTitle: string;
  photoUrl: string;
  photoAlt?: string;
  variants: PrintVariant[];
  galleryInfo?: {
    galleryId: string;
    galleryTitle: string;
    gallerySlug: string;
  };
}

// Digital Product Types
export interface DigitalFile {
  id: string;
  name: string;
  url: string;
  size: number; // in bytes
  format: string;
  downloadCount?: number;
}

export interface PresetProduct extends BaseProduct {
  type: 'digital_preset';
  presetType: 'lightroom' | 'photoshop' | 'capture_one' | 'luminar';
  compatibleVersions: string[];
  files: DigitalFile[];
  previewImages: string[];
  sampleImages?: string[];
}

export interface LUTProduct extends BaseProduct {
  type: 'digital_lut';
  lutType: 'video' | 'photo' | 'universal';
  format: 'cube' | '3dl' | 'look' | 'multiple';
  files: DigitalFile[];
  previewImages: string[];
  compatibleSoftware: string[];
}

export interface BundleProduct extends BaseProduct {
  type: 'digital_bundle';
  bundleType: 'preset_pack' | 'lut_pack' | 'mixed';
  includedProducts: string[]; // Product IDs
  bundleDiscount: number; // Percentage discount
  files: DigitalFile[];
  previewImages: string[];
}

// Union type for all products
export type Product = PrintProduct | PresetProduct | LUTProduct | BundleProduct;

// Cart and Order Types
export interface CartItemVariant {
  variantId?: string; // For print products
  size?: PrintSize;
  material?: PrintMaterial;
}

export interface CartItem {
  id: string;
  productId: string;
  productType: ProductType;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: CartItemVariant;
  addedAt: Date;
}

export interface PrintShopConfig {
  provider: 'printful' | 'printify' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  webhookUrl?: string;
  digitalDelivery?: {
    enabled: boolean;
    downloadLinkExpiry: number; // hours
    maxDownloads: number;
  };
}

// Customer and Order Types
export interface Customer {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  totalOrders: number;
  totalSpent: number;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface OrderItem extends CartItem {
  orderId: string;
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'digital_delivered';
  trackingNumber?: string;
  downloadLinks?: DigitalDownloadLink[];
}

export interface DigitalDownloadLink {
  id: string;
  orderId: string;
  customerId: string; // Clerk user ID or guest email
  productId: string;
  productName: string;
  productType: ProductType;
  token: string;
  downloadUrl: string;
  expiresAt: Date;
  maxDownloads: number;
  downloadCount: number;
  isActive: boolean;
  createdAt: Date;
  files: DigitalFile[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  paymentIntentId?: string;
  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  digitalDelivery?: {
    delivered: boolean;
    deliveredAt?: Date;
    downloadLinks: DigitalDownloadLink[];
  };
}

export interface OrderDetails extends Order {
  customerInfo: {
    name: string;
    email: string;
    address?: ShippingAddress;
  };
}

// Product Configuration Constants
export const PRINT_SIZES: PrintSize[] = [
  {
    id: '5x7',
    name: '5" x 7"',
    dimensions: '5x7',
    price: 15,
    description: 'Perfect for desk display or small frames',
  },
  {
    id: '8x10',
    name: '8" x 10"',
    dimensions: '8x10',
    price: 25,
    description: 'Classic size for home display',
  },
  {
    id: '11x14',
    name: '11" x 14"',
    dimensions: '11x14',
    price: 35,
    description: 'Great for wall mounting',
  },
  {
    id: '16x20',
    name: '16" x 20"',
    dimensions: '16x20',
    price: 55,
    description: 'Statement piece for any room',
  },
  {
    id: '20x24',
    name: '20" x 24"',
    dimensions: '20x24',
    price: 75,
    description: 'Large format for dramatic impact',
  },
  {
    id: '24x36',
    name: '24" x 36"',
    dimensions: '24x36',
    price: 95,
    description: 'Gallery-quality large print',
  },
  {
    id: '30x40',
    name: '30" x 40"',
    dimensions: '30x40',
    price: 125,
    description: 'Museum-quality oversized print',
  },
];

export const PRINT_MATERIALS: PrintMaterial[] = [
  {
    id: 'standard',
    name: 'Standard Paper',
    description: 'High-quality photo paper with glossy finish',
    priceMultiplier: 1.0,
  },
  {
    id: 'premium',
    name: 'Premium Paper',
    description: 'Professional-grade paper with enhanced color reproduction',
    priceMultiplier: 1.3,
  },
  {
    id: 'canvas',
    name: 'Canvas',
    description: 'Gallery-wrapped canvas for a fine art look',
    priceMultiplier: 1.8,
  },
  {
    id: 'metal',
    name: 'Metal Print',
    description: 'Vibrant colors on aluminum for modern appeal',
    priceMultiplier: 2.2,
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    description: 'Crystal-clear acrylic for stunning depth and clarity',
    priceMultiplier: 2.5,
  },
];

// Digital Product Categories
export const PRESET_CATEGORIES = [
  'Portrait',
  'Landscape',
  'Wedding',
  'Street Photography',
  'Film Emulation',
  'Black & White',
  'Vintage',
  'Moody',
  'Bright & Airy',
  'Cinematic',
] as const;

export const LUT_CATEGORIES = [
  'Cinematic',
  'Film Emulation',
  'Color Grading',
  'Vintage',
  'Modern',
  'Black & White',
  'Teal & Orange',
  'Warm Tones',
  'Cool Tones',
  'High Contrast',
] as const;

// Product Type Configurations
export const PRODUCT_TYPE_CONFIG = {
  print: {
    name: 'Print',
    description: 'High-quality physical prints of photographs',
    icon: '🖼️',
    requiresShipping: true,
    isDigital: false,
  },
  digital_preset: {
    name: 'Lightroom Preset',
    description: 'Professional photo editing presets',
    icon: '🎨',
    requiresShipping: false,
    isDigital: true,
  },
  digital_lut: {
    name: 'Video LUT',
    description: 'Color grading lookup tables for video',
    icon: '🎬',
    requiresShipping: false,
    isDigital: true,
  },
  digital_bundle: {
    name: 'Digital Bundle',
    description: 'Curated collections of digital products',
    icon: '📦',
    requiresShipping: false,
    isDigital: true,
  },
} as const;
