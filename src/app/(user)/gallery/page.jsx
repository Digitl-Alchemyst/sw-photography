import GalleryCard from '@/components/cards/GalleryCard';
import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

const queryPost = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->,
    description,
    publistedAt,
  } 
  | order(_createdAt desc)
`;
const queryLiveEvent = groq`
  *[_type=='liveEvent'] {
    ...,
    description,
    title,
    slug,
    eventDate,
    keyEvent[]->,
      relatedArticles[]-> {
        slug,
        _id,
        title,
        _createdAt,
        description,
        eventDate,
    }
  } 
  | order(_createdAt desc)
`;
function Portfolio() {
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400 '>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l  from-steelpolished-300/10 to-steeldark-900  px-10 py-12'>
        {/* Header */}
        <h1
          className={`text-center text-7xl font-bold ${scriptFont.className}`}
        >
          -Gallery-
        </h1>
        <section className='grid w-full grid-cols-3 grid-rows-2 items-center justify-center gap-x-8 gap-y-8'>
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
            title='Astro Photography'
            img='/gallery/astro.jpg'
            url='/gallery/astro'
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
          <GalleryCard
            title='Wildlife'
            img='/gallery/wildlife.webp'
            url='/gallery/wildlife'
          />
        </section>
      </div>
    </main>
  );
}

export default Portfolio;
