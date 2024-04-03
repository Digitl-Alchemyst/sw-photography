import {
  HiHome,
  HiUser,
  HiEnvelope,
} from 'react-icons/hi2';
import { GrGallery } from 'react-icons/gr';
import { ImBlog } from 'react-icons/im';
import Link from 'next/link';


//  Navigation Menu Links
const navLinks = [
  { name: 'home', path: '/', icon: <HiHome /> },
  { name: 'gallery', path: '/gallery', icon: <GrGallery /> },
  { name: 'blog', path: '/blog', icon: <ImBlog /> },
  //   { name: 'booking', path: '/booking', icon: <LiaProjectDiagramSolid /> },
  { name: 'about', path: '/about', icon: <HiUser /> },
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

const MobileNav = () => {

  return (
    <nav className='fixed bottom-0 top-0 z-30 mt-auto flex md:hidden h-max w-full flex-col items-center'>
      {/* inner  */}
      <div className='flex h-[80px] w-full items-center justify-between bg-steelpolished-300/20 px-12 py-8 text-3xl backdrop-blur-md'>
        {navLinks.map((link, index) => {
          return (
            <Link
              className="group relative flex items-center transition-all duration-300 hover:text-accent2"
              href={link.path}
              key={index}
            >
              {/* ToolTip */}
              <div className='absolute right-0 hidden pr-14 xl:group-hover:flex'>
                <div className='relative flex items-center rounded-sm bg-white p-[6px] text-primary'>
                  <div className='text-[12px] font-semibold capitalize leading-none'>
                    {link.name}
                  </div>
                  {/* Triangle */}
                  <div className='absolute -right-2 border-y-[6px] border-l-8 border-r-0 border-solid border-y-transparent border-l-white' />
                </div>
              </div>
              {/* Icons  */}
              <div className='text-accent'>{link.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
