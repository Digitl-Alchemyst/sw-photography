import BlogCard from '@/components/cards/BlogCard'
import React from 'react'
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});
function Blog() {
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10  py-12'>
        {/* Header */}
        <h1
          className={`text-center text-7xl font-bold ${scriptFont.className}`}
        >
          -Blog-
        </h1>
        {/* Sub Container  */}
        <section className='mx-auto mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </section>
      </div>
    </main>
  );
}

export default Blog