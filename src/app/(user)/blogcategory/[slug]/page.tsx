/* eslint-disable react/function-component-definition */
import sanityFetch from '@/lib/sanity/fetch';
import { queryBlogListByCategory } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import BlogCategories from '@/components/global/BlogCategories';
import BlogCard from '@/c/cards/BlogCard';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 18;
export const fetchCache = 'no-store';

export default async function BlogCategoryPage({ params: { slug } }: Props) {
  const blogs = await getBlogListByCategory(slug);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10 py-12'>
        <h1 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          -Blog-
        </h1>
        <div>
          <BlogCategories />
          <hr className='mb-8 border-accent' />
          <section
            className={
              (blogs as Blog[]).length > 0
                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 dxl:gap-y-10 xxl:grid-cols-4 mxl:grid-cols-5'
                : 'mx-auto mt-8 w-full px-2 pb-24 xl:px-10'
            }
          >
            {/* Conditional rendering based on the presence of blog posts */}
            {blogs && Array.isArray(blogs) && blogs.length > 0 ? (
              // If there are blog posts, map through the BlogCard component for each blog post
              <BlogCard blogs={blogs} />
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
async function getBlogListByCategory(slug: string) {
  try {
    // Fetch blog data from Sanity
    const blogs = await sanityFetch({
      query: queryBlogListByCategory,
      params: {
        slug: slug, // Pass the slug parameter to the query
      },
      tags: ['blog-list'],
    });

    return blogs;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return []; // Return an empty array in case of an error
  }
}