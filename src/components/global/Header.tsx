import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';

import {
  MagnifyingGlassIcon,
  GlobeAmericasIcon,
  Bars3BottomRightIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

function Header() {
  return (
    <header className='bg-steeldark-700 flex fixed z-50 w-full items-center justify-between gap-1 px-5 py-3 shadow-lg md:px-8'>
      {/* Logo  */}
      <div className=''>
        <Link href='/' passHref>
          <Image
            src='/SW-Photog.png'
            alt='Logo'
            width={175}
            height={55}
            style={{ width: '220px', height: '70px' }}
            className='cursor-pointer'
          />
        </Link>
      </div>

      {/* Social Links  */}
      <div className='ml-5'>
        <SocialLinks />
      </div>

      {/* Search Bar  */}
      <div className='ml-5 flex flex-1 items-center space-x-4 '>
        <input
          type='text'
          placeholder='Search for Photos, Collections, Assets and Presets (Coming Soon)'
          className='text-steelpolished-200 bg-steeldark-800/80 border-steelflat-700 focus:ring-steelflat-300 flex-grow rounded-full border-2 px-5 py-2 shadow-md focus:outline-none focus:ring-1'
        />
        <MagnifyingGlassIcon className=' text-steelflat-500 bg-steelflat-800 hidden h-11 w-11 rotate-90 cursor-pointer rounded-full p-1 font-bold md:inline-flex' />
      </div>

      {/* Buttons */}
      <div className='ml-5 flex items-center justify-end space-x-4 p-2'>
        {/* Photograph the World  */}
        <div className='flex items-center space-x-2'>
          <p className='text-steelflat-500 cursor-pointer text-lg font-bold'>
            Photograph the World
          </p>
          <GlobeAmericasIcon className='text-steelflat-500 h-10 w-10 cursor-pointer' />
        </div>
        <Link href='/booking' passHref>
          <BookOpenIcon className='text-steelflat-500 h-10 w-10 cursor-pointer' />
        </Link>
        <Link href='/shop' passHref>
          <ShoppingBagIcon className='text-steelflat-500 h-10 w-10 cursor-pointer' />
        </Link>
        <div className='border-steelflat-600 flex items-center space-x-2 rounded-full border-2 p-2'>
          <Bars3BottomRightIcon className='text-steelflat-500 h-8 w-8 cursor-pointer' />
          <UserCircleIcon className='text-steelflat-500 h-8 w-8 cursor-pointer' />
        </div>
      </div>
    </header>
  );
}

export default Header;
