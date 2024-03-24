import Image from 'next/image';
import React from 'react';

function BlogCard() {
  return (
    <div className='flex flex-col space-y-2 rounded-md bg-steelpolished-600 px-4 py-2 shadow-2xl'>
      <Image src='/blog/blog.jpg' alt='blog-image' width={500} height={300} />
      <div>
        <h2>$Title</h2>
        <h3>$Date</h3>
      </div>
      <p>
        This is a snippet of the blog post it should only be 3 lines long
        $Snippet
      </p>
    </div>
  );
}

export default BlogCard;
