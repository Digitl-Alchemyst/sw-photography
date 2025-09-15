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

export interface PrintProduct {
  photoId: string;
  photoTitle: string;
  photoUrl: string;
  size: PrintSize;
  material: PrintMaterial;
  quantity: number;
  totalPrice: number;
}

export interface CartItem extends PrintProduct {
  id: string;
  addedAt: Date;
}

export interface PrintShopConfig {
  provider: 'printful' | 'printify' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  webhookUrl?: string;
}

export interface OrderDetails {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
}

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
