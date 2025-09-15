'use client';

import { GrGallery } from 'react-icons/gr';
import { ImBlog } from 'react-icons/im';
import { FaHome, FaUser, FaEnvelope, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';
import CartIcon from '@/components/printShop/CartIcon';
import EnhancedShoppingCart from '@/components/ecommerce/EnhancedShoppingCart';
import { usePrintShop } from '@/contexts/PrintShopContext';

//  Navigation Menu Links
const navLinks = [
  { name: 'home', path: '/', icon: <FaHome /> },
  { name: 'gallery', path: '/gallery', icon: <GrGallery /> },
  { name: 'shop', path: '/shop', icon: <FaShoppingBag /> },
  { name: 'blog', path: '/blog', icon: <ImBlog /> },
  { name: 'about', path: '/about', icon: <FaUser /> },
  {
    name: 'contact',
    path: '/contact',
    icon: <FaEnvelope />,
  },
];

const MobileNavWithCart = () => {
  const { isCartOpen, closeCart } = usePrintShop();

  return (
    <>
      <nav className='fixed bottom-0 top-0 z-30 mt-auto flex h-max w-full flex-col items-center md:hidden'>
        {/* inner  */}
        <div className='flex h-[80px] w-full items-center justify-between bg-steelpolished-300/20 px-8 py-8 text-3xl backdrop-blur-md'>
          {navLinks.map((link, index) => {
            return (
              <Link
                className='group relative flex items-center transition-all duration-300 hover:text-accent2'
                href={link.path}
                key={index}
              >
                {/* icon */}
                <div className='text-steelpolished-600 group-hover:text-steelpolished-300'>
                  {link.icon}
                </div>
              </Link>
            );
          })}

          {/* Cart Icon */}
          <div className='text-steelpolished-600'>
            <CartIcon />
          </div>
        </div>
      </nav>

      {/* Enhanced Shopping Cart */}
      <EnhancedShoppingCart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default MobileNavWithCart;
