import Image from 'next/image'
import React from 'react'
import localFont from 'next/font/local';


const Aerotis = localFont({
//   subsets: ['latin'],
  src: '../../../public/fonts/AEROTIS.ttf',
  weight: '400',
});
function GalleryCard({
  img,
  title,
  url,
}: {
  img: string;
  title: string;
  url: string;
}) {
  return (
    <div>
      <h2 className={`${Aerotis.className}`}>{title}</h2>
      <Image src={img} width={300} height={300} alt='Gallery 1' />
    </div>
  );
}

export default GalleryCard