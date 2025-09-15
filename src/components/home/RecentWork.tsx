import sanityFetch from '@/lib/sanity/fetch';
import { queryBlogList, queryGalleryCategories } from '@/lib/sanity/queries';
import { headerFontStyle, Aerotis } from '@/lib/util/headerFontStyles';
import urlForImage from '@/lib/util/urlForImage';
import resolveHref from '@/lib/util/resolveHref';
import formatDate from '@/lib/util/formatDate';
import formatCategoryTitle from '@/lib/util/formatTitleForURL';
import ClientSideRoute from '@/components/providers/ClientSideRoute';
import Image from 'next/image';

export default async function RecentWork() {
  const [recentBlogs, recentGalleries] = await Promise.all([
    getRecentBlogs(),
    getRecentGalleries()
  ]);

  // Combine and limit recent work items
  const recentBlogs3 = recentBlogs.slice(0, 3);
  const recentGalleries3 = recentGalleries.slice(0, 3);

  return (
    <section className='w-full bg-steeldark-700 text-steelpolished-400'>
      {/* Main Container */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-r from-steeldark-900 to-steelpolished-300/10 px-6 py-16 xl:px-30'>
        {/* Heading */}
        <h2 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Recent <span className='text-accent'>Work</span> -
        </h2>

        <div className='w-full'>
          <hr className='mb-12 border-accent' />
          
          {/* Recent Work Grid */}
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
            
            {/* Recent Blog Posts */}
            {recentBlogs3.length > 0 && (
              <div className='space-y-8'>
                <h3 className={`text-center text-3xl font-bold text-accent lg:text-4xl ${Aerotis.className}`}>
                  Latest Stories
                </h3>
                <div className='space-y-6'>
                  {recentBlogs3.map((blog, index) => (
                    <ClientSideRoute
                      route={resolveHref('blog', blog.slug.current) || ''}
                      key={index}
                    >
                      <div className='group flex cursor-pointer space-x-4 rounded-lg border border-steeldark-400 bg-steelpolished-600/20 p-4 shadow-lg transition-all duration-300 hover:bg-steelpolished-600/30 hover:shadow-xl'>
                        {/* Blog Image */}
                        <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md'>
                          <Image
                            src={urlForImage(blog.mainImage as any)?.url() || ''}
                            fill
                            sizes='80px'
                            alt={blog.title}
                            className='object-cover transition-transform duration-300 group-hover:scale-110'
                          />
                        </div>
                        
                        {/* Blog Content */}
                        <div className='flex-1 space-y-2'>
                          <h4 className='text-lg font-semibold text-steelpolished-300 transition-colors duration-300 group-hover:text-accent line-clamp-2'>
                            {blog.title}
                          </h4>
                          <p className='text-sm text-steelpolished-400 line-clamp-2'>
                            {blog.snippet}
                          </p>
                          <p className='text-xs text-steelpolished-500'>
                            {formatDate(blog._createdAt)}
                          </p>
                        </div>
                      </div>
                    </ClientSideRoute>
                  ))}
                </div>
                
                {/* View All Blogs Link */}
                <div className='flex justify-center'>
                  <ClientSideRoute route='/blog'>
                    <button className='text-accent hover:text-steelpolished-300 transition-colors duration-300 underline underline-offset-4'>
                      View All Stories →
                    </button>
                  </ClientSideRoute>
                </div>
              </div>
            )}

            {/* Recent Galleries */}
            {recentGalleries3.length > 0 && (
              <div className='space-y-8'>
                <h3 className={`text-center text-3xl font-bold text-accent lg:text-4xl ${Aerotis.className}`}>
                  Latest Collections
                </h3>
                <div className='space-y-6'>
                  {recentGalleries3.map((gallery, index) => (
                    <ClientSideRoute
                      route={resolveHref('gallerycategory', formatCategoryTitle(gallery.title)) || ''}
                      key={index}
                    >
                      <div className='group flex cursor-pointer space-x-4 rounded-lg border border-steeldark-400 bg-steelpolished-600/20 p-4 shadow-lg transition-all duration-300 hover:bg-steelpolished-600/30 hover:shadow-xl'>
                        {/* Gallery Image */}
                        <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md'>
                          <Image
                            src={urlForImage(gallery.featuredImage as any)?.url() || ''}
                            fill
                            sizes='80px'
                            alt={gallery.title}
                            className='object-cover transition-transform duration-300 group-hover:scale-110'
                          />
                        </div>
                        
                        {/* Gallery Content */}
                        <div className='flex-1 space-y-2'>
                          <h4 className='text-lg font-semibold text-steelpolished-300 transition-colors duration-300 group-hover:text-accent'>
                            {gallery.title}
                          </h4>
                          <p className='text-sm text-steelpolished-400 line-clamp-2'>
                            {gallery.description || 'Explore this stunning collection of photographs'}
                          </p>
                        </div>
                      </div>
                    </ClientSideRoute>
                  ))}
                </div>
                
                {/* View All Galleries Link */}
                <div className='flex justify-center'>
                  <ClientSideRoute route='/gallery'>
                    <button className='text-accent hover:text-steelpolished-300 transition-colors duration-300 underline underline-offset-4'>
                      View All Collections →
                    </button>
                  </ClientSideRoute>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Fetch recent blog posts
async function getRecentBlogs(): Promise<Blog[]> {
  try {
    const blogs: Blog[] = await sanityFetch({
      query: queryBlogList,
      tags: ['blog'],
    });
    return blogs;
  } catch (error) {
    console.error('Failed to fetch recent blogs:', error);
    return [];
  }
}

// Fetch recent galleries
async function getRecentGalleries(): Promise<galleryCategory[]> {
  try {
    const galleries: galleryCategory[] = await sanityFetch({
      query: queryGalleryCategories,
      tags: ['galleryCategory'],
    });
    return galleries.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch recent galleries:', error);
    return [];
  }
}
