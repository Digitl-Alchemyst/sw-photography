import sanityFetch from '@/lib/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import FeaturedPhotosGrid from './FeaturedPhotosGrid';
import Link from 'next/link';

export default async function FeaturedPortfolio() {
  const photographers = await getPhotographer();
  const photographer = photographers[0];

  // Get featured photos, limit to 6 for optimal display
  const featuredPhotos = photographer.featuredPhotos?.slice(0, 6) || [];

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

// Call the Sanity Fetch Function for the Photographer Information
async function getPhotographer(): Promise<Author[]> {
  const photographer: Author[] = await sanityFetch({
    query: queryPhotographers,
    tags: ['author'],
  });
  return photographer;
}
