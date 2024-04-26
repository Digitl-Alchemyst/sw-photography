import Hero from '@/components/home/Hero';
import Instagram from '@/components/home/Instagram';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-1 flex-col items-center justify-center bg-steeldark-900 text-steelpolished-400'>
      <Hero />
      <Instagram />
    </main>
  );
}
