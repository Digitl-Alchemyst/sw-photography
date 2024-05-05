/* eslint-disable react/destructuring-assignment */
import Link from 'next/link';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const StudioNavbar = (props: any) => {
  return (
    <div className=''>
      <div className='z-10 flex items-center justify-between px-5 py-1'>
        <Link href='/' className='flex items-center font-bold text-accent'>
          <ArrowUturnLeftIcon className='mr-2 h-6 w-6' /> <span>Go To Website</span>
        </Link>
        <Image src='/Logo.png' width={150} height={50} alt='' className='hidden md:flex' />
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
