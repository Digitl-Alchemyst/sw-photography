import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SocialLinks from './SocialLinks'
import Logo from '@/public/images/Logo.png'
import { MagnifyingGlassIcon, GlobeAmericasIcon, Bars3BottomRightIcon, UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

function Navbar () {
  return (
    <div className='bg-slate-900 sticky top-0 z-50 flex justify-between shadow-lg py-5 px-5 md:px-8 gap-1 w-full'>

        {/* Logo  */}
        <div className=''>
            <Link href='/' passHref>
            <Image 
                src={Logo}
                alt='Logo'
                style={{width: '220px', height: '70px'}}
                className='cursor-pointer'            
            />
            </Link>
        </div>

        {/* Social Links  */}
        <div className='ml-5'>
            <SocialLinks isMid />
        </div>

        {/* Search Bar  */}
        <div className='flex py-2 gap-4 flex-1 ml-10'>
                <input
                    type='text'
                    placeholder='Search for Photos, Collections, Assets and Presets'
                    className='rounded-full flex-grow px-5 py-2 text-slate-200 bg-slate-800/80 border-2 border-slate-700 focus:ring-1 focus:ring-sky-400 focus:outline-none shadow-md'
                />
                <MagnifyingGlassIcon  className=' hidden md:inline-flex h-11 w-11 text-slate-500 rotate-90 bg-slate-800 font-bold rounded-full cursor-pointer p-1' />
                
            </div>

        {/* Buttons */}
        <div className='flex items-center space-x-4 p-2 justify-end ml-10'>
                <p className='text-slate-500 font-bold text-lg cursor-pointer'>
                    Photograph the World
                </p>
                <GlobeAmericasIcon className='h-10 w-10 text-slate-500 cursor-pointer' />
                <ShoppingBagIcon className='h-10 w-10 text-slate-500 cursor-pointer' />
                <div className='flex items-center space-x-2 border-2 border-slate-600 rounded-full p-2'>
                    <Bars3BottomRightIcon className='h-8 w-8 text-slate-500 cursor-pointer' />
                    <UserCircleIcon className='h-8 w-8 text-slate-500 cursor-pointer' />                    
                </div>

            </div>
        
    </div>
  )
}

export default Navbar
