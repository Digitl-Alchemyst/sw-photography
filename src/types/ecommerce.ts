// E-commerce System Types for Photography Portfolio
// Comprehensive type definitions for digital products, enhanced print products, and order management

import { PrintSize, PrintMaterial, ProductType } from './printShop';

// Product Management Types
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  productCount: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug: string;
}

// Enhanced Product Base
export interface EnhancedProduct {
  id: string;
  type: ProductType;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number; // For showing discounts
  isActive: boolean;
  isFeatured: boolean;
  stockQuantity?: number; // For limited digital products
  images: ProductImage[];
  categories: string[]; // Category IDs
  tags: string[]; // Tag IDs
  seo: ProductSEO;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  vendor?: string;
  weight?: number; // For shipping calculations
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

// Digital Product Specific Types
export interface DigitalProductMetadata {
  fileSize: number; // in bytes
  downloadLimit: number;
  downloadExpiry: number; // hours
  compatibleSoftware: string[];
  requiredVersion?: string;
  instructions?: string;
  licenseType: 'personal' | 'commercial' | 'extended';
}

export interface PresetMetadata extends DigitalProductMetadata {
  presetCount: number;
  presetType: 'lightroom' | 'photoshop' | 'capture_one' | 'luminar';
  styleCategory: string;
  beforeAfterImages?: string[];
}

export interface LUTMetadata extends DigitalProductMetadata {
  lutFormat: 'cube' | '3dl' | 'look' | 'multiple';
  lutType: 'video' | 'photo' | 'universal';
  colorSpace: string;
  bitDepth: string;
}

// Shopping and Cart Types
export interface CartConfiguration {
  maxQuantityPerItem: number;
  allowBackorders: boolean;
  requiresShipping: boolean;
  taxable: boolean;
  discountEligible: boolean;
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isDefault: boolean;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number; // percentage
  region: string;
  isDefault: boolean;
}

// Discount and Promotion Types
export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  maximumUses?: number;
  usedCount: number;
  isActive: boolean;
  startsAt: Date;
  endsAt?: Date;
  applicableProducts?: string[]; // Product IDs
  applicableCategories?: string[]; // Category IDs
}

// Customer Account Types
export interface CustomerAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  isEmailVerified: boolean;
  acceptsMarketing: boolean;
  defaultShippingAddress?: string; // Address ID
  defaultBillingAddress?: string; // Address ID
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
  customerSince: Date;
  loyaltyPoints?: number;
  tags: string[];
  notes?: string;
  isActive: boolean;
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  type: 'shipping' | 'billing';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

// Digital Download Management
export interface DigitalDownload {
  id: string;
  orderId: string;
  orderItemId: string;
  customerId?: string;
  customerEmail: string;
  productId: string;
  productName: string;
  files: DigitalFile[];
  downloadCount: number;
  maxDownloads: number;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  lastDownloadAt?: Date;
}

export interface DigitalFile {
  id: string;
  name: string;
  originalName: string;
  url: string;
  secureUrl: string; // Signed URL for downloads
  size: number;
  mimeType: string;
  checksum: string;
}

// Analytics and Reporting Types
export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: Array<{
    productId: string;
    productName: string;
    revenue: number;
    quantity: number;
  }>;
  revenueByCategory: Array<{
    categoryId: string;
    categoryName: string;
    revenue: number;
  }>;
  revenueByProductType: Array<{
    type: ProductType;
    revenue: number;
    orderCount: number;
  }>;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  churnRate: number;
}

// Admin Interface Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'editor';
  permissions: string[];
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
}

export interface AdminDashboardData {
  salesMetrics: SalesMetrics;
  customerMetrics: CustomerMetrics;
  recentOrders: Order[];
  lowStockProducts: EnhancedProduct[];
  pendingReviews: number;
  systemHealth: {
    status: 'healthy' | 'warning' | 'error';
    uptime: number;
    lastBackup?: Date;
  };
}

// Re-export from printShop for convenience
export type { Order, OrderItem, CartItem, Customer } from './printShop';
