import sanityFetch from '@/lib/sanity/fetch';
import { queryGalleryCategories } from '@/lib/sanity/queries';
import { headerFontStyle, Aerotis } from '@/lib/util/headerFontStyles';
import urlForImage from '@/lib/util/urlForImage';
import resolveHref from '@/lib/util/resolveHref';
import formatCategoryTitle from '@/lib/util/formatTitleForURL';
import ClientSideRoute from '@/components/providers/ClientSideRoute';
import Image from 'next/image';

export default async function GalleryPreview() {
  const galleries = await getGalleryCategories();
  
  // Limit to first 4 categories for preview
  const previewGalleries = galleries.slice(0, 4);

  if (!previewGalleries.length) {
    return null;
  }

  return (
    <section className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-6 py-16 xl:px-30'>
        {/* Heading */}
        <h2 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Gallery <span className='text-accent'>Collections</span> -
        </h2>

        <div className='w-full'>
          <hr className='mb-12 border-accent' />
          
          {/* Gallery Categories Grid */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
            {previewGalleries.map((gallery, index) => (
              <ClientSideRoute
                route={resolveHref('gallerycategory', formatCategoryTitle(gallery.title)) || ''}
                key={index}
              >
                <div className='group flex w-full cursor-pointer flex-col items-center space-y-6 rounded-lg border border-steeldark-400 bg-steelpolished-600/20 p-6 shadow-2xl shadow-steeldark-800 drop-shadow-lg transition-all duration-300 hover:scale-105 hover:bg-steelpolished-600/30'>
                  {/* Category Title */}
                  <h3 className={`text-center text-2xl font-bold text-steelpolished-400 underline decoration-steelpolished-600 underline-offset-4 transition-colors duration-300 group-hover:text-accent lg:text-xl xl:text-2xl ${Aerotis.className}`}>
                    {gallery.title}
                  </h3>
                  
                  {/* Featured Image */}
                  <div className='relative h-48 w-full overflow-hidden rounded-md md:h-56 lg:h-40 xl:h-48'>
                    <Image
                      src={urlForImage(gallery.featuredImage as any)?.url() || ''}
                      fill
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                      alt={`${gallery.title} gallery preview`}
                      className='object-cover object-center transition-all duration-300 group-hover:scale-110 group-hover:opacity-90'
                    />
                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-steeldark-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    <div className='absolute bottom-3 left-3 right-3 transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                      <p className='text-sm font-medium text-steelpolished-200'>
                        Explore Collection →
                      </p>
                    </div>
                  </div>
                  
                  {/* Description if available */}
                  {gallery.description && (
                    <p className='text-center text-sm text-steelpolished-400 line-clamp-3'>
                      {gallery.description}
                    </p>
                  )}
                </div>
              </ClientSideRoute>
            ))}
          </div>

          {/* View All Galleries CTA */}
          <div className='mt-12 flex justify-center'>
            <ClientSideRoute route='/gallery'>
              <button className='rounded-lg border border-accent bg-steeldark-600/80 px-8 py-3 text-lg font-medium text-steelpolished-300 transition-all duration-300 hover:bg-accent hover:text-steeldark-900 hover:shadow-lg hover:shadow-accent/30'>
                View All Gallery Collections
              </button>
            </ClientSideRoute>
          </div>
        </div>
      </div>
    </section>
  );
}

// Call the Sanity Fetch Function for Gallery Categories
async function getGalleryCategories() {
  try {
    const galleries: galleryCategory[] = await sanityFetch({
      query: queryGalleryCategories,
      tags: ['galleryCategory'],
    });

    return galleries.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch gallery categories:', error);
    return [];
  }
}
