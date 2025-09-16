import { client } from '@/lib/sanity/client';
import { useUser } from '@clerk/nextjs';

export interface CustomerData {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  addresses: CustomerAddress[];
  preferences: CustomerPreferences;
  stats: CustomerStats;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerAddress {
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerPreferences {
  emailMarketing: boolean;
  orderUpdates: boolean;
  newProductAlerts: boolean;
  currency: string;
}

export interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  averageOrderValue: number;
}

export class CustomerService {
  /**
   * Get customer data by Clerk user ID
   */
  static async getCustomerByClerkId(clerkId: string): Promise<CustomerData | null> {
    try {
      const customer = await client.fetch(
        `*[_type == "customer" && clerkId == $clerkId && isActive == true][0]{
          _id,
          clerkId,
          email,
          firstName,
          lastName,
          phone,
          profileImage,
          addresses,
          preferences,
          stats,
          tags,
          isActive,
          createdAt,
          updatedAt
        }`,
        { clerkId },
      );

      return customer || null;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
  }

  /**
   * Create a new customer record
   */
  static async createCustomer(
    clerkId: string,
    userData: Partial<CustomerData>,
  ): Promise<CustomerData | null> {
    try {
      const customerData = {
        _type: 'customer',
        clerkId,
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        profileImage: userData.profileImage || '',
        addresses: userData.addresses || [],
        preferences: userData.preferences || {
          emailMarketing: false,
          orderUpdates: true,
          newProductAlerts: false,
          currency: 'USD',
        },
        stats: {
          totalOrders: 0,
          totalSpent: 0,
          averageOrderValue: 0,
        },
        tags: userData.tags || [],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await client.create(customerData);
      return result as unknown as CustomerData;
    } catch (error) {
      console.error('Error creating customer:', error);
      return null;
    }
  }

  /**
   * Update customer data
   */
  static async updateCustomer(
    customerId: string,
    updates: Partial<CustomerData>,
  ): Promise<CustomerData | null> {
    try {
      const result = await client
        .patch(customerId)
        .set({
          ...updates,
          updatedAt: new Date().toISOString(),
        })
        .commit();

      return result as unknown as CustomerData;
    } catch (error) {
      console.error('Error updating customer:', error);
      return null;
    }
  }

  /**
   * Add or update customer address
   */
  static async updateCustomerAddress(
    customerId: string,
    address: CustomerAddress,
    addressIndex?: number,
  ): Promise<CustomerData | null> {
    try {
      const customer = await client.fetch(`*[_type == "customer" && _id == $customerId][0]`, {
        customerId,
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      let addresses = customer.addresses || [];

      if (addressIndex !== undefined && addressIndex >= 0) {
        // Update existing address
        addresses[addressIndex] = address;
      } else {
        // Add new address
        addresses.push(address);
      }

      // If this is set as default, unset other defaults of the same type
      if (address.isDefault) {
        addresses = addresses.map((addr: CustomerAddress, index: number) => ({
          ...addr,
          isDefault:
            addr.type === address.type
              ? index === (addressIndex ?? addresses.length - 1)
              : addr.isDefault,
        }));
      }

      const result = await client
        .patch(customerId)
        .set({
          addresses,
          updatedAt: new Date().toISOString(),
        })
        .commit();

      return result as unknown as CustomerData;
    } catch (error) {
      console.error('Error updating customer address:', error);
      return null;
    }
  }

  /**
   * Update customer preferences
   */
  static async updateCustomerPreferences(
    customerId: string,
    preferences: Partial<CustomerPreferences>,
  ): Promise<CustomerData | null> {
    try {
      const customer = await client.fetch(`*[_type == "customer" && _id == $customerId][0]`, {
        customerId,
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      const updatedPreferences = {
        ...customer.preferences,
        ...preferences,
      };

      const result = await client
        .patch(customerId)
        .set({
          preferences: updatedPreferences,
          updatedAt: new Date().toISOString(),
        })
        .commit();

      return result as unknown as CustomerData;
    } catch (error) {
      console.error('Error updating customer preferences:', error);
      return null;
    }
  }

  /**
   * Update customer statistics (called when orders are placed)
   */
  static async updateCustomerStats(
    customerId: string,
    orderValue: number,
    orderDate: string,
  ): Promise<CustomerData | null> {
    try {
      const customer = await client.fetch(`*[_type == "customer" && _id == $customerId][0]`, {
        customerId,
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      const currentStats = customer.stats || {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
      };

      const newTotalOrders = currentStats.totalOrders + 1;
      const newTotalSpent = currentStats.totalSpent + orderValue;
      const newAverageOrderValue = newTotalSpent / newTotalOrders;

      const updatedStats = {
        totalOrders: newTotalOrders,
        totalSpent: newTotalSpent,
        lastOrderDate: orderDate,
        averageOrderValue: Math.round(newAverageOrderValue * 100) / 100,
      };

      const result = await client
        .patch(customerId)
        .set({
          stats: updatedStats,
          updatedAt: new Date().toISOString(),
        })
        .commit();

      return result as unknown as CustomerData;
    } catch (error) {
      console.error('Error updating customer stats:', error);
      return null;
    }
  }

  /**
   * Get customer orders
   */
  static async getCustomerOrders(customerId: string, limit: number = 10) {
    try {
      const orders = await client.fetch(
        `*[_type == "order" && customer._ref == $customerId] | order(createdAt desc)[0...$limit]{
          _id,
          orderNumber,
          status,
          paymentStatus,
          total,
          createdAt,
          items[]{
            productName,
            quantity,
            unitPrice,
            totalPrice
          }
        }`,
        { customerId, limit },
      );

      return orders;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      return [];
    }
  }

  /**
   * Get customer download links
   */
  static async getCustomerDownloads(customerId: string) {
    try {
      // This would typically query a downloads table or join with orders
      // For now, we'll return a mock implementation
      return [];
    } catch (error) {
      console.error('Error fetching customer downloads:', error);
      return [];
    }
  }
}

/**
 * React hook to get current customer data
 */
export function useCustomer() {
  const { user, isLoaded } = useUser();

  const getCustomerData = async (): Promise<CustomerData | null> => {
    if (!isLoaded || !user) {
      return null;
    }

    return CustomerService.getCustomerByClerkId(user.id);
  };

  return {
    getCustomerData,
    isLoaded,
    user,
  };
}
