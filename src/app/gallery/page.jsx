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
    <main className='w-full bg-steeldark-600 text-steelpolished-400 '>
      <div className='flex flex-col items-center justify-center space-y-10 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-8 py-6'>
        <h1
          className={`text-center text-7xl font-bold ${scriptFont.className}`}
        >
          -Gallery-
        </h1>
        <div className='grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-x-6 gap-y-8'>
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
    </main>
  );
}

export default Portfolio;
