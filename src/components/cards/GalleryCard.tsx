import Image from 'next/image'
import React from 'react'
import localFont from 'next/font/local';
import Link from 'next/link';


const Aerotis = localFont({
//   subsets: ['latin'],
  src: '../../../public/fonts/AEROTIS.ttf',
  weight: '400',
});
function GalleryCard({
  galleryImg,
  title,
  url,
}: {
  galleryImg: string;
  title: string;
  url: string;
}) {
  return (
    <div className=' flex flex-col items-center space-y-8 rounded-md border border-steeldark-400 bg-steelpolished-600/20 px-6 py-4 shadow-2xl shadow-steeldark-800 drop-shadow-lg'>
      <h2
        className={`${Aerotis.className} text-4xl text-steelpolished-400 underline decoration-steelpolished-600 underline-offset-4`}
      >
        {title}
      </h2>
      <Link href={url} className='relative h-98 w-full'>
        <Image
          src={galleryImg}
          fill
          alt='Gallery 1'
          className='rounded-md object-cover object-center transition-transform duration-200 ease-out hover:scale-105'
        />
      </Link>
    </div>
  );
}

export default GalleryCard