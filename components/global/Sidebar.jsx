import Link from "next/link";
import React from "react";

const NavLinks = [
    {
        id: 1,
        title: 'Home',
        url: '/'
    },
    {
        id: 2,
        title: 'Portfolio',
        url: '/portfolio'
    },
    {
        id: 3,
        title: 'Blog',
        url: '/blog'
    },
    {
        id: 4,
        title: 'Booking',
        url: '/booking'
    },
    {
        id: 5,
        title: 'Presets',
        url: '/presets'
    },
    {
        id: 6,
        title: 'About',
        url: '/about'
    },
    {
        id: 7,
        title: 'Contact',
        url: '/contact'
    },
];



const Sidebar = () => {
    return (
        <div className='flex flex-col items-center justify-start bg-slate-900 w-24 h-full'>
            <div className='flex flex-col items-center justify-center space-y-3 my-2 mx-auto'>
                {NavLinks.map((link) => (
                    <Link href={link.url} key={link.id} className='text-slate-500 hover:text-sky-400 cursor-pointer'>
                            {link.title}
                        
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;