'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  Download,
  MoreHorizontal,
  Star
} from 'lucide-react';
import { Product, PRODUCT_TYPE_CONFIG } from '@/types/printShop';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    type: 'print',
    name: 'Mountain Sunrise',
    slug: 'mountain-sunrise',
    description: 'A breathtaking sunrise over mountain peaks',
    shortDescription: 'Breathtaking sunrise over mountain peaks',
    price: 25,
    compareAtPrice: 35,
    isActive: true,
    isFeatured: true,
    images: [],
    categories: ['landscape'],
    tags: ['mountains', 'sunrise', 'nature'],
    seo: {
      metaTitle: 'Mountain Sunrise Print',
      metaDescription: 'Beautiful mountain sunrise fine art print',
      keywords: ['mountain', 'sunrise', 'landscape'],
      slug: 'mountain-sunrise'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    variants: []
  } as any,
  {
    id: '2',
    type: 'digital_preset',
    name: 'Moody Portrait Pack',
    slug: 'moody-portrait-pack',
    description: 'A collection of 15 professional Lightroom presets',
    shortDescription: '15 professional moody portrait presets',
    price: 29,
    isActive: true,
    isFeatured: true,
    images: [],
    categories: ['presets', 'portrait'],
    tags: ['moody', 'portrait', 'lightroom'],
    seo: {
      metaTitle: 'Moody Portrait Lightroom Presets',
      metaDescription: 'Professional moody portrait presets for Lightroom',
      keywords: ['lightroom', 'presets', 'portrait'],
      slug: 'moody-portrait-pack'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  } as any,
  {
    id: '3',
    type: 'digital_lut',
    name: 'Cinematic Color Grading LUTs',
    slug: 'cinematic-color-grading-luts',
    description: 'Professional color grading LUTs for video',
    shortDescription: 'Professional cinematic color grading LUTs',
    price: 39,
    isActive: false,
    isFeatured: false,
    images: [],
    categories: ['luts', 'video'],
    tags: ['cinematic', 'color grading', 'video'],
    seo: {
      metaTitle: 'Cinematic Color Grading LUTs',
      metaDescription: 'Professional cinematic LUTs for video color grading',
      keywords: ['luts', 'color grading', 'cinematic'],
      slug: 'cinematic-color-grading-luts'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  } as any,
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.isActive) ||
                         (filterStatus === 'inactive' && !product.isActive) ||
                         (filterStatus === 'featured' && product.isFeatured);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const toggleFeaturedStatus = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-steelpolished-400">Products</h1>
          <p className="text-steelpolished-500 mt-1">
            Manage your product catalog and inventory
          </p>
        </div>
        <Link href="/admin/products/new">
          <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
            <Plus size={16} />
            Add Product
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steelpolished-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 placeholder-steelpolished-500 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="print">Prints</option>
              <option value="digital_preset">Presets</option>
              <option value="digital_lut">LUTs</option>
              <option value="bundle">Bundles</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-steeldark-700 border-b border-steeldark-600">
              <tr>
                <th className="text-left py-3 px-6 text-steelpolished-400 font-medium">Product</th>
                <th className="text-left py-3 px-6 text-steelpolished-400 font-medium">Type</th>
                <th className="text-left py-3 px-6 text-steelpolished-400 font-medium">Price</th>
                <th className="text-left py-3 px-6 text-steelpolished-400 font-medium">Status</th>
                <th className="text-left py-3 px-6 text-steelpolished-400 font-medium">Updated</th>
                <th className="text-right py-3 px-6 text-steelpolished-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const productConfig = PRODUCT_TYPE_CONFIG[product.type];
                return (
                  <tr key={product.id} className="border-b border-steeldark-600 hover:bg-steeldark-700/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-steeldark-700 rounded-lg flex items-center justify-center">
                          {productConfig?.isDigital ? (
                            <Download size={16} className="text-steelpolished-400" />
                          ) : (
                            <Package size={16} className="text-steelpolished-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-steelpolished-400">{product.name}</h3>
                            {product.isFeatured && (
                              <Star size={14} className="text-accent fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-steelpolished-500">{product.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-steeldark-700 text-steelpolished-400 rounded-full text-sm">
                        {productConfig?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-steelpolished-400">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-steelpolished-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleProductStatus(product.id)}
                          className={`w-2 h-2 rounded-full ${
                            product.isActive ? 'bg-green-400' : 'bg-red-400'
                          }`}
                        />
                        <span className={`text-sm ${
                          product.isActive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-steelpolished-500 text-sm">
                      {product.updatedAt.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/shop/products/${product.slug}`}>
                          <button className="p-2 text-steelpolished-400 hover:text-steelpolished-300 hover:bg-steeldark-700 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <button className="p-2 text-steelpolished-400 hover:text-steelpolished-300 hover:bg-steeldark-700 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleFeaturedStatus(product.id)}
                          className={`p-2 hover:bg-steeldark-700 rounded-lg transition-colors ${
                            product.isFeatured ? 'text-accent' : 'text-steelpolished-400 hover:text-steelpolished-300'
                          }`}
                        >
                          <Star size={16} className={product.isFeatured ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-steeldark-700 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-steelpolished-500 mb-4" />
            <h3 className="text-lg font-medium text-steelpolished-400 mb-2">No products found</h3>
            <p className="text-steelpolished-500 mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first product'
              }
            </p>
            <Link href="/admin/products/new">
              <button className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                <Plus size={16} />
                Add Product
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredProducts.length > 0 && (
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-steelpolished-400">{filteredProducts.length}</p>
              <p className="text-steelpolished-500 text-sm">Total Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">
                {filteredProducts.filter(p => p.isActive).length}
              </p>
              <p className="text-steelpolished-500 text-sm">Active</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {filteredProducts.filter(p => p.isFeatured).length}
              </p>
              <p className="text-steelpolished-500 text-sm">Featured</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-steelpolished-400">
                {formatPrice(filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length)}
              </p>
              <p className="text-steelpolished-500 text-sm">Avg. Price</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
