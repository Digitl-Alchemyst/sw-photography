/* eslint-disable react/function-component-definition */
import sanityFetch from '@/lib/sanity/fetch';
import { queryBlogListByCategory } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import BlogCategories from '@/components/global/BlogCategories';
import BlogCard from '@/c/cards/BlogCard';
import { client } from '@/l/sanity/client';
import { groq } from 'next-sanity';
import resolveHref from '@/lib/util/resolveHref';


export { generateMetadata } from '@/lib/util/generateBlogCatMetadata';

// Invalid page type: blogCategory


type Props = {
  params: {
    slug: string;
  };
};



export default async function BlogCategoryPage({ params: { slug } }: Props) {
  const blogs = await getBlogListByCategory(slug);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10 py-12'>
        <h1 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Blog -
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
            {/* Null check for blogs array  */}
            {blogs && Array.isArray(blogs) ? (
              // optional chaining for length of the array
              blogs?.length > 0 ? (
                // If there are blog posts, map through the BlogCard component for each blog post
                <BlogCard blogs={blogs} />
              ) : (
                // If there are no blog posts, render a message
                <div className='flex w-full flex-col items-center justify-center space-y-4'>
                  <h1 className='text-center text-3xl'>There are no blog posts at this time.</h1>
                  <p className='text-lg'>Please check back again later.</p>
                </div>
              )
            ) : null}
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
      params: { slug },
      tags: ['blogCategory', 'blog'],
    });
    return blogs || [];
  } catch (error) {
    console.error('Failed to fetch blog categories:', error);
    return []; // Return an empty array in case of an error
  }
}

// Generate the static params for the blog category list
export async function generateStaticParams() {
  const query = groq`*[_type=='blogCategory'] { slug }`;
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug: { slug: { current: any } }) => slug.slug.current);

  return slugRoutes.map((slug: string | undefined) => ({
    slug,
    path: resolveHref('blog', slug),
  }));
}


