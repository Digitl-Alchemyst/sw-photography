import BlogCard from '@/components/cards/BlogCard'
import React from 'react'
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import BlogCategories from '@/components/blog/BlogCategories';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});


const queryBlog = groq`
  *[_type=='blog'] {
    ...,
    author->,
    categories[]->,
    publistedAt,
    description,
    title,
    slug,
    tripDate,    
  } 
  | order(_createdAt desc)
`;
export default async function Blog() {

  const blogs = await client.fetch(queryBlog);

  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10  py-12'>
        {/* Header */}
        <h1
          className={`text-center text-7xl font-bold ${scriptFont.className}`}
        >
          -Blog-
        </h1>
        {/* Sub Container  */}
        <div>
        <BlogCategories />
        <hr className='border-accent mb-8' />
        <section className='mx-auto mt-8 grid grid-cols-1 gap-8 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {blogs && blogs.length > 0 && <BlogCard blogs={blogs} />}
        </section>
        </div>
      </div>
    </main>
  );
}

