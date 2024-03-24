import Hero from '@/components/home/Hero';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-1 flex-col items-center justify-center bg-steeldark-900 text-white'>
      <Hero />
      <div
        className='tagembed-widget w-full'
        // style='width:100%;height:100%'
        data-widget-id='142726'
        view-url='https://widget.tagembed.com/142726'
       />
      <Script
        src='//widget.tagembed.com/embed.min.js'
        async
        defer
        type='text/javascript'
       />
    </main>
  );
}
