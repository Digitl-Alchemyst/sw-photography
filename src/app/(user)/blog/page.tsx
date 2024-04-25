import sanityFetch from '@/l/sanity/fetch';
import { queryBlogList } from '@/l/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import BlogCategories from '@/components/global/BlogCategories';
import BlogCard from '@/c/cards/BlogCard';
import type { Metadata } from 'next';

export const revalidate = 60;
export const fetchCache = 'no-store';
// export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: `Photography Blog | SW Photography`,
  description:
    'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
  keywords:
    'Photographer, Portfolio, Contact, Steven Watkins, Steven Watkins Photography, Landscape Photographer, Photojournalist, Photography, Journalist Landscape Photography, Journalist Photography, Photographer Landscape Photography, Colorado Photographer, Colorado Landscape Photography, Colorado Journalist, Colorado Photography',
};
export default async function Blog() {
  const blogs = await getBlogList();
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10  py-12'>
        {/* Header */}
        <h1 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Blog -
        </h1>

        {/* Sub Container  */}
        <div>
          <BlogCategories />
          <hr className='mb-8 border-accent' />
          <section
            className={
              blogs.length > 0
                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 dxl:gap-y-10 xxl:grid-cols-4 mxl:grid-cols-5'
                : 'mx-auto mt-8  px-2 pb-24 xl:px-10'
            }
          >
            {/* Conditional rendering based on the presence of blog posts */}
            {blogs && blogs.length > 0 ? (
              // If there are blog posts, render the BlogCard component for each blog post
              <BlogCard blogs={blogs} />
            ) : (
              // If there are no blog posts, render a message
              <div className='flex flex-col items-center justify-center space-y-4'>
                <h1 className='text-center text-3xl'>There are no blog post at this time.</h1>
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
async function getBlogList(): Promise<Blog[]> {
  // Fetch blog data from Sanity
  const blogs: Blog[] = await sanityFetch({
    query: queryBlogList,
    tags: ['blog-list'],
  });

  return blogs;
}
