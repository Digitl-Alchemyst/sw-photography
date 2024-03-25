import GalleryCard from '@/components/cards/GalleryCard';
import React from 'react';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

function Portfolio() {
  return (
    <div className='w-full bg-steeldark-600 text-white py-6 px-8 space-y-10 flex flex-col items-center justify-center'>
      <h1 className={`text-7xl font-bold text-center ${scriptFont.className}`}>-Gallery-</h1>
      <div className='grid w-full grid-cols-2 grid-rows-2 gap-x-6 gap-y-8 justify-center items-center'>
        <GalleryCard
          title='Landscape'
          img='/gallery/forest.jpg'
          url='/gallery/landscape'
        />
        <GalleryCard
          title='Photo Journalism'
          img='/gallery/journalism.jpg'
          url='/gallery/journalism'
        />
        <GalleryCard
          title='Urban'
          img='/gallery/city.webp'
          url='/gallery/urban'
        />
        <GalleryCard
          title='Portrait'
          img='/gallery/portrait.webp'
          url='/gallery/portrait'
        />
      </div>
    </div>
  );
}

export default Portfolio;
