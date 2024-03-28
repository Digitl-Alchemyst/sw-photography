
import React from 'react';
import { Alex_Brush } from 'next/font/google';
import sanityFetch from '@/lib/sanity/fetch';
import { queryBlogListByCategory, queryGalleryCategories } from '@/lib/sanity/queries';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import resolveHref from '@/lib/util/resolveHref';
import formatCategoryTitle from '@/l/util/formatTitleForURL';
import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';
import urlForImage from '@/lib/util/urlForImage';
const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

const Aerotis = localFont({
  //   subsets: ['latin'],
  src: './AEROTIS.ttf',
  weight: '400',
});

export default async function Portfolio() {
  const galleries = await getGalleryListByCategory();
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400 '>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l  from-steelpolished-300/10 to-steeldark-900  px-10 py-12'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>-Gallery-</h1>
        <section className='grid w-full grid-cols-3 grid-rows-2 items-center justify-center gap-x-8 gap-y-8'>
          {galleries.map((gallery, index) => (

              <ClientSideRoute
                route={resolveHref('gallery', formatCategoryTitle(gallery.title)) || ''}
                key={index}
              >
                <div className=' flex w-full flex-col items-center space-y-8 rounded-md border border-steeldark-400 bg-steelpolished-600/20 px-6 py-4 shadow-2xl shadow-steeldark-800 drop-shadow-lg'>
                  <h2
                    className={`${Aerotis.className} text-4xl text-steelpolished-400 underline decoration-steelpolished-600 underline-offset-4`}
                  >
                    {gallery.title}
                  </h2>
                  <div className='relative h-98 w-full'>
                    <Image
                      src={urlForImage(gallery.featuredImage as any)?.url() || ''}
                      fill
                      alt='Gallery 1'
                      className='rounded-md object-cover object-center transition-transform duration-200 ease-out hover:scale-105'
                    />
                  </div>
                </div>
              </ClientSideRoute>
          ))}
        </section>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Blog List filtered by category
async function getGalleryListByCategory() {
  try {
    // Fetch blog data from Sanity
    const galleries: galleryCategory[] = await sanityFetch({
      query: queryGalleryCategories,
      tags: ['gallery-categories'],
    });

    return galleries.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}
