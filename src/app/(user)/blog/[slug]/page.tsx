/* eslint-disable react/function-component-definition */
import Image from 'next/image';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/components/providers/RichTextComponents';
import SocialShare from '@/components/global/SocialShare';
import { client } from '@/lib/sanity/sanity.client';
import urlForImage from '@/lib/util/urlForImage';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import { sanityFetch } from '@/lib/sanity/sanity.fetch';
import { queryBlogPostBySlug } from '@/lib/sanity/sanity.queries';

export { generateMetadata } from '@/lib/util/generateMetadata';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;
export const fetchCache = 'force-cache';
// export const dynamic = 'force-dynamic';

export default async function Article({ params: { slug } }: Props) {
  const post = (await getBlogPostBySlug(slug)) as Blog;

  return (
    <>
      <hr className='border-untele mx-auto mb-8 max-w-[95wv] md:max-w-[85vw]' />
      <article className='mx-auto max-w-[95vw] pb-28 md:max-w-[85vw] lg:px-10'>
        <section className='border-untele/80 space-y-2 rounded-md border text-slate-200 shadow-md'>
          <div className='relative flex min-h-96 flex-col justify-between md:flex-row'>
            <div className='absolute top-0 h-full w-full p-10 opacity-25 blur-sm'>
              {/* Header Image  */}
              <Image
                className='-z-1 mx-auto object-cover object-center'
                src={urlForImage(post.mainImage as any)?.url() || ''}
                fill
                alt=''
              />
            </div>

            {/* Header Info  */}
            <section className='bg-untele/40 relative w-full p-5'>
              <div className='flex flex-col justify-between md:flex-row'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold'>{post.title}</h1>
                  <div>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <ClientSideRoute
                    route={`/author/${post.author.slug?.current}`}
                  >
                    <div className='flex items-center justify-start space-x-3 py-2'>
                      <Image
                        className='rounded-full object-cover object-center'
                        src={
                          urlForImage(post.author.authorImage as any)?.url() ||
                          ''
                        }
                        width={50}
                        height={50}
                        alt=''
                      />
                      <h3 className='text-lg font-semibold'>
                        {post.author.name}
                      </h3>
                    </div>
                  </ClientSideRoute>
                </div>
              </div>

              <div className='flex items-center'>
                <h2 className='mt-6 italic'>{post.snippet}</h2>
                <div className='mt-auto flex items-center justify-end space-x-2'>
                  {post.blogCategories &&
                    post.blogCategories.map((category) => (
                      <div
                        key={category._id}
                        className='border-untele text-untele max-w-[160px] rounded-xl border bg-slate-900/80 px-5 py-2 text-center text-xs font-semibold lg:text-sm'
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </section>

        <SocialShare
          url={`https://untelevised.media/post/${slug}`}
          title={post.title}
        />

        <div className='mt-4 flex justify-center'>
          <Image
            src={urlForImage(post.mainImage as any)?.url() || ''}
            alt='description'
            sizes='80vw'
            style={{
              width: '65%',
              height: 'auto',
            }}
            width={300}
            height={300}
            className='rounded-lg'
          />
        </div>
        {post.hasEmbeddedVideo && (
          <div className='my-4 flex items-center justify-center'>
            <iframe
              width='720'
              height='420'
              className='border-untele rounded-lg border bg-slate-700/30'
              src={`${post.videoLink}`}
              title='YouTube video player'
              // allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
            />
          </div>
        )}
        <section className='border-untele mx-auto mt-12 max-w-[85vw] rounded-lg border bg-slate-700/30 px-10 py-5 md:max-w-[70vw]'>
          <PortableText value={post.body} components={RichTextComponents} />
        </section>
      </article>
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
