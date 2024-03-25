import Image from 'next/image';
import React from 'react';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import urlForImage from '@/u/urlForImage';
import { ArrowUpRightIcon, ShareIcon } from '@heroicons/react/24/solid';

type Props = {
  blogs: Blog[] | undefined;
};
function BlogCard({ blogs }: Props) {
  if (!blogs) {
    return null;
  }

  return (
    <div>
      {/* Map through BlogPost */}
      {blogs.map((post) => (
        // CLient Side Route Link Wrapper
        <ClientSideRoute route={`/blog/${post.slug?.current}`} key={post._id}>
          {/* Blog Card  */}
          <div className='group flex w-90 cursor-pointer flex-col rounded-md border border-steelflat-400 bg-steelpolished-600/40 px-6 py-4 text-steelpolished-300 shadow-2xl  shadow-steeldark-700/40 drop-shadow-lg'>
            {/* Image Title & Category */}
            <div className='relative h-98 w-full drop-shadow-xl transition-transform duration-200 ease-out group-hover:scale-105'>
              {/* Image  */}
              <Image
                className='rounded-t-md object-cover object-center drop-shadow-xl lg:object-center'
                src={urlForImage(post.mainImage).url()}
                fill
                alt={post.author.name}
              />

              {/* Title Category Bar  */}
              <div className='absolute bottom-0 flex w-full justify-between rounded-t bg-slate-900 bg-opacity-20 px-5 py-2 text-steelpolished-200 drop-shadow-lg backdrop-blur-lg'>
                {/* Title  */}
                <div>
                  <h2 className='text-lg font-semibold text-steelflat-300 lg:text-lg'>
                    {post.title}
                  </h2>
                </div>

                {/* Cateogy  */}
                <div className='flex flex-col items-center gap-y-2 md:flex-row md:gap-x-2'>
                  {post.blogCategories &&
                    post.blogCategories.map((blogCategory) => (
                      <div
                        key={blogCategory._id}
                        className='hidden rounded-lg border border-steeldark-900 bg-accent/70 px-5 py-2 text-center text-xs font-light text-steeldark-900 md:flex lg:text-sm'
                      >
                        <p className='text-2xl'>{blogCategory.title}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Article Info */}
            <div className='mt-0 flex-1 rounded-b-md bg-slate-400'>
              <div className='flex flex-col space-y-1 p-1'>
                <h3 className='text-sm font-semibold md:text-lg text-steeldark-700'>
                  By: {post.author.name}
                </h3>
                <h4 className='text-sm font-light text-steeldark-400 md:text-base'>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h4>
              </div>
              <p className='line-clamp-3 px-2 py-1 text-sm'>{post.snippet}</p>
            </div>
            <div className='flex justify-end mr-6 drop-shadow-sm'>
              <p className='ml-4 mt-3 flex items-center font-bold group-hover:underline'>
                Read Article
                <ArrowUpRightIcon className='group ml-2 h-4 w-4' />
              </p>

              {/* <ShareIcon className='mr-4 mt-4 h-6 w-6 transition-transform duration-200 ease-out hover:scale-110 hover:text-untele' /> */}
            </div>
          </div>
        </ClientSideRoute>
      ))}
    </div>
  );
}

export default BlogCard;
