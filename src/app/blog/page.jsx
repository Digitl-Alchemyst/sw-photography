import BlogCard from '@/components/cards/BlogCard'
import React from 'react'

function Blog() {
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='flex flex-col bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-8 px-8 py-4 py-6'>
        <h1 className='mx-auto flex w-full items-center justify-center text-4xl'>
          Recent Blog Post
        </h1>
        <div className='mx-auto mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </main>
  );
}

export default Blog