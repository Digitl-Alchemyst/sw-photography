import Image from 'next/image';
import React from 'react'

const Hero = () => {
  return (
    <div className='relative z-10'>
      <div className='absolute left-0 top-0 z-20 h-full w-full flex-1 bg-gradient-to-l from-steelpolished-100/20 to-steeldark-900' />

      <Image
        src='/Hero1.jpg'
        alt='Hero Image'
        width={2800}
        height={1600}
        className='relative z-10'
      />

      <div className='absolute left-0 top-0 z-30 flex h-full w-full flex-1 items-center justify-center p-6 '>
        <Image
          src='/Steven.jpg'
          alt='Hero Image'
          width={576}
          height={768}
          className='dxl:94 hidden w-74 items-center justify-center rounded-lg opacity-40 shadow-lg shadow-steeldark-700/60 xl:flex xxl:w-102'
        />
        <div className='flex w-full  flex-1 items-center justify-center space-x-6 px-2 lg:w-2/5 lg:space-x-10 md:space-x-6 lg:space-y-12 lg:px-8 xl:flex-none xl:flex-col xxl:space-x-18 '>
          <Image
            src='/SW-Photog.png'
            alt='Hero Image'
            width={560}
            height={263}
            className=' w-92 lg:w-50 invert transition-all duration-100 ease-in-out hover:invert-0 xl:w-82 dxl:w-102'
          />
          <p className='hidden w-full  text-center text-xs font-light lg:flex xxl:text-sm'>
            As a landscape photographer, my journey is a testament to my unwavering passion for
            capturing the breathtaking beauty of our natural world. From my early years exploring
            the scenic landscapes near my hometown to my formal education in photography, I have
            continuously honed my technical skills and artistic vision. With a deep reverence for
            nature, I strive to convey its raw, untamed beauty through bold compositions and
            vibrant colors. My work has been recognized in various publications and exhibitions,
            but beyond accolades, my ultimate goal is to inspire others to connect with and protect
            our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers
            to embark on their own journey of discovery and appreciation for the wonders that
            surround us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero