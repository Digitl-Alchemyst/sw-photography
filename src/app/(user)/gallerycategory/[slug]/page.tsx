/* eslint-disable react/function-component-definition */
import sanityFetch from '@/lib/sanity/fetch';
import { queryGalleryListByCategory } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import SubGalleryCard from '@/c/cards/SubGalleryCard';
import { client } from '@/l/sanity/client';
import { groq } from 'next-sanity';
import resolveHref from '@/lib/util/resolveHref';


export { generateMetadata } from '@/lib/util/generateGalleryCatMetadata';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;
export const fetchCache = 'no-store';
// export const dynamic = 'force-dynamic';

export default async function GalleryCategoryPage({ params: { slug } }: Props) {
  const galleries = await getGalleryListByCategory(slug);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 py-12'>
        <h1 className={`text-center text-7xl font-bold capitalize ${headerFontStyle.className}`}>
          - {slug} Galleries -
        </h1>

        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          <section
            className={
              (galleries as Gallery[]).length > 0
                ? 'flex w-full flex-col items-center justify-center'
                : 'mx-auto mt-8 pb-24'
            }
          >
            {/* Conditional rendering based on the presence of blog posts */}
            {galleries && Array.isArray(galleries) && galleries.length > 0 ? (
              // If there are blog posts, map through the BlogCard component for each blog post
              <SubGalleryCard galleries={galleries} />
            ) : (
              // If there are no blog posts, render a message
              <div className='flex w-full flex-col items-center justify-center space-y-4'>
                <h1 className='text-center text-3xl'>There are no blog posts at this time.</h1>
                <p className='text-lg'>Please check back again later.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Blog List filtered by category
async function getGalleryListByCategory(slug: string) {
  try {
    // Fetch blog data from Sanity
    const galleries = await sanityFetch({
      query: queryGalleryListByCategory,
      params: {
        slug: slug, // Pass the slug parameter to the query
      },
      tags: ['blog-list'],
    });

    return galleries;
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}

// Generate the static params for the gallery category list
export async function generateStaticParams() {
  const query = groq`*[_type=='galleryCategory']
    {
      slug
    }`;

  const slugs: Gallery[] = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];

  return slugRoutes.map((slug) => ({
    slug,
    path: resolveHref('gallery', slug),
  }));
}
