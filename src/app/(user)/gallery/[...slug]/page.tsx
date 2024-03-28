import React from 'react';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';
import { queryGalleryBySlug } from '@/lib/sanity/queries';
import sanityFetch from '@/lib/sanity/fetch';
import Image from 'next/image';
import urlForImage from '@/lib/util/urlForImage';

type Props = {
  params: {
    slug: string;
  };
};

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

export default async function Gallery({ params: { slug } }: Props) {
  const gallery: Gallery[] = await getGalleryListByCategory(slug);
  // console.log("🚀 ~ Gallery ~ gallery:", gallery
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>-Heading-</h1>

        {/* Sub Container  */}
        <section className='flex items-center justify-center'>
          {' '}
          Photo Session Gallery <br />
          This page can house the gallery for each individual photo session.
          {/* Gallery Photos */}
          <div className='grid grid-cols-3 gap-4'>
            {gallery.map((galleryItem, index) => (
              <div key={index}>
                <h2>{galleryItem.title}</h2>
                {galleryItem.galleryPhotos.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    className='relative h-0 w-full'
                    style={{ paddingBottom: '100%' }}
                  >
                    <Image
                      src={urlForImage(photo.image.asset._ref as any)?.url || ''}
                      alt={photo.alt}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Blog List filtered by category
async function getGalleryListByCategory(slug: string): Promise<Gallery[]> {
  try {
    // Fetch blog data from Sanity
    const gallery: Gallery[] = await sanityFetch({
      query: queryGalleryBySlug,
      tags: ['gallery-categories'],
      params: {
        slug: slug, // Pass the slug parameter to the query
      },
    });
    console.log('🚀 ~ getGalleryListByCategory ~ gallery:', gallery);

    return gallery;
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}
