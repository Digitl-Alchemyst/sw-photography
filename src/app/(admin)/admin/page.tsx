import { Metadata } from 'next';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Download,
  Eye,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard | SW Photography',
  description: 'Admin dashboard for managing products, orders, and analytics.',
};

// Mock data for dashboard
const stats = [
  {
    name: 'Total Revenue',
    value: '$12,345',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    name: 'Total Orders',
    value: '156',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
  },
  {
    name: 'Active Products',
    value: '42',
    change: '+3',
    changeType: 'positive' as const,
    icon: Package,
  },
  {
    name: 'Customers',
    value: '89',
    change: '+15.3%',
    changeType: 'positive' as const,
    icon: Users,
  },
];

const recentOrders = [
  {
    id: 'SW-ABC123',
    customer: 'John Doe',
    email: 'john@example.com',
    total: 89.99,
    status: 'completed',
    date: '2024-01-15',
    items: 2,
  },
  {
    id: 'SW-DEF456',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 29.99,
    status: 'processing',
    date: '2024-01-14',
    items: 1,
  },
  {
    id: 'SW-GHI789',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    total: 159.99,
    status: 'shipped',
    date: '2024-01-13',
    items: 3,
  },
];

const topProducts = [
  {
    name: 'Mountain Sunrise Print',
    type: 'print',
    sales: 23,
    revenue: 575.0,
  },
  {
    name: 'Moody Portrait Presets',
    type: 'digital_preset',
    sales: 18,
    revenue: 522.0,
  },
  {
    name: 'Cinematic LUTs Pack',
    type: 'digital_lut',
    sales: 12,
    revenue: 468.0,
  },
];

export default function AdminDashboard() {
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

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-steelpolished-400'>Dashboard</h1>
          <p className='mt-1 text-steelpolished-500'>
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Link href='/admin/products/new'>
            <button className='flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90'>
              <Plus size={16} />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-steelpolished-500'>{stat.name}</p>
                  <p className='mt-1 text-2xl font-bold text-steelpolished-400'>{stat.value}</p>
                </div>
                <div className='rounded-lg bg-accent/10 p-3'>
                  <Icon size={24} className='text-accent' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp size={16} className='mr-1 text-green-400' />
                <span className='text-sm font-medium text-green-400'>{stat.change}</span>
                <span className='ml-1 text-sm text-steelpolished-500'>from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent Orders */}
        <div className='rounded-lg border border-steeldark-600 bg-steeldark-800'>
          <div className='border-b border-steeldark-600 p-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-steelpolished-400'>Recent Orders</h2>
              <Link href='/admin/orders'>
                <button className='text-sm font-medium text-accent hover:text-accent/80'>
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-4'
                >
                  <div className='flex-1'>
                    <div className='mb-1 flex items-center gap-3'>
                      <span className='font-medium text-steelpolished-400'>{order.id}</span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className='text-sm text-steelpolished-500'>{order.customer}</p>
                    <p className='text-xs text-steelpolished-600'>
                      {order.items} items • {order.date}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-steelpolished-400'>
                      {formatPrice(order.total)}
                    </p>
                    <button className='text-sm text-accent hover:text-accent/80'>
                      <Eye size={14} className='mr-1 inline' />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className='rounded-lg border border-steeldark-600 bg-steeldark-800'>
          <div className='border-b border-steeldark-600 p-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-steelpolished-400'>Top Products</h2>
              <Link href='/admin/analytics'>
                <button className='text-sm font-medium text-accent hover:text-accent/80'>
                  View Analytics
                </button>
              </Link>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-4'
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10'>
                      <span className='text-sm font-medium text-accent'>#{index + 1}</span>
                    </div>
                    <div>
                      <p className='font-medium text-steelpolished-400'>{product.name}</p>
                      <p className='text-sm text-steelpolished-500'>
                        {product.type.replace('_', ' ').replace('digital ', '')}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-steelpolished-400'>
                      {formatPrice(product.revenue)}
                    </p>
                    <p className='text-sm text-steelpolished-500'>{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
        <h2 className='mb-4 text-xl font-semibold text-steelpolished-400'>Quick Actions</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Link href='/admin/products/new'>
            <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-accent/10 p-2'>
                  <Plus size={20} className='text-accent' />
                </div>
                <div>
                  <h3 className='font-medium text-steelpolished-400'>Add New Product</h3>
                  <p className='text-sm text-steelpolished-500'>Create a new product listing</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/admin/orders'>
            <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-blue-500/10 p-2'>
                  <ShoppingCart size={20} className='text-blue-400' />
                </div>
                <div>
                  <h3 className='font-medium text-steelpolished-400'>Manage Orders</h3>
                  <p className='text-sm text-steelpolished-500'>Process and track orders</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/admin/analytics'>
            <div className='cursor-pointer rounded-lg bg-steeldark-700/50 p-4 transition-colors hover:bg-steeldark-700'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-green-500/10 p-2'>
                  <TrendingUp size={20} className='text-green-400' />
                </div>
                <div>
                  <h3 className='font-medium text-steelpolished-400'>View Analytics</h3>
                  <p className='text-sm text-steelpolished-500'>Check sales and performance</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* System Status */}
      <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
        <h2 className='mb-4 text-xl font-semibold text-steelpolished-400'>System Status</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-3'>
            <span className='text-steelpolished-500'>Payment Gateway</span>
            <span className='flex items-center gap-2 text-green-400'>
              <div className='h-2 w-2 rounded-full bg-green-400' />
              Online
            </span>
          </div>
          <div className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-3'>
            <span className='text-steelpolished-500'>Digital Delivery</span>
            <span className='flex items-center gap-2 text-green-400'>
              <div className='h-2 w-2 rounded-full bg-green-400' />
              Active
            </span>
          </div>
          <div className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-3'>
            <span className='text-steelpolished-500'>Print Shop</span>
            <span className='flex items-center gap-2 text-yellow-400'>
              <div className='h-2 w-2 rounded-full bg-yellow-400' />
              Setup Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
