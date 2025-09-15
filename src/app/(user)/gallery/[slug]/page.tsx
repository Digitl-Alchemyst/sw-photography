import { client } from '@/l/sanity/client';
import { queryGalleryBySlug } from '@/lib/sanity/queries';
import sanityFetch from '@/lib/sanity/fetch';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import formatDate from '@/lib/util/formatDate';
import { groq } from 'next-sanity';
import resolveHref from '@/lib/util/resolveHref';
import GalleryTypeRouter from '@/components/gallery/GalleryTypeRouter';
import { PopulatedGallery } from '@/types/gallery';
import {
  getGalleryDisplayTitle,
  getGalleryTypeMetadata,
  getGalleryStats,
} from '@/lib/gallery/galleryUtils';
// import blurredImgUrl from '@/lib/util/getBase64';

export { generateMetadata } from '@/lib/util/generateGalleryMetadata';

type Props = {
  params: {
    slug: string;
  };
};

export default async function Gallery({ params: { slug } }: Props) {
  const gallery = (await getGalleryBySlug(slug)) as PopulatedGallery;

  if (!gallery) {
    return (
      <main className='w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='mx-auto flex h-64 w-full items-center justify-center'>
          <p>Gallery not found.</p>
        </div>
      </main>
    );
  }

  const typeMetadata = getGalleryTypeMetadata(gallery);
  const stats = getGalleryStats(gallery);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-8 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-4 py-6'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <div className='flex items-center justify-center gap-3'>
            <span className='text-4xl'>{typeMetadata.icon}</span>
            <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
              - {gallery.title} -
            </h1>
          </div>
          <div className='text-lg text-steelpolished-500'>
            {typeMetadata.type} • {stats.totalPhotos} photos
            {stats.printablePhotos > 0 && ` • ${stats.printablePhotos} available for print`}
          </div>
        </div>

        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          {/* Sub Container  */}
          <section className='mx-auto flex w-full flex-col items-center justify-center px-8'>
            {/* Gallery Info */}
            <div className='mb-6 flex w-full items-start justify-between px-6 py-4'>
              <div className='space-y-2'>
                <p>
                  <strong>Photographed By:</strong> {gallery.author?.name}
                </p>
                {gallery.tripDate && (
                  <p>
                    <strong>Date:</strong> {formatDate(gallery.tripDate)}
                  </p>
                )}
                {gallery.galleryCategories && gallery.galleryCategories.length > 0 && (
                  <p>
                    <strong>Categories:</strong>{' '}
                    {gallery.galleryCategories.map((cat) => cat.title).join(', ')}
                  </p>
                )}
              </div>
              <div className='max-w-md text-right'>
                {gallery.snippet && <p className='text-steelpolished-500'>{gallery.snippet}</p>}
              </div>
            </div>

            {/* Gallery Photos */}
            <GalleryTypeRouter gallery={gallery} className='w-full' />
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
      tags: ['gallery'],
      params: {
        slug: slug, // Pass the slug parameter to the query
      },
    });
    return gallery;
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}

// Generate the static params for the gallery list
export async function generateStaticParams() {
  const query = groq`*[_type=='gallery'] { slug }`;
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug: { slug: { current: any } }) => slug.slug.current);

  return slugRoutes.map((slug: string | undefined) => ({
    slug,
  }));
}
