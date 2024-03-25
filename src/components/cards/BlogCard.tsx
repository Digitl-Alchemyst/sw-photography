import Image from 'next/image';
import React from 'react';

function BlogCard() {
  return (
    <div className='flex flex-col space-y-2 rounded-md bg-steelpolished-600/40 px-6 py-4 text-steelpolished-300 shadow-2xl'>
      <div className='relative h-98 w-full'>
        <Image
          src='/blog/blog.jpg'
          alt='blog-image'
fill
          className='object-center rounded-md object-cover drop-shadow-xl transition-transform duration-200 ease-out hover:scale-105'
        />
      </div>
      <div>
        <h2 className='text-lg font-semibold text-steelflat-300'>$Title</h2>
        <h3 className='text-md font-light text-steelflat-400'>$Date</h3>
      </div>
      <p className='text-sm'>
        This is a snippet of the blog post it should only be 3 lines long
        $Snippet
      </p>
    </div>
  );
}

export default BlogCard;
