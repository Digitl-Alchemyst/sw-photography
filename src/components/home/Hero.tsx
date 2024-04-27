import sanityFetch from '@/lib/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import React from 'react'
import { RichTextComponents } from '../providers/RichTextComponents';
import urlForImage from '@/lib/util/urlForImage';

export default async function Hero() {
  const photographers = await getPhotographer();
  const photographer = photographers[0];
  // console.log("🚀 ~ Hero ~ photographer:", photographer)
  return (
    <div className='relative z-10'>
      <div className='absolute left-0 top-0 z-20 h-full w-full flex-1 bg-gradient-to-l from-steelpolished-100/20 to-steeldark-900' />

      <Image
        src={urlForImage(photographer.hero as any)?.url() || ''}
        alt='Hero Image'
        width={2800}
        height={1600}
        priority={true}
        className='relative z-10 opacity-75'
      />

      <div className='absolute -top-15 left-0 z-30 flex h-full w-full flex-1 items-center justify-center p-6 '>
        <Image
          src={urlForImage(photographer.authorImage as any)?.url() || ''}
          alt='Photographer Profile Image'
          width={576}
          height={768}
          priority={true}
          className='dxl:94 hidden w-74 items-center justify-center rounded-lg opacity-60 shadow-lg shadow-steeldark-700/60 xl:flex xxl:w-102'
        />
        <div className='flex w-full  flex-1 items-center justify-center space-x-6 px-2 md:space-x-6 lg:w-2/5 lg:space-x-10 lg:space-y-12 lg:px-8 xl:flex-none xl:flex-col xxl:space-x-18 '>
          <Image
            src={urlForImage(photographer.logo as any)?.url() || ''}
            alt='Logo Image'
            width={560}
            height={263}
            priority={true}
            className=' w-92 invert transition-all duration-100 ease-in-out hover:invert-0 lg:w-50 xl:w-82 dxl:w-102'
          />
          <p className='hidden w-full  rounded-md bg-steeldark-600/40 p-3 text-center text-xs font-light lg:flex xxl:text-sm'>
            {photographer.snippet}
          </p>
        </div>
      </div>
    </div>
  );
}

// Call the Sanity Fetch Function for the Photographer Information
async function getPhotographer(): Promise<Author[]> {
  // Fetch blog data from Sanity
  const photographer: Author[] = await sanityFetch({
    query: queryPhotographers,
    tags: ['author'],
  });
  // console.log("🚀 ~ getPhotographer ~ photographer:", photographer)
  return photographer;
}
