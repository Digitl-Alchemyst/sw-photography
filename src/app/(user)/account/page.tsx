'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignOutButton } from '@clerk/nextjs';
import {
  User,
  Package,
  Download,
  CreditCard,
  Settings,
  ShoppingBag,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  Eye,
  LogOut,
} from 'lucide-react';
import { CustomerService, CustomerData } from '@/lib/services/customerService';

// Mock customer data
const mockCustomer = {
  id: 'cust_123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: new Date('2023-06-15'),
  totalOrders: 8,
  totalSpent: 342.5,
  lastOrderDate: new Date('2024-01-10'),
};

const mockRecentOrders = [
  {
    id: 'SW-ABC123',
    date: new Date('2024-01-10'),
    total: 89.99,
    status: 'completed',
    itemCount: 2,
    hasDigitalItems: true,
  },
  {
    id: 'SW-DEF456',
    date: new Date('2023-12-22'),
    total: 29.99,
    status: 'completed',
    itemCount: 1,
    hasDigitalItems: true,
  },
  {
    id: 'SW-GHI789',
    date: new Date('2023-11-15'),
    total: 159.99,
    status: 'completed',
    itemCount: 3,
    hasDigitalItems: false,
  },
];

const mockDownloads = [
  {
    id: 'dl_1',
    productName: 'Moody Portrait Presets',
    orderDate: new Date('2024-01-10'),
    expiresAt: new Date('2024-01-17'),
    downloadCount: 2,
    maxDownloads: 5,
    isActive: true,
  },
  {
    id: 'dl_2',
    productName: 'Cinematic LUTs Pack',
    orderDate: new Date('2023-12-22'),
    expiresAt: new Date('2023-12-29'),
    downloadCount: 5,
    maxDownloads: 5,
    isActive: false,
  },
];

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'downloads' | 'profile'>(
    'overview',
  );
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomerData() {
      if (!isLoaded || !user) {
        setLoading(false);
        return;
      }

      try {
        const customer = await CustomerService.getCustomerByClerkId(user.id);
        setCustomerData(customer);
      } catch (error) {
        console.error('Error loading customer data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCustomerData();
  }, [user, isLoaded]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'shipped':
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-steelpolished-400 bg-steelpolished-400/10';
    }
  };

  // Redirect to sign-in if not authenticated
  if (!isLoaded) {
    return (
      <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent' />
            <p className='text-steelpolished-500'>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-steelpolished-400'>Sign In Required</h1>
            <p className='mb-8 text-steelpolished-500'>
              Please sign in to access your account and manage your orders.
            </p>
            <Link href='/sign-in'>
              <button className='rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/90'>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayCustomer = {
    firstName: customerData?.firstName || user.firstName || 'User',
    lastName: customerData?.lastName || user.lastName || '',
    email: customerData?.email || user.emailAddresses[0]?.emailAddress || '',
    joinDate: customerData
      ? new Date(customerData.createdAt)
      : new Date(user.createdAt || Date.now()),
    totalOrders: customerData?.stats?.totalOrders || 0,
    totalSpent: customerData?.stats?.totalSpent || 0,
    lastOrderDate: customerData?.stats?.lastOrderDate
      ? new Date(customerData.stats.lastOrderDate)
      : new Date(),
    phone: customerData?.phone,
  };

  return (
    <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto max-w-6xl px-6 py-12'>
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-steelpolished-400'>My Account</h1>
            <p className='mt-2 text-steelpolished-500'>
              Manage your orders, downloads, and account settings
            </p>
          </div>
          <SignOutButton>
            <button className='flex items-center gap-2 rounded-lg border border-steeldark-600 px-4 py-2 text-steelpolished-400 transition-colors hover:border-steelpolished-400 hover:text-steelpolished-300'>
              <LogOut size={16} />
              Sign Out
            </button>
          </SignOutButton>
        </div>

        {/* Tab Navigation */}
        <div className='mb-8'>
          <div className='flex border-b border-steeldark-600'>
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'profile', label: 'Profile', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-steelpolished-500 hover:text-steelpolished-400'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className='space-y-6'>
            {/* Welcome Section */}
            <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
              <div className='mb-4 flex items-center gap-4'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-accent'>
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt='Profile'
                      width={64}
                      height={64}
                      className='h-full w-full rounded-full object-cover'
                    />
                  ) : (
                    <span className='text-xl font-bold text-white'>
                      {displayCustomer.firstName[0]}
                      {displayCustomer.lastName[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-steelpolished-400'>
                    Welcome back, {displayCustomer.firstName}!
                  </h2>
                  <p className='text-steelpolished-500'>
                    Member since {displayCustomer.joinDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
                <div className='mb-2 flex items-center gap-3'>
                  <div className='rounded-lg bg-accent/10 p-2'>
                    <ShoppingBag size={20} className='text-accent' />
                  </div>
                  <h3 className='font-medium text-steelpolished-400'>Total Orders</h3>
                </div>
                <p className='text-2xl font-bold text-steelpolished-300'>
                  {displayCustomer.totalOrders}
                </p>
                <p className='text-sm text-steelpolished-500'>
                  Last order: {displayCustomer.lastOrderDate.toLocaleDateString()}
                </p>
              </div>

              <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
                <div className='mb-2 flex items-center gap-3'>
                  <div className='rounded-lg bg-green-500/10 p-2'>
                    <DollarSign size={20} className='text-green-400' />
                  </div>
                  <h3 className='font-medium text-steelpolished-400'>Total Spent</h3>
                </div>
                <p className='text-2xl font-bold text-steelpolished-300'>
                  {formatPrice(displayCustomer.totalSpent)}
                </p>
                <p className='text-sm text-steelpolished-500'>Across all orders</p>
              </div>

              <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
                <div className='mb-2 flex items-center gap-3'>
                  <div className='rounded-lg bg-blue-500/10 p-2'>
                    <Download size={20} className='text-blue-400' />
                  </div>
                  <h3 className='font-medium text-steelpolished-400'>Digital Products</h3>
                </div>
                <p className='text-2xl font-bold text-steelpolished-300'>{mockDownloads.length}</p>
                <p className='text-sm text-steelpolished-500'>Available for download</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Recent Orders */}
              <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-steelpolished-400'>Recent Orders</h3>
                  <Link href='/account/orders'>
                    <button className='text-sm font-medium text-accent hover:text-accent/80'>
                      View All
                    </button>
                  </Link>
                </div>
                <div className='space-y-3'>
                  {mockRecentOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-3'
                    >
                      <div>
                        <p className='font-medium text-steelpolished-400'>{order.id}</p>
                        <p className='text-sm text-steelpolished-500'>
                          {order.date.toLocaleDateString()} • {order.itemCount} items
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-steelpolished-400'>
                          {formatPrice(order.total)}
                        </p>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Downloads */}
              <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-steelpolished-400'>
                    Digital Products
                  </h3>
                  <Link href='/account/downloads'>
                    <button className='text-sm font-medium text-accent hover:text-accent/80'>
                      View All
                    </button>
                  </Link>
                </div>
                <div className='space-y-3'>
                  {mockDownloads.map((download) => (
                    <div
                      key={download.id}
                      className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-3'
                    >
                      <div>
                        <p className='font-medium text-steelpolished-400'>
                          {download.productName}
                        </p>
                        <p className='text-sm text-steelpolished-500'>
                          {download.downloadCount}/{download.maxDownloads} downloads used
                        </p>
                      </div>
                      <div className='text-right'>
                        {download.isActive ? (
                          <Link href={`/downloads/${download.id}`}>
                            <button className='text-sm font-medium text-accent hover:text-accent/80'>
                              Download
                            </button>
                          </Link>
                        ) : (
                          <span className='text-sm text-red-400'>Expired</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Quick Actions</h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <Link href='/shop'>
                  <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-lg bg-accent/10 p-2'>
                        <ShoppingBag size={20} className='text-accent' />
                      </div>
                      <div>
                        <h4 className='font-medium text-steelpolished-400'>Continue Shopping</h4>
                        <p className='text-sm text-steelpolished-500'>Browse our products</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href='/account/downloads'>
                  <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-lg bg-blue-500/10 p-2'>
                        <Download size={20} className='text-blue-400' />
                      </div>
                      <div>
                        <h4 className='font-medium text-steelpolished-400'>My Downloads</h4>
                        <p className='text-sm text-steelpolished-500'>Access digital products</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-lg bg-green-500/10 p-2'>
                      <FileText size={20} className='text-green-400' />
                    </div>
                    <div>
                      <h4 className='font-medium text-steelpolished-400'>Support</h4>
                      <p className='text-sm text-steelpolished-500'>Get help with orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
            <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Order History</h3>
            <div className='space-y-4'>
              {mockRecentOrders.map((order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-4'
                >
                  <div className='flex items-center gap-4'>
                    <div className='rounded-lg bg-accent/10 p-2'>
                      <Package size={20} className='text-accent' />
                    </div>
                    <div>
                      <h4 className='font-medium text-steelpolished-400'>{order.id}</h4>
                      <p className='text-sm text-steelpolished-500'>
                        {order.date.toLocaleDateString()} • {order.itemCount} items
                        {order.hasDigitalItems && ' • Contains digital products'}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='text-right'>
                      <p className='font-medium text-steelpolished-400'>
                        {formatPrice(order.total)}
                      </p>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <button className='rounded-lg p-2 text-steelpolished-400 transition-colors hover:bg-steeldark-700 hover:text-steelpolished-300'>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
            <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Digital Products</h3>
            <div className='space-y-4'>
              {mockDownloads.map((download) => (
                <div
                  key={download.id}
                  className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-4'
                >
                  <div className='flex items-center gap-4'>
                    <div className='rounded-lg bg-blue-500/10 p-2'>
                      <Download size={20} className='text-blue-400' />
                    </div>
                    <div>
                      <h4 className='font-medium text-steelpolished-400'>
                        {download.productName}
                      </h4>
                      <p className='text-sm text-steelpolished-500'>
                        Purchased: {download.orderDate.toLocaleDateString()} • Downloads:{' '}
                        {download.downloadCount}/{download.maxDownloads}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {download.isActive ? (
                      <Link href={`/downloads/${download.id}`}>
                        <button className='flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90'>
                          <Download size={16} />
                          Download
                        </button>
                      </Link>
                    ) : (
                      <span className='text-sm text-red-400'>Expired</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className='space-y-6'>
            <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-steelpolished-400'>
                  Profile Information
                </h3>
                <button className='flex items-center gap-2 text-accent hover:text-accent/80'>
                  <Edit size={16} />
                  Edit
                </button>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-steelpolished-400'>
                    First Name
                  </label>
                  <p className='text-steelpolished-300'>{displayCustomer.firstName}</p>
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-steelpolished-400'>
                    Last Name
                  </label>
                  <p className='text-steelpolished-300'>{displayCustomer.lastName}</p>
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-steelpolished-400'>
                    Email
                  </label>
                  <p className='text-steelpolished-300'>{displayCustomer.email}</p>
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-steelpolished-400'>
                    Phone
                  </label>
                  <p className='text-steelpolished-300'>
                    {displayCustomer.phone || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>
                Account Settings
              </h3>
              <div className='space-y-4'>
                <button className='w-full rounded-lg bg-steeldark-700/50 p-4 text-left transition-colors hover:bg-steeldark-700'>
                  <h4 className='mb-1 font-medium text-steelpolished-400'>Change Password</h4>
                  <p className='text-sm text-steelpolished-500'>Update your account password</p>
                </button>
                <button className='w-full rounded-lg bg-steeldark-700/50 p-4 text-left transition-colors hover:bg-steeldark-700'>
                  <h4 className='mb-1 font-medium text-steelpolished-400'>Email Preferences</h4>
                  <p className='text-sm text-steelpolished-500'>Manage your email notifications</p>
                </button>
                <button className='w-full rounded-lg bg-steeldark-700/50 p-4 text-left transition-colors hover:bg-steeldark-700'>
                  <h4 className='mb-1 font-medium text-steelpolished-400'>Delete Account</h4>
                  <p className='text-sm text-steelpolished-500'>Permanently delete your account</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
