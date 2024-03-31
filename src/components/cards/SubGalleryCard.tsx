import Image from 'next/image';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import urlForImage from '@/u/urlForImage';
import resolveHref from '@/l/util/resolveHref';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import formatDate from '@/l/util/formatDate';

// Assuming Gallery and related types are correctly defined and imported

type Props = {
  galleries: Gallery[] | undefined;
};

function SubGalleryCard({ galleries }: Props) {
  
  return galleries ? (
    <>
      {galleries.map((post) => (
        // console.log(post),
        <ClientSideRoute route={resolveHref('gallery', post.slug.current) || ''} key={post._id}>
          <div className='group flex w-112 cursor-pointer flex-col rounded-md border border-steelflat-400 bg-steelpolished-600/40 px-6 py-4 text-steelpolished-300 shadow-2xl shadow-steeldark-700/40 drop-shadow-lg'>
            <div className='relative h-98 w-full drop-shadow-xl transition-transform duration-200 ease-out group-hover:scale-105'>
              <Image
                className='rounded-t-md object-cover object-center drop-shadow-xl lg:object-center'
                src={urlForImage(post.mainImage as any)?.url() || ''}
                layout='fill'
                alt=''
              />
              <div className='absolute bottom-0 flex w-full justify-between rounded-t bg-slate-900 bg-opacity-20 px-5 py-2 text-steelpolished-200 drop-shadow-lg backdrop-blur-lg'>
                <div>
                  <h2 className='text-lg font-semibold text-steelflat-300 lg:text-lg'>
                    {post.title}
                  </h2>
                </div>
              </div>
            </div>
            <div className='mt-0 flex-1 rounded-b-md bg-slate-400'>
              <div className='flex items-center justify-between p-1'>
                <div className='flex flex-col space-y-1 '>
                  <h3 className='text-sm font-semibold text-steeldark-700 md:text-lg'>
                    By: {post.author ? post.author.name : 'Unknown'}
                  </h3>
                  <h4 className='text-sm font-light text-steeldark-400 md:text-base'>
                    {formatDate(post._createdAt)}
                  </h4>
                </div>
                <div className='flex flex-col items-center gap-y-2 md:flex-row md:gap-x-2'>
                  {post.galleryCategories &&
                    post.galleryCategories.map((galleryCategory) => (
                      <div
                        key={galleryCategory._id}
                        className='hidden rounded-lg border border-steeldark-900 bg-accent/70 px-3 py-2 text-center text-xs font-light text-steeldark-900 md:flex lg:text-sm'
                      >
                        <p className='text-xs font-semibold'>{galleryCategory.title}</p>
                      </div>
                    ))}
                </div>
              </div>
              <p className='line-clamp-3 px-2 py-1 text-sm'>{post.snippet}</p>
            </div>
            <div className='mr-6 flex justify-end drop-shadow-sm'>
              <p className='ml-4 mt-3 flex items-center font-bold group-hover:underline'>
                Read Article
                <ArrowUpRightIcon className='group ml-2 h-4 w-4' />
              </p>
            </div>
          </div>
        </ClientSideRoute>
      ))}
    </>
  ) : null;
}

export default SubGalleryCard;
