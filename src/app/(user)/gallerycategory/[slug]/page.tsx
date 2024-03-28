/* eslint-disable react/function-component-definition */
import sanityFetch from '@/lib/sanity/fetch';      
import { queryBlogListByCategory, queryGalleryListByCategory } from '@/lib/sanity/queries';
import BlogCard from '@/c/cards/BlogCard';
import BlogCategories from '@/components/nav/BlogCategories';
import { headerFontStyle } from '@/l/util/headerFontStyles';
import SubGalleryCard from '@/components/cards/SubGalleryCard';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 18;

export default async function GalleryCategoryPage({ params: { slug } }: Props) {
  const galleries = await getGalleryListByCategory(slug);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10 py-12'>
        <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
          -Gallery Name-
        </h1>
        <div>
          <hr className='mb-8 border-accent' />
          <section
            className={
              (galleries as Blog[]).length > 0
                ? 'grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3'
                : 'mx-auto mt-8  px-10 pb-24'
            }
          >
            {/* Conditional rendering based on the presence of blog posts */}
            {galleries && Array.isArray(galleries) && galleries.length > 0 ? (
              // If there are blog posts, map through the BlogCard component for each blog post
              galleries.map((index) => <SubGalleryCard blogs={galleries} key={index} />)
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
