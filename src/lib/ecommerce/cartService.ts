'use client';

import { 
  CartItem, 
  Product, 
  ProductType,
  PrintProduct,
  PresetProduct,
  LUTProduct,
  BundleProduct,
  CartItemVariant,
  PRODUCT_TYPE_CONFIG
} from '@/types/printShop';

export interface CartConfiguration {
  maxItems: number;
  maxQuantityPerItem: number;
  persistToStorage: boolean;
  storageKey: string;
}

export interface CartSummary {
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  total: number;
  hasPhysicalItems: boolean;
  hasDigitalItems: boolean;
}

class EnhancedCartService {
  private cart: CartItem[] = [];
  private config: CartConfiguration;
  private listeners: Array<(cart: CartItem[]) => void> = [];

  constructor(config: Partial<CartConfiguration> = {}) {
    this.config = {
      maxItems: 50,
      maxQuantityPerItem: 10,
      persistToStorage: true,
      storageKey: 'sw-photography-cart',
      ...config,
    };

    if (typeof window !== 'undefined' && this.config.persistToStorage) {
      this.loadFromStorage();
    }
  }

  // Cart Management
  addItem(product: Product, quantity: number = 1, variant?: CartItemVariant): CartItem {
    if (quantity <= 0 || quantity > this.config.maxQuantityPerItem) {
      throw new Error(`Quantity must be between 1 and ${this.config.maxQuantityPerItem}`);
    }

    if (this.cart.length >= this.config.maxItems) {
      throw new Error(`Cart cannot exceed ${this.config.maxItems} items`);
    }

    // Generate unique item ID based on product and variant
    const itemId = this.generateItemId(product.id, variant);
    
    // Check if item already exists
    const existingItem = this.cart.find(item => item.id === itemId);
    
    if (existingItem) {
      return this.updateQuantity(itemId, existingItem.quantity + quantity);
    }

    // Calculate price based on product type and variant
    const unitPrice = this.calculateUnitPrice(product, variant);
    
    const cartItem: CartItem = {
      id: itemId,
      productId: product.id,
      productType: product.type,
      productName: product.name,
      productImage: this.getProductImage(product),
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      variant,
      addedAt: new Date(),
    };

    this.cart.push(cartItem);
    this.saveToStorage();
    this.notifyListeners();
    
    return cartItem;
  }

  removeItem(itemId: string): boolean {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => item.id !== itemId);
    
    if (this.cart.length !== initialLength) {
      this.saveToStorage();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  updateQuantity(itemId: string, quantity: number): CartItem {
    if (quantity <= 0) {
      this.removeItem(itemId);
      throw new Error('Item removed from cart');
    }

    if (quantity > this.config.maxQuantityPerItem) {
      throw new Error(`Quantity cannot exceed ${this.config.maxQuantityPerItem}`);
    }

    const item = this.cart.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    item.quantity = quantity;
    item.totalPrice = item.unitPrice * quantity;
    
    this.saveToStorage();
    this.notifyListeners();
    
    return item;
  }

  clearCart(): void {
    this.cart = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  getItem(itemId: string): CartItem | undefined {
    return this.cart.find(item => item.id === itemId);
  }

  // Cart Analytics
  getCartSummary(): CartSummary {
    const itemCount = this.cart.length;
    const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const hasPhysicalItems = this.cart.some(item => 
      PRODUCT_TYPE_CONFIG[item.productType]?.requiresShipping
    );
    const hasDigitalItems = this.cart.some(item => 
      PRODUCT_TYPE_CONFIG[item.productType]?.isDigital
    );

    // Estimate tax (8.5% for physical items, 0% for digital)
    const taxableAmount = this.cart
      .filter(item => PRODUCT_TYPE_CONFIG[item.productType]?.requiresShipping)
      .reduce((sum, item) => sum + item.totalPrice, 0);
    const estimatedTax = taxableAmount * 0.085;

    // Estimate shipping (free for digital-only orders)
    const estimatedShipping = hasPhysicalItems ? this.calculateShipping() : 0;

    const total = subtotal + estimatedTax + estimatedShipping;

    return {
      itemCount,
      totalQuantity,
      subtotal,
      estimatedTax,
      estimatedShipping,
      total,
      hasPhysicalItems,
      hasDigitalItems,
    };
  }

  getItemsByType(productType: ProductType): CartItem[] {
    return this.cart.filter(item => item.productType === productType);
  }

  // Validation
  validateCart(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.cart.length === 0) {
      errors.push('Cart is empty');
    }

    if (this.cart.length > this.config.maxItems) {
      errors.push(`Cart exceeds maximum of ${this.config.maxItems} items`);
    }

    this.cart.forEach(item => {
      if (item.quantity <= 0) {
        errors.push(`Invalid quantity for ${item.productName}`);
      }
      if (item.quantity > this.config.maxQuantityPerItem) {
        errors.push(`Quantity for ${item.productName} exceeds maximum of ${this.config.maxQuantityPerItem}`);
      }
      if (item.unitPrice <= 0) {
        errors.push(`Invalid price for ${item.productName}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Event Listeners
  subscribe(listener: (cart: CartItem[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.cart]));
  }

  // Storage Management
  private saveToStorage(): void {
    if (typeof window !== 'undefined' && this.config.persistToStorage) {
      try {
        localStorage.setItem(this.config.storageKey, JSON.stringify(this.cart));
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    }
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(this.config.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate and restore cart items
          this.cart = parsed.filter((item: any) => this.isValidCartItem(item));
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
        this.cart = [];
      }
    }
  }

  private isValidCartItem(item: any): boolean {
    return (
      item &&
      typeof item.id === 'string' &&
      typeof item.productId === 'string' &&
      typeof item.productType === 'string' &&
      typeof item.productName === 'string' &&
      typeof item.quantity === 'number' &&
      typeof item.unitPrice === 'number' &&
      typeof item.totalPrice === 'number' &&
      item.quantity > 0 &&
      item.unitPrice >= 0 &&
      item.totalPrice >= 0
    );
  }

  // Helper Methods
  private generateItemId(productId: string, variant?: CartItemVariant): string {
    let id = productId;
    if (variant?.variantId) {
      id += `-${variant.variantId}`;
    } else if (variant?.size && variant?.material) {
      id += `-${variant.size.id}-${variant.material.id}`;
    }
    return id;
  }

  private calculateUnitPrice(product: Product, variant?: CartItemVariant): number {
    if (product.type === 'print' && variant?.size && variant?.material) {
      const basePrice = variant.size.price;
      const materialMultiplier = variant.material.priceMultiplier;
      return Math.round(basePrice * materialMultiplier * 100) / 100;
    }
    return product.price;
  }

  private getProductImage(product: Product): string {
    // This would be implemented based on your product image structure
    // For now, return a placeholder or the first image
    return '/placeholder-product.jpg';
  }

  private calculateShipping(): number {
    // Simple shipping calculation - could be enhanced with real shipping rates
    const summary = this.getCartSummary();
    if (summary.subtotal >= 100) {
      return 0; // Free shipping over $100
    }
    return 15; // Standard shipping rate
  }
}

// Singleton instance
let cartServiceInstance: EnhancedCartService | null = null;

export function getCartService(): EnhancedCartService {
  if (!cartServiceInstance) {
    cartServiceInstance = new EnhancedCartService();
  }
  return cartServiceInstance;
}

export default EnhancedCartService;
