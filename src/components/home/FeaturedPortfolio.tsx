import sanityFetch from '@/lib/sanity/fetch';
import { queryFeaturedGalleries } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import FeaturedPhotosGrid from './FeaturedPhotosGrid';
import Link from 'next/link';

async function getFeaturedGalleries() {
  return await sanityFetch({
    query: queryFeaturedGalleries,
    tags: ['gallery'],
  });
}

export default async function FeaturedPortfolio() {
  const featuredGalleries = await getFeaturedGalleries();

  // Extract featured photos from galleries, limit to 6 for optimal display
  const featuredPhotos = (featuredGalleries as any[])
    .slice(0, 6)
    .map((gallery: any) => gallery.featuredPhoto)
    .filter(Boolean);

  if (!featuredPhotos.length) {
    return null;
  }

  return (
    <section className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-6 py-16 xl:px-30'>
        {/* Heading */}
        <h2 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Featured <span className='text-accent'>Portfolio</span> -
        </h2>

        <div className='w-full'>
          <hr className='mb-12 border-accent' />

          {/* Featured Photos Grid */}
          <FeaturedPhotosGrid featuredPhotos={featuredPhotos} />

          {/* Call to Action */}
          <div className='mt-12 flex justify-center'>
            <Link
              href='/gallery'
              className='rounded-lg border border-accent bg-steeldark-600/80 px-8 py-3 text-lg font-medium text-steelpolished-300 transition-all duration-300 hover:bg-accent hover:text-steeldark-900 hover:shadow-lg hover:shadow-accent/30'
            >
              Explore All Galleries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
