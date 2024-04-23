import { queryGalleryBySlug } from '@/lib/sanity/queries';
import sanityFetch from '@/lib/sanity/fetch';
import Image from 'next/image';
import Link from 'next/link';
import urlForImage from '@/lib/util/urlForImage';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import formatDate from '@/lib/util/formatDate';
// import blurredImgUrl from '@/lib/util/getBase64';

type Props = {
  params: {
    slug: string;
  };
};

export default async function Gallery({ params: { slug } }: Props) {
  const gallery = (await getGalleryBySlug(slug)) as Gallery;
  const galleryPhotos = gallery.galleryPhotos;

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-8 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-4 py-6'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
          - {gallery.title} -
        </h1>
        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          {/* Sub Container  */}
          <section className='mx-auto flex w-full flex-col items-center justify-center px-8 '>
            <div className='flex w-full items-center justify-between px-6 py-4'>
              <div>
                <p>Photographed By: {gallery.author.name}</p>
                <p>
                  {formatDate(gallery.tripDate)}
                  {}
                </p>
              </div>
              <p>{gallery.snippet}</p>
            </div>

            {/* Gallery Photos */}
            <div className='grid h-full w-full auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 xxl:grid-cols-4'>
              {galleryPhotos?.map((photo) => {
                const refString = photo.asset._ref;
                const resolutionParts = refString.split('-')[2].split('x');
                const width = parseInt(resolutionParts[0]);
                const height = parseInt(resolutionParts[1]);

                const aspectRatio = height / width;

                const galleryHeight = Math.ceil(170 * aspectRatio);

                const photoSpans = Math.round(galleryHeight / 10) + 1;

                return (
                  <div
                    key={photo.asset._ref}
                    className='flex justify-center'
                    style={{ gridRowEnd: `span ${photoSpans}` }}
                  >
                    <Link
                      href={urlForImage(photo as any)?.url() || ''}
                      target='_blank'
                      className='grid-place-content-center'
                    >
                      <div className='group overflow-hidden '>
                        <Image
                          src={urlForImage(photo as any)?.url() || ''}
                          width={535}
                          height={galleryHeight}
                          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          alt='gallery photo'
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
