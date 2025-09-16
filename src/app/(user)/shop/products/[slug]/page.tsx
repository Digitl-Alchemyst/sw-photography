import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ecommerce/ProductDetail';
import { Product } from '@/types/printShop';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Mock function to get product by slug - this would query Sanity CMS
async function getProductBySlug(slug: string): Promise<Product | null> {
  // Mock data for development
  const mockProducts: Product[] = [
    {
      id: '1',
      type: 'print',
      name: 'Mountain Sunrise',
      slug: 'mountain-sunrise',
      description:
        '<p>A breathtaking sunrise over mountain peaks captured during a hiking expedition in the Rocky Mountains. This image represents the perfect moment when golden light breaks through the morning mist, illuminating the rugged landscape below.</p><p>Shot with careful attention to composition and lighting, this photograph captures the raw beauty and majesty of nature at its finest. The warm tones and dramatic contrast make it a perfect centerpiece for any room.</p>',
      shortDescription: 'Breathtaking sunrise over mountain peaks',
      price: 25,
      compareAtPrice: 35,
      isActive: true,
      isFeatured: true,
      images: [
        {
          id: '1',
          url: '/gallery/landscape1.jpg',
          alt: 'Mountain Sunrise',
          isPrimary: true,
          sortOrder: 0,
        },
        {
          id: '2',
          url: '/gallery/landscape2.jpg',
          alt: 'Mountain Sunrise Detail',
          isPrimary: false,
          sortOrder: 1,
        },
      ],
      categories: ['landscape'],
      tags: ['mountains', 'sunrise', 'nature', 'landscape', 'golden hour'],
      seo: {
        metaTitle: 'Mountain Sunrise Fine Art Print | SW Photography',
        metaDescription:
          'Beautiful mountain sunrise fine art print available in multiple sizes and materials',
        keywords: ['mountain', 'sunrise', 'landscape', 'fine art print'],
        slug: 'mountain-sunrise',
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      variants: [
        {
          id: '1-8x10-standard',
          size: { id: '8x10', name: '8" x 10"', dimensions: '8x10', price: 25 },
          material: {
            id: 'standard',
            name: 'Standard Paper',
            description: 'High-quality photo paper',
            priceMultiplier: 1.0,
          },
          price: 25,
          isAvailable: true,
        },
      ],
    } as any,
    {
      id: '2',
      type: 'digital_preset',
      name: 'Moody Portrait Pack',
      slug: 'moody-portrait-pack',
      description:
        "<p>A carefully curated collection of 15 professional Lightroom presets designed specifically for moody portrait photography. These presets will help you achieve that coveted dark, atmospheric look that makes portraits stand out.</p><p>Each preset has been meticulously crafted and tested on hundreds of images to ensure consistent, professional results. Perfect for wedding photographers, portrait artists, and anyone looking to add drama and emotion to their work.</p><h3>What's Included:</h3><ul><li>15 unique Lightroom presets</li><li>Installation instructions</li><li>Before/after examples</li><li>Tips for best results</li></ul>",
      shortDescription: '15 professional moody portrait presets for Lightroom',
      price: 29,
      isActive: true,
      isFeatured: true,
      images: [
        {
          id: '2',
          url: '/products/preset-preview.jpg',
          alt: 'Moody Portrait Pack Preview',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
      categories: ['presets', 'portrait'],
      tags: ['moody', 'portrait', 'lightroom', 'presets', 'dark', 'atmospheric'],
      seo: {
        metaTitle: 'Moody Portrait Lightroom Presets | SW Photography',
        metaDescription:
          'Professional moody portrait presets for Lightroom - 15 unique presets for dramatic portraits',
        keywords: ['lightroom', 'presets', 'portrait', 'moody'],
        slug: 'moody-portrait-pack',
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    } as any,
  ];

  return mockProducts.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | SW Photography',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.seo?.metaTitle || `${product.name} | SW Photography`,
    description: product.seo?.metaDescription || product.shortDescription,
    keywords: product.seo?.keywords?.join(', '),
    openGraph: {
      title: product.name,
      description: product.shortDescription || '',
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription || '',
      images: product.images.filter((img) => img.isPrimary).map((img) => img.url),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        {/* Breadcrumb */}
        <nav className='mb-8 text-sm'>
          <ol className='flex items-center space-x-2 text-steelpolished-500'>
            <li>
              <a href='/' className='transition-colors hover:text-steelpolished-400'>
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href='/shop' className='transition-colors hover:text-steelpolished-400'>
                Shop
              </a>
            </li>
            <li>/</li>
            <li className='text-steelpolished-400'>{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <ProductDetail product={product} />

        {/* Related Products Section */}
        <div className='mt-16 border-t border-steeldark-600 pt-12'>
          <h2 className='mb-8 text-2xl font-bold text-steelpolished-400'>You Might Also Like</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {/* Placeholder for related products */}
            {[1, 2, 3].map((i) => (
              <div key={i} className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-4'>
                <div className='mb-4 flex aspect-square items-center justify-center rounded-lg bg-steeldark-700 text-steelpolished-500'>
                  Related Product {i}
                </div>
                <h3 className='mb-2 font-medium text-steelpolished-400'>Related Product {i}</h3>
                <p className='mb-3 text-sm text-steelpolished-500'>
                  Short description of related product
                </p>
                <div className='flex items-center justify-between'>
                  <span className='font-bold text-steelpolished-300'>$29</span>
                  <button className='text-sm font-medium text-accent hover:text-accent/80'>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static params for known products (optional, for static generation)
export async function generateStaticParams() {
  // In a real app, you'd fetch all product slugs from your CMS
  return [
    { slug: 'mountain-sunrise' },
    { slug: 'moody-portrait-pack' },
    { slug: 'cinematic-color-grading-luts' },
  ];
}
