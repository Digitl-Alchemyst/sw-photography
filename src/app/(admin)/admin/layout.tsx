'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-steeldark-600">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-steeldark-900 border-r border-steeldark-600">
          <div className="flex items-center justify-between h-16 px-6 border-b border-steeldark-600">
            <h1 className="text-xl font-bold text-steelpolished-400">SW Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-steelpolished-400 hover:text-steelpolished-300"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent border-r-2 border-accent'
                      : 'text-steelpolished-500 hover:text-steelpolished-400 hover:bg-steeldark-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-steeldark-900 border-r border-steeldark-600">
          <div className="flex items-center h-16 px-6 border-b border-steeldark-600">
            <h1 className="text-xl font-bold text-steelpolished-400">SW Admin</h1>
          </div>
          
          <nav className="flex-1 mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent border-r-2 border-accent'
                      : 'text-steelpolished-500 hover:text-steelpolished-400 hover:bg-steeldark-800'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-steeldark-600 p-6">
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-steelpolished-500 hover:text-steelpolished-400 hover:bg-steeldark-800 rounded-lg transition-colors"
              >
                <Home size={16} />
                View Site
              </Link>
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-steelpolished-500 hover:text-steelpolished-400 hover:bg-steeldark-800 rounded-lg transition-colors w-full text-left">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-steeldark-800 border-b border-steeldark-600">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-steelpolished-400 hover:text-steelpolished-300 lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-steelpolished-500">
                Welcome back, Admin
              </div>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
