import React from 'react';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';
import { queryGalleryBySlug } from '@/lib/sanity/queries';
import sanityFetch from '@/lib/sanity/fetch';
import Image from 'next/image';
import urlForImage from '@/lib/util/urlForImage';
import Link from 'next/link';
// import blurredImgUrl from '@/lib/util/getBase64';

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
  const gallery = (await getGalleryBySlug(slug)) as Gallery;
  // console.log('🚀 ~ Gallery ~ slug:', slug);
  // console.log('🚀 ~ Gallery ~ gallery:', gallery);

  const galleryPhotos = gallery.galleryPhotos;
  // console.log('🚀 ~ Gallery ~ galleryPhotos:', galleryPhotos);

  // map through the gallery photos and return the asset._ref
  const galleryPhotosRefs = galleryPhotos?.map((photo) => photo.asset._ref);
  // console.log('🚀 ~ Gallery ~ galleryPhotosRefs:', galleryPhotosRefs);

  // const blurredPhotos = await blurredImgUrl(galleryPhotos);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>
          -{gallery.title}-
        </h1>

        {/* Sub Container  */}
        <section className='flex w-full flex-col items-center justify-center px-8 '>
          <p>{gallery.snippet}</p>

          <p>Photographed By: {gallery.author.name}</p>
          <p>{gallery.tripDate}</p>

          {/* Gallery Photos */}
          <div className='grid h-full w-full auto-rows-[15px] grid-cols-4 justify-center py-4'>
            {galleryPhotos?.map((photo) => {
              const refString = photo.asset._ref;
              const resolutionParts = refString.split('-')[2].split('x');
              const width = parseInt(resolutionParts[0]);
              const height = parseInt(resolutionParts[1]);

              const aspectRatio = height / width;

              const galleryHeight = Math.ceil(250 * aspectRatio);

              const photoSpans = Math.round(galleryHeight / 10) + 1;

              return (
                <div
                  key={photo.asset._ref}
                  className='w-[375px] justify-self-center'
                  style={{ gridRowEnd: `span ${photoSpans}` }}
                >
                  <Link
                    href={urlForImage(photo as any)?.url() || ''}
                    target='_blank'
                    className='grid-place-content-center'
                  >
                    <div className='group overflow-hidden'>
                      <Image
                        src={urlForImage(photo as any)?.url() || ''}
                        width={375}
                        height={galleryHeight}
                        sizes='375px'
                        alt='gallery photo'
                        // placeholder='blur'
                        // blurDataURL={photo.blurDataURL}
                        className='group:hover-opacity-50 w-full rounded-md transition-all duration-75 ease-in-out'
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Blog List filtered by category
async function getGalleryBySlug(slug: string) {
  try {
    // Fetch blog data from Sanity
    const gallery = await sanityFetch({
      query: queryGalleryBySlug,
      tags: ['gallery-categories'],
      params: {
        slug: slug, // Pass the slug parameter to the query
      },
    });
    // console.log('🚀 ~ getGalleryBySlug ~ queryGalleryBySlug:', queryGalleryBySlug);
    // console.log('🚀 ~ getGalleryBySlug ~ slug:', slug);

    // console.log('🚀 ~ getGalleryListByCategory ~ gallery:', gallery);
    return gallery;
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}
