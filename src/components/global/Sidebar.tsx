import Link from 'next/link';
import React from 'react';

const NavLinks = [
  {
    id: 1,
    title: 'Home',
    url: '/',
  },
  {
    id: 2,
    title: 'Gallery',
    url: '/gallery',
  },
  {
    id: 3,
    title: 'Booking',
    url: '/booking',
  },
  // {
  //   id: 4,
  //   title: 'Shop',
  //   url: '/shop',
  // },
  {
    id: 5,
    title: 'Blog',
    url: '/blog',
  },
  {
    id: 6,
    title: 'About Me',
    url: '/about',
  },
  {
    id: 7,
    title: 'Contact',
    url: '/contact',
  },
  {
    id: 7,
    title: 'studio',
    url: '/studio',
  },
];

import { Alex_Brush, Satisfy } from 'next/font/google';

import SocialLinks from './SocialLinks';



const Alex = Satisfy({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

const Sidebar = () => {
  return (
    <div
      className={`flex h-full min-w-fit flex-col bg-steeldark-900 py-5 ${Alex.className}`}
    >
      <SocialLinks />
      <div className='mt-10 flex flex-col space-y-16 px-16'>
        {NavLinks.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className='h-full cursor-pointer text-4xl font-extralight text-steelpolished-600 decoration-steelpolished-500 hover:text-steelpolished-200 hover:underline hover:underline-offset-8'
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
