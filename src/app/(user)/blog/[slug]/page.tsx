import Image from 'next/image';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/components/providers/RichTextComponents';
import SocialShare from '@/components/global/SocialShare';
import { client } from '@/l/sanity/client';
import urlForImage from '@/l/util/urlForImage';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import sanityFetch from '@/l/sanity/fetch';
import { queryBlogPostBySlug } from '@/l/sanity/queries';
import resolveHref from '@/l/util/resolveHref';
import formatDate from '@/l/util/formatDate';

export { generateMetadata } from '@/l/util/generateMetadata';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;
export const fetchCache = 'no-store';
// export const dynamic = 'force-dynamic';

export default async function Article({ params: { slug } }: Props) {
  const post = (await getBlogPostBySlug(slug)) as Blog;
  // console.log("🚀 ~ Article ~ post:", post)

  return (
    <>
      <main className='w-full bg-steeldark-600 text-steelpolished-300 '>
        <article className='flex w-full flex-col items-center justify-center bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 py-8'>
          {/* Title  */}
          <div className='w-full px-16'>
            <div className='px-4'>
              <h1 className='text-lg font-bold text-accent/80 lg:text-xl xl:text-2xl dxl:text-3xl'>
                {post.title}
              </h1>

              {/* Social Media Share Icons  */}
              <SocialShare
                url={`https://sw-photography.vercel.app/blog/${slug}`}
                title={post.title}
              />
            </div>
            <hr className='mb-8 mt-5 w-full border-accent ' />
          </div>

          {/* Article Headline  */}
          <section className='min-h-76 relative flex w-3/5 flex-col justify-between rounded-md border border-accent/80 shadow-md md:flex-row'>
            {/* Header Image  */}
            <div className='absolute top-0 h-full w-full p-10 opacity-25 blur-md'>
              <Image
                className='-z-1 mx-auto object-cover object-center'
                src={urlForImage(post.mainImage as any)?.url() || ''}
                fill
                alt=''
              />
            </div>

            {/* Headline Content  */}
            <section className='relative w-full space-y-2 bg-accent/20 p-5'>
              {/* Author & Category  */}
              <div className='flex flex-col xs:flex-row items-center justify-between'>
                {/* Author Profile Link  */}
                <ClientSideRoute route={resolveHref('author', post.author.slug?.current) || ''}>
                  <div className='flex items-center justify-start space-x-3 py-2'>
                    <Image
                      className='rounded-full object-cover object-center'
                      src={urlForImage(post.author.authorImage as any)?.url() || ''}
                      width={65}
                      height={65}
                      alt=''
                    />
                    <div className='flex flex-col'>

                    <p className='text-sm lg:text-base'>Written By:</p>
                    <h3 className='lg:text-xl font-semibold'>{post.author.name}</h3>
                    </div>
                  </div>
                </ClientSideRoute>

                {/* Article Category  */}
                <div className=' flex space-x-2'>
                  {post.blogCategories &&
                    post.blogCategories.map((category) => (
                      <div
                        key={category._id}
                        className='max-w-[260px] rounded-xl border border-accent2 bg-slate-900/80 px-3 py-2  text-xs font-semibold text-accent lg:text-sm'
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Article Date  */}
              <div className='space-y-1'>
                <p className=' text-steelpolished-600'>{formatDate(post._createdAt)}</p>
                {/* Post Read Time  */}
                {post.readTime && (
                  <p className='text-sm font-light text-steelflat-500'>{post.readTime} Read</p>
                )}
              </div>

              <p className='mt-6 px-2 italic text-xs xs:text-sm md:text-base'>{post.snippet}</p>
            </section>
          </section>

          {/* Article Main Image  */}
          {/* TODO: Add Light Box  */}
          <div className='mt-4 flex justify-center'>
            <Image
              src={urlForImage(post.mainImage as any)?.url() || ''}
              alt='description'
              sizes='80vw'
              style={{
                width: '75%',
                height: 'auto',
              }}
              width={300}
              height={300}
              className='rounded-lg'
            />
          </div>

          {/* Article Video  */}
          {post.hasEmbeddedVideo && (
            <div className='my-4 flex items-center justify-center neon-sky'>
              <iframe
                width='720'
                height='420'
                className='rounded-lg border border-accent bg-steeldark-700/30'
                src={`https://www.youtube.com/embed/${post.videoLink}`}
                title='YouTube video player'
                allow='autoplay; clipboard-write; picture-in-picture; web-share; fullscreen'
              />
            </div>
          )}

          {/* Article Body  */}
          <section className='mx-auto mt-12 max-w-[85vw] rounded-lg border border-accent bg-steelflat-500/30 px-10 py-5 md:max-w-[70vw]'>
            <PortableText value={post.body} components={RichTextComponents} />
          </section>
        </article>
      </main>
    </>
  );
}

// Call the Sanity Fetch Function for the Blog List
async function getBlogPostBySlug(slug: string) {
  // Fetch blog data from Sanity
  const post = await sanityFetch({
    query: queryBlogPostBySlug,
    params: {
      slug: slug, // Pass the slug parameter to the query
    },
    tags: ['blog-list'],
  });

  return post;
}

// Generate the static params for the blog list
export async function generateStaticParams() {
  const query = groq`*[_type=='blog']
    {
      slug
    }`;

  const slugs: Blog[] = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];

  return slugRoutes.map((slug) => ({
    slug,
  }));
}
