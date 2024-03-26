import { sanityFetch } from '@/l/sanity.fetch';
import { queryBlogList } from '@/l/sanity.queries';
import BlogCategories from '@/c/nav/BlogCategories';
import BlogCard from '@/c/cards/BlogCard';
import { headerFontStyle } from '@/l/util/headerFontStyles';

export const revalidate = 60;
export const fetchCache = 'force-cache';
// export const dynamic = 'force-dynamic';
export default async function Blog() {
  
const blogs = await getBlogList();
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10  py-12'>
        {/* Header */}
        <h1
          className={`text-center text-7xl font-bold ${headerFontStyle.className}`}
        >
          -Blog-
        </h1>
        {/* Sub Container  */}
        <div>
          <BlogCategories />
          <hr className='mb-8 border-accent' />
          <section className='mx-auto mt-8 grid grid-cols-1 gap-8 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 lg:grid-cols-3'>
            {/* Conditional rendering based on the presence of blog posts */}
            {blogs && blogs.length > 0 ? (
              // If there are blog posts, render the BlogCard component for each blog post
              <BlogCard blogs={blogs} key={blogs._id} />
            ) : (
              // If there are no blog posts, render a message
              <div className='flex flex-col items-center justify-center space-y-4'>
                <h1 className='text-center text-3xl'>
                  There are no blog post at this time.
                </h1>
                <p className='text-lg'>Please check back again later.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Blog List
async function getBlogList() {
// Fetch blog data from Sanity
  const blogs = await sanityFetch({
    query: queryBlogList,
    tags: ['blog-list'],
  });

  return blogs
}