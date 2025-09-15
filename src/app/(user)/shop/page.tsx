import { Metadata } from 'next';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import ProductGrid from '@/components/ecommerce/ProductGrid';
import { Product } from '@/types/printShop';

export const metadata: Metadata = {
  title: 'Shop | SW Photography',
  description: 'Browse our collection of fine art prints, Lightroom presets, and video LUTs. Professional photography products for creators and art lovers.',
  keywords: 'photography prints, lightroom presets, video luts, fine art, digital products',
};

// Mock data for development - this would come from Sanity CMS
const mockProducts: Product[] = [
  {
    id: '1',
    type: 'print',
    name: 'Mountain Sunrise',
    slug: 'mountain-sunrise',
    description: 'A breathtaking sunrise over mountain peaks captured during a hiking expedition.',
    shortDescription: 'Breathtaking sunrise over mountain peaks',
    price: 25,
    compareAtPrice: 35,
    isActive: true,
    isFeatured: true,
    images: [
      { id: '1', url: '/gallery/landscape1.jpg', alt: 'Mountain Sunrise', isPrimary: true, sortOrder: 0 }
    ],
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
    variants: [
      {
        id: '1-8x10-standard',
        size: { id: '8x10', name: '8" x 10"', dimensions: '8x10', price: 25 },
        material: { id: 'standard', name: 'Standard Paper', description: 'High-quality photo paper', priceMultiplier: 1.0 },
        price: 25,
        isAvailable: true
      }
    ]
  } as any,
  {
    id: '2',
    type: 'digital_preset',
    name: 'Moody Portrait Pack',
    slug: 'moody-portrait-pack',
    description: 'A collection of 15 professional Lightroom presets designed for moody portrait photography.',
    shortDescription: '15 professional moody portrait presets',
    price: 29,
    isActive: true,
    isFeatured: true,
    images: [
      { id: '2', url: '/products/preset-preview.jpg', alt: 'Moody Portrait Pack', isPrimary: true, sortOrder: 0 }
    ],
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
    description: 'Professional color grading LUTs for achieving cinematic looks in your video projects.',
    shortDescription: 'Professional cinematic color grading LUTs',
    price: 39,
    isActive: true,
    isFeatured: false,
    images: [
      { id: '3', url: '/products/lut-preview.jpg', alt: 'Cinematic LUTs', isPrimary: true, sortOrder: 0 }
    ],
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

export default function ShopPage() {
  return (
    <main className="w-full bg-steeldark-600 text-steelpolished-400">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10 py-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-7xl font-bold ${headerFontStyle.className}`}>
            - Shop -
          </h1>
          <p className="text-xl text-steelpolished-500 max-w-2xl">
            Discover our collection of fine art prints, professional Lightroom presets, 
            and cinematic video LUTs. Perfect for photographers, videographers, and art enthusiasts.
          </p>
        </div>

        {/* Featured Products Section */}
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-steelpolished-400 mb-4">Featured Products</h2>
            <hr className="border-accent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockProducts.filter(p => p.isFeatured).map((product) => (
              <div key={product.id} className="bg-steeldark-800 rounded-lg border border-steeldark-600 overflow-hidden">
                <div className="aspect-square bg-steeldark-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-steelpolished-500">
                    Product Image Placeholder
                  </div>
                  {product.isFeatured && (
                    <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-steelpolished-400 mb-2">{product.name}</h3>
                  <p className="text-steelpolished-500 text-sm mb-3">{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-steelpolished-300">
                        ${product.price}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-steelpolished-500 line-through">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-steelpolished-600 bg-steeldark-700 px-2 py-1 rounded">
                      {product.type.replace('_', ' ').replace('digital ', '')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="w-full">
          <ProductGrid 
            products={mockProducts}
            title="All Products"
            showFilters={true}
            showSearch={true}
            showSort={true}
          />
        </div>

        {/* Categories Section */}
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-steelpolished-400 mb-4">Shop by Category</h2>
            <hr className="border-accent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-steeldark-800 rounded-lg border border-steeldark-600 p-6 text-center hover:border-steelpolished-400/30 transition-colors">
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-steelpolished-400 mb-2">Fine Art Prints</h3>
              <p className="text-steelpolished-500 mb-4">
                High-quality prints of our best landscape and portrait photography
              </p>
              <button className="text-accent hover:text-accent/80 font-medium">
                Browse Prints →
              </button>
            </div>
            
            <div className="bg-steeldark-800 rounded-lg border border-steeldark-600 p-6 text-center hover:border-steelpolished-400/30 transition-colors">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-steelpolished-400 mb-2">Lightroom Presets</h3>
              <p className="text-steelpolished-500 mb-4">
                Professional presets to enhance your photography workflow
              </p>
              <button className="text-accent hover:text-accent/80 font-medium">
                Browse Presets →
              </button>
            </div>
            
            <div className="bg-steeldark-800 rounded-lg border border-steeldark-600 p-6 text-center hover:border-steelpolished-400/30 transition-colors">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-steelpolished-400 mb-2">Video LUTs</h3>
              <p className="text-steelpolished-500 mb-4">
                Cinematic color grading LUTs for professional video production
              </p>
              <button className="text-accent hover:text-accent/80 font-medium">
                Browse LUTs →
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="w-full max-w-2xl bg-steeldark-800 rounded-lg border border-steeldark-600 p-8 text-center">
          <h3 className="text-2xl font-bold text-steelpolished-400 mb-4">Stay Updated</h3>
          <p className="text-steelpolished-500 mb-6">
            Get notified about new products, exclusive discounts, and photography tips.
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 placeholder-steelpolished-500 focus:border-accent focus:outline-none"
            />
            <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
