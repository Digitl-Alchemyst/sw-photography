import GalleryCard from '@/components/cards/GalleryCard';
import React from 'react'

function Portfolio() {
  return <div className='bg-steeldark-600 text-white w-full'>Portfolio
      <GalleryCard
        title='Landscape'
        img='/gallery/forest.jpg'
        url='/gallery/landscape'
      />
      <GalleryCard
        title='Photo Journalism'
        img='/gallery/journalism.jpg'
        url='/gallery/landscape'
      />
      <GalleryCard
        title='Urban'
        img='/gallery/city.webp'
        url='/gallery/landscape'
      />
      <GalleryCard
        title='Portrait'
        img='/gallery/portrait.webp'
        url='/gallery/landscape'
      />
  </div>;
}

export default Portfolio