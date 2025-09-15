import { Metadata } from 'next';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Download,
  Eye,
  Plus
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
    revenue: 575.00,
  },
  {
    name: 'Moody Portrait Presets',
    type: 'digital_preset',
    sales: 18,
    revenue: 522.00,
  },
  {
    name: 'Cinematic LUTs Pack',
    type: 'digital_lut',
    sales: 12,
    revenue: 468.00,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-steelpolished-400">Dashboard</h1>
          <p className="text-steelpolished-500 mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
              <Plus size={16} />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-steelpolished-500 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-steelpolished-400 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon size={24} className="text-accent" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp size={16} className="text-green-400 mr-1" />
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                <span className="text-steelpolished-500 text-sm ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg">
          <div className="p-6 border-b border-steeldark-600">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-steelpolished-400">Recent Orders</h2>
              <Link href="/admin/orders">
                <button className="text-accent hover:text-accent/80 text-sm font-medium">
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-steeldark-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-steelpolished-400">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-steelpolished-500">{order.customer}</p>
                    <p className="text-xs text-steelpolished-600">{order.items} items • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-steelpolished-400">{formatPrice(order.total)}</p>
                    <button className="text-accent hover:text-accent/80 text-sm">
                      <Eye size={14} className="inline mr-1" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg">
          <div className="p-6 border-b border-steeldark-600">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-steelpolished-400">Top Products</h2>
              <Link href="/admin/analytics">
                <button className="text-accent hover:text-accent/80 text-sm font-medium">
                  View Analytics
                </button>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-4 bg-steeldark-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-medium text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-steelpolished-400">{product.name}</p>
                      <p className="text-sm text-steelpolished-500">
                        {product.type.replace('_', ' ').replace('digital ', '')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-steelpolished-400">{formatPrice(product.revenue)}</p>
                    <p className="text-sm text-steelpolished-500">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-steelpolished-400 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/products/new">
            <div className="p-4 bg-steeldark-700/50 rounded-lg hover:bg-steeldark-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Plus size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-steelpolished-400">Add New Product</h3>
                  <p className="text-sm text-steelpolished-500">Create a new product listing</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="p-4 bg-steeldark-700/50 rounded-lg hover:bg-steeldark-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ShoppingCart size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-steelpolished-400">Manage Orders</h3>
                  <p className="text-sm text-steelpolished-500">Process and track orders</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/analytics">
            <div className="p-4 bg-steeldark-700/50 rounded-lg hover:bg-steeldark-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-steelpolished-400">View Analytics</h3>
                  <p className="text-sm text-steelpolished-500">Check sales and performance</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-steelpolished-400 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-steeldark-700/50 rounded-lg">
            <span className="text-steelpolished-500">Payment Gateway</span>
            <span className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Online
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-steeldark-700/50 rounded-lg">
            <span className="text-steelpolished-500">Digital Delivery</span>
            <span className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-steeldark-700/50 rounded-lg">
            <span className="text-steelpolished-500">Print Shop</span>
            <span className="flex items-center gap-2 text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Setup Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
