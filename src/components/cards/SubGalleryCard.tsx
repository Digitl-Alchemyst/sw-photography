import Image from 'next/image';
import ClientSideRoute from '@/c/providers/ClientSideRoute';
import urlForImage from '@/u/urlForImage';
import resolveHref from '@/l/util/resolveHref';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import formatDate from '@/l/util/formatDate';
import { Aerotis } from '@/lib/util/headerFontStyles';

// Assuming Gallery and related types are correctly defined and imported

type Props = {
  galleries: Gallery[] | undefined;
};

function SubGalleryCard({ galleries }: Props) {
  return galleries ? (
    <>
      {galleries.map((post) => (
        // console.log(post),
        <ClientSideRoute route={resolveHref('gallery', post.slug.current) || ''} key={post.slug.current}>
          <div className='flex w-full cursor-pointer text-steelpolished-300 shadow-2xl shadow-steeldark-700/40 drop-shadow-lg'>
            <div className='relative h-70 w-full overflow-hidden md:h-90 xl:h-144'>
              <Image
                className=''
                src={urlForImage(post.mainImage as any)?.url() || ''}
                width={1800}
                height={720}
                priority={true}
                alt=''
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-l from-steelpolished-100/5 to-steeldark-900/95 px-5 py-2'>
                <h2
                  className={`text-center text-4xl font-bold text-steelflat-300 md:text-5xl lg:text-6xl xl:text-7xl ${Aerotis.className}`}
                >
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
        </ClientSideRoute>
      ))}
    </>
  ) : null;
}

export default SubGalleryCard;
