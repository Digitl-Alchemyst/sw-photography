import Hero from '@/components/home/Hero';
import Instagram from '@/components/home/Instagram';
import FeaturedPortfolio from '@/components/home/FeaturedPortfolio';
import MissionStatement from '@/components/home/MissionStatement';
import GalleryPreview from '@/components/home/GalleryPreview';
import RecentWork from '@/components/home/RecentWork';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-1 flex-col items-center justify-center bg-steeldark-900 text-steelpolished-400'>
      <Hero />
      <FeaturedPortfolio />
      <MissionStatement />
      <GalleryPreview />
      <RecentWork />
      <Instagram />
    </main>
  );
}
