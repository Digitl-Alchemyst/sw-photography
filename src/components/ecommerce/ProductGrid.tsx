'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Search, SortAsc, SortDesc } from 'lucide-react';
import { Product, ProductType, PRODUCT_TYPE_CONFIG } from '@/types/printShop';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
  defaultView?: 'grid' | 'list';
  className?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest' | 'featured';

export default function ProductGrid({
  products,
  title = 'Products',
  showFilters = true,
  showSearch = true,
  showSort = true,
  defaultView = 'grid',
  className = '',
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultView);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Get unique product types from products
  const availableTypes = useMemo(() => {
    const types = new Set(products.map((p) => p.type));
    return Array.from(types);
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Filter by product type
    if (selectedType !== 'all') {
      filtered = filtered.filter((product) => product.type === selectedType);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'featured':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedType, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low-High' },
    { value: 'price-desc', label: 'Price High-Low' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-steelpolished-400'>{title}</h2>
          <p className='text-steelpolished-500'>
            {filteredAndSortedProducts.length} product
            {filteredAndSortedProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* View Controls */}
        <div className='flex items-center gap-2'>
          {/* View Mode Toggle */}
          <div className='flex items-center rounded-lg bg-steeldark-700 p-1'>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-steelpolished-400 text-steeldark-900'
                  : 'text-steelpolished-400 hover:text-steelpolished-300'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-steelpolished-400 text-steeldark-900'
                  : 'text-steelpolished-400 hover:text-steelpolished-300'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          {/* Filters Toggle */}
          {showFilters && (
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`rounded-lg border p-2 transition-colors ${
                showFiltersPanel
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-steeldark-600 text-steelpolished-400 hover:border-steelpolished-400'
              }`}
            >
              <Filter size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <AnimatePresence>
        {(showSearch || showFiltersPanel) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='overflow-hidden'
          >
            <div className='space-y-4 rounded-lg border border-steeldark-600 bg-steeldark-800 p-4'>
              {/* Search */}
              {showSearch && (
                <div className='relative'>
                  <Search
                    size={16}
                    className='absolute left-3 top-1/2 -translate-y-1/2 transform text-steelpolished-500'
                  />
                  <input
                    type='text'
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full rounded-lg border border-steeldark-600 bg-steeldark-700 py-2 pl-10 pr-4 text-steelpolished-400 placeholder-steelpolished-500 focus:border-accent focus:outline-none'
                  />
                </div>
              )}

              {/* Filters */}
              {showFiltersPanel && (
                <div className='flex flex-wrap gap-4'>
                  {/* Product Type Filter */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-steelpolished-400'>
                      Product Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as ProductType | 'all')}
                      className='rounded-lg border border-steeldark-600 bg-steeldark-700 px-3 py-2 text-steelpolished-400 focus:border-accent focus:outline-none'
                    >
                      <option value='all'>All Types</option>
                      {availableTypes.map((type) => (
                        <option key={type} value={type}>
                          {PRODUCT_TYPE_CONFIG[type]?.name || type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  {showSort && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-steelpolished-400'>Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className='rounded-lg border border-steeldark-600 bg-steeldark-700 px-3 py-2 text-steelpolished-400 focus:border-accent focus:outline-none'
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        }
      >
        <AnimatePresence mode='popLayout'>
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <div className='py-12 text-center'>
          <div className='mb-4 text-steelpolished-500'>
            <Search size={48} className='mx-auto mb-4 opacity-50' />
            <p className='text-lg'>No products found</p>
            <p className='text-sm'>Try adjusting your search or filters</p>
          </div>
          {(searchTerm || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className='mt-4 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90'
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
