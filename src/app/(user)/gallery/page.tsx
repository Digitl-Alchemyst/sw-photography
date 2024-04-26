import sanityFetch from '@/lib/sanity/fetch';
import { queryGalleryCategories } from '@/lib/sanity/queries';
import Image from 'next/image';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import resolveHref from '@/lib/util/resolveHref';
import formatCategoryTitle from '@/l/util/formatTitleForURL';
import urlForImage from '@/lib/util/urlForImage';
import { Aerotis, headerFontStyle } from '@/lib/util/headerFontStyles';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: `Photography Galleries | SW Photography`,
  description:
    'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
  keywords:
    'Photographer, Portfolio, Contact, Steven Watkins, Steven Watkins Photography, Landscape Photographer, Photojournalist, Photography, Journalist Landscape Photography, Journalist Photography, Photographer Landscape Photography, Colorado Photographer, Colorado Landscape Photography, Colorado Journalist, Colorado Photography',
};
export default async function Portfolio() {
  const galleries = await getGalleryListByCategory();
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400 '>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l  from-steelpolished-300/10 to-steeldark-900  px-10 py-12'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
          - Galleries -
        </h1>
        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          <section className='grid w-full grid-cols-1 grid-rows-2 items-center justify-center gap-x-8 gap-y-8 lg:grid-cols-2 dxl:grid-cols-3'>
            {galleries.map((gallery, index) => (
              <ClientSideRoute
                route={resolveHref('gallerycategory', formatCategoryTitle(gallery.title)) || ''}
                key={index}
              >
                <div className=' flex w-full flex-col items-center space-y-8 rounded-md border border-steeldark-400 bg-steelpolished-600/20 px-6 py-4 shadow-2xl shadow-steeldark-800 drop-shadow-lg'>
                  <h2
                    className={`${Aerotis.className} text-4xl text-steelpolished-400 underline decoration-steelpolished-600 underline-offset-4 lg:text-xl xl:text-2xl dxl:text-3xl xxl:text-4xl`}
                  >
                    {gallery.title}
                  </h2>
                  <div className='relative h-72 w-full md:h-64 lg:h-42 xl:h-62 dxl:h-72 xxl:h-98'>
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
