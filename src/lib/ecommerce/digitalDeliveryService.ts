import { DigitalDownloadLink, DigitalFile, Order, Product } from '@/types/printShop';

export interface DigitalDeliveryConfig {
  maxDownloads: number;
  expirationDays: number;
  baseUrl: string;
}

export interface DeliveryResult {
  success: boolean;
  downloadLinks?: DigitalDownloadLink[];
  error?: string;
}

export class DigitalDeliveryService {
  private config: DigitalDeliveryConfig;

  constructor(config: DigitalDeliveryConfig) {
    this.config = config;
  }

  /**
   * Generate secure download links for digital products in an order
   */
  async generateDownloadLinks(order: Order): Promise<DeliveryResult> {
    try {
      const digitalItems = order.items.filter((item) => this.isDigitalProduct(item.productType));

      if (digitalItems.length === 0) {
        return {
          success: true,
          downloadLinks: [],
        };
      }

      const downloadLinks: DigitalDownloadLink[] = [];

      for (const item of digitalItems) {
        // Generate secure token for each digital item
        const token = this.generateSecureToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.config.expirationDays);

        const downloadLink: DigitalDownloadLink = {
          id: `dl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          orderId: order.id,
          customerId: order.customerId || order.customerEmail || 'guest',
          productId: item.productId,
          productName: item.productName,
          productType: item.productType,
          token,
          downloadUrl: `${this.config.baseUrl}/api/download/${token}`,
          expiresAt,
          maxDownloads: this.config.maxDownloads,
          downloadCount: 0,
          isActive: true,
          createdAt: new Date(),
          files: await this.getProductFiles(item.productId, item.productType),
        };

        downloadLinks.push(downloadLink);
      }

      // Store download links in database (mock implementation)
      await this.storeDownloadLinks(downloadLinks);

      return {
        success: true,
        downloadLinks,
      };
    } catch (error) {
      console.error('Error generating download links:', error);
      return {
        success: false,
        error: 'Failed to generate download links',
      };
    }
  }

  /**
   * Validate and process a download request
   */
  async processDownload(token: string): Promise<{
    success: boolean;
    downloadLink?: DigitalDownloadLink;
    fileUrl?: string;
    error?: string;
  }> {
    try {
      const downloadLink = await this.getDownloadLinkByToken(token);

      if (!downloadLink) {
        return {
          success: false,
          error: 'Invalid download link',
        };
      }

      // Check if link is still active
      if (!downloadLink.isActive) {
        return {
          success: false,
          error: 'Download link has been deactivated',
        };
      }

      // Check expiration
      if (new Date() > downloadLink.expiresAt) {
        return {
          success: false,
          error: 'Download link has expired',
        };
      }

      // Check download count
      if (downloadLink.downloadCount >= downloadLink.maxDownloads) {
        return {
          success: false,
          error: 'Maximum download limit reached',
        };
      }

      // Increment download count
      await this.incrementDownloadCount(downloadLink.id);

      // Generate temporary file URL (in production, this would be a signed URL)
      const fileUrl = await this.generateTemporaryFileUrl(downloadLink);

      return {
        success: true,
        downloadLink,
        fileUrl,
      };
    } catch (error) {
      console.error('Error processing download:', error);
      return {
        success: false,
        error: 'Failed to process download',
      };
    }
  }

  /**
   * Get download links for a customer's order
   */
  async getCustomerDownloadLinks(
    customerId: string,
    orderId?: string,
  ): Promise<DigitalDownloadLink[]> {
    try {
      // Mock implementation - in production, query database
      const allLinks = await this.getAllDownloadLinks();

      return allLinks.filter((link) => {
        // In production, you'd join with orders table to filter by customer
        return orderId ? link.orderId === orderId : true;
      });
    } catch (error) {
      console.error('Error fetching customer download links:', error);
      return [];
    }
  }

  /**
   * Resend download links via email
   */
  async resendDownloadLinks(orderId: string, email: string): Promise<boolean> {
    try {
      const downloadLinks = await this.getDownloadLinksByOrderId(orderId);

      if (downloadLinks.length === 0) {
        return false;
      }

      // Send email with download links (mock implementation)
      await this.sendDownloadEmail(email, downloadLinks);

      return true;
    } catch (error) {
      console.error('Error resending download links:', error);
      return false;
    }
  }

  /**
   * Deactivate download links (for refunds, etc.)
   */
  async deactivateDownloadLinks(orderId: string): Promise<boolean> {
    try {
      const downloadLinks = await this.getDownloadLinksByOrderId(orderId);

      for (const link of downloadLinks) {
        await this.updateDownloadLink(link.id, { isActive: false });
      }

      return true;
    } catch (error) {
      console.error('Error deactivating download links:', error);
      return false;
    }
  }

  /**
   * Clean up expired download links
   */
  async cleanupExpiredLinks(): Promise<number> {
    try {
      const allLinks = await this.getAllDownloadLinks();
      const expiredLinks = allLinks.filter(
        (link) => new Date() > link.expiresAt || link.downloadCount >= link.maxDownloads,
      );

      for (const link of expiredLinks) {
        await this.updateDownloadLink(link.id, { isActive: false });
      }

      return expiredLinks.length;
    } catch (error) {
      console.error('Error cleaning up expired links:', error);
      return 0;
    }
  }

  // Private helper methods

  private isDigitalProduct(productType: string): boolean {
    return ['digital_preset', 'digital_lut'].includes(productType);
  }

  private generateSecureToken(): string {
    // Generate a cryptographically secure token
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  private async getProductFiles(productId: string, productType: string): Promise<DigitalFile[]> {
    // Mock implementation - in production, fetch from database/storage
    const mockFiles = {
      digital_preset: [
        {
          id: 'preset_pack_1',
          name: 'Preset_Pack.zip',
          size: 2048000,
          format: 'zip',
          type: 'application/zip',
          url: '/files/presets/preset_pack.zip',
        },
        {
          id: 'preset_guide_1',
          name: 'Installation_Guide.pdf',
          size: 512000,
          format: 'pdf',
          type: 'application/pdf',
          url: '/files/guides/installation.pdf',
        },
      ],
      digital_lut: [
        {
          id: 'lut_pack_1',
          name: 'Cinematic_LUTs.zip',
          size: 5120000,
          format: 'zip',
          type: 'application/zip',
          url: '/files/luts/cinematic_luts.zip',
        },
        {
          id: 'lut_guide_1',
          name: 'Usage_Guide.pdf',
          size: 768000,
          format: 'pdf',
          type: 'application/pdf',
          url: '/files/guides/lut_usage.pdf',
        },
      ],
    };

    return mockFiles[productType as keyof typeof mockFiles] || [];
  }

  private async storeDownloadLinks(downloadLinks: DigitalDownloadLink[]): Promise<void> {
    // Mock implementation - in production, store in database
    const stored = localStorage.getItem('downloadLinks');
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [...existing, ...downloadLinks];
    localStorage.setItem('downloadLinks', JSON.stringify(updated));
  }

  private async getDownloadLinkByToken(token: string): Promise<DigitalDownloadLink | null> {
    // Mock implementation - in production, query database
    const stored = localStorage.getItem('downloadLinks');
    if (!stored) return null;

    const links: DigitalDownloadLink[] = JSON.parse(stored);
    return links.find((link) => link.token === token) || null;
  }

  private async getDownloadLinksByOrderId(orderId: string): Promise<DigitalDownloadLink[]> {
    // Mock implementation - in production, query database
    const stored = localStorage.getItem('downloadLinks');
    if (!stored) return [];

    const links: DigitalDownloadLink[] = JSON.parse(stored);
    return links.filter((link) => link.orderId === orderId);
  }

  private async getAllDownloadLinks(): Promise<DigitalDownloadLink[]> {
    // Mock implementation - in production, query database
    const stored = localStorage.getItem('downloadLinks');
    return stored ? JSON.parse(stored) : [];
  }

  private async incrementDownloadCount(linkId: string): Promise<void> {
    // Mock implementation - in production, update database
    const stored = localStorage.getItem('downloadLinks');
    if (!stored) return;

    const links: DigitalDownloadLink[] = JSON.parse(stored);
    const updated = links.map((link) =>
      link.id === linkId ? { ...link, downloadCount: link.downloadCount + 1 } : link,
    );
    localStorage.setItem('downloadLinks', JSON.stringify(updated));
  }

  private async updateDownloadLink(
    linkId: string,
    updates: Partial<DigitalDownloadLink>,
  ): Promise<void> {
    // Mock implementation - in production, update database
    const stored = localStorage.getItem('downloadLinks');
    if (!stored) return;

    const links: DigitalDownloadLink[] = JSON.parse(stored);
    const updated = links.map((link) => (link.id === linkId ? { ...link, ...updates } : link));
    localStorage.setItem('downloadLinks', JSON.stringify(updated));
  }

  private async generateTemporaryFileUrl(downloadLink: DigitalDownloadLink): Promise<string> {
    // Mock implementation - in production, generate signed URL from cloud storage
    return `/api/files/download/${downloadLink.token}`;
  }

  private async sendDownloadEmail(
    email: string,
    downloadLinks: DigitalDownloadLink[],
  ): Promise<void> {
    // Mock implementation - in production, send actual email
    console.log(
      `Sending download links to ${email}:`,
      downloadLinks.map((link) => link.downloadUrl),
    );
  }
}

// Default configuration
export const defaultDeliveryConfig: DigitalDeliveryConfig = {
  maxDownloads: 5,
  expirationDays: 7,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};

// Singleton instance
export const digitalDeliveryService = new DigitalDeliveryService(defaultDeliveryConfig);
