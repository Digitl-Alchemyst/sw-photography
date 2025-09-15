'use client';

import { 
  PrintProduct, 
  CartItem, 
  OrderDetails, 
  PrintShopConfig,
  PRINT_SIZES,
  PRINT_MATERIALS 
} from '@/types/printShop';

class PrintShopService {
  private config: PrintShopConfig;
  private cart: CartItem[] = [];

  constructor(config: PrintShopConfig) {
    this.config = config;
    this.loadCartFromStorage();
  }

  // Cart Management
  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('printShopCart');
      if (savedCart) {
        try {
          this.cart = JSON.parse(savedCart);
        } catch (error) {
          console.error('Error loading cart from storage:', error);
          this.cart = [];
        }
      }
    }
  }

  private saveCartToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('printShopCart', JSON.stringify(this.cart));
    }
  }

  addToCart(product: PrintProduct): CartItem {
    const cartItem: CartItem = {
      ...product,
      id: `${product.photoId}-${product.size.id}-${product.material.id}-${Date.now()}`,
      addedAt: new Date(),
    };

    this.cart.push(cartItem);
    this.saveCartToStorage();
    return cartItem;
  }

  removeFromCart(itemId: string): boolean {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => item.id !== itemId);
    
    if (this.cart.length !== initialLength) {
      this.saveCartToStorage();
      return true;
    }
    return false;
  }

  updateCartItemQuantity(itemId: string, quantity: number): boolean {
    const item = this.cart.find(item => item.id === itemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      item.totalPrice = this.calculateItemPrice(item.size, item.material, quantity);
      this.saveCartToStorage();
      return true;
    }
    return false;
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  getCartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.totalPrice, 0);
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToStorage();
  }

  // Price Calculation
  calculateItemPrice(size: any, material: any, quantity: number): number {
    const sizeData = PRINT_SIZES.find(s => s.id === size.id) || PRINT_SIZES[0];
    const materialData = PRINT_MATERIALS.find(m => m.id === material.id) || PRINT_MATERIALS[0];
    
    const basePrice = sizeData.price;
    const materialPrice = basePrice * materialData.priceMultiplier;
    return Math.round(materialPrice * quantity * 100) / 100; // Round to 2 decimal places
  }

  // Print Shop Integration
  async createPrintOrder(orderDetails: OrderDetails): Promise<{ success: boolean; orderId?: string; error?: string }> {
    try {
      // This is where you would integrate with actual print services
      // For now, we'll simulate the process
      
      switch (this.config.provider) {
        case 'printful':
          return await this.createPrintfulOrder(orderDetails);
        case 'printify':
          return await this.createPrintifyOrder(orderDetails);
        case 'custom':
          return await this.createCustomOrder(orderDetails);
        default:
          throw new Error('Unknown print provider');
      }
    } catch (error) {
      console.error('Error creating print order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async createPrintfulOrder(orderDetails: OrderDetails): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Simulate Printful API integration
    // In a real implementation, you would make API calls to Printful
    console.log('Creating Printful order:', orderDetails);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      orderId: `PF-${Date.now()}`,
    };
  }

  private async createPrintifyOrder(orderDetails: OrderDetails): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Simulate Printify API integration
    console.log('Creating Printify order:', orderDetails);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      orderId: `PY-${Date.now()}`,
    };
  }

  private async createCustomOrder(orderDetails: OrderDetails): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Simulate custom print service integration
    console.log('Creating custom order:', orderDetails);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      orderId: `CS-${Date.now()}`,
    };
  }

  // Utility Methods
  getPrintSizes() {
    return PRINT_SIZES;
  }

  getPrintMaterials() {
    return PRINT_MATERIALS;
  }

  generateProductUrl(photoId: string, photoUrl: string): string {
    // Generate a URL for the print product page
    return `/print/${photoId}`;
  }
}

// Singleton instance
let printShopInstance: PrintShopService | null = null;

export function getPrintShopService(): PrintShopService {
  if (!printShopInstance) {
    // Default configuration - this could be loaded from environment variables
    const config: PrintShopConfig = {
      provider: 'custom', // Default to custom for now
      baseUrl: process.env.NEXT_PUBLIC_PRINT_SHOP_URL || '',
      apiKey: process.env.NEXT_PUBLIC_PRINT_SHOP_API_KEY || '',
    };
    
    printShopInstance = new PrintShopService(config);
  }
  
  return printShopInstance;
}

export default PrintShopService;
