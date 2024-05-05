import Image from 'next/image';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import sanityFetch from '@/lib/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import urlForImage from '@/lib/util/urlForImage';
import { PortableText } from 'next-sanity';
import { RichTextComponents } from '@/components/providers/RichTextComponents';
import TechCard from '@/components/cards/TechCard';
import GearCard from '@/components/cards/GearCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About Me | SW Photography`,
  description:
    'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
  keywords:
    'Photographer, Portfolio, About, Steven Watkins, Steven Watkins Photography, Landscape Photographer, Photojournalist, Photography, Journalist Landscape Photography, Journalist Photography, Photographer Landscape Photography, Colorado Photographer, Colorado Landscape Photography, Colorado Journalist, Colorado Photography',
};
const techStack = [
  {
    title: 'Lightroom',
    imageUrl: '/tech/photoshop-lightroom.png',
  },
  {
    title: 'Lightroom Classic',
    imageUrl: '/tech/photoshop-lightroom-classic.png',
  },
  {
    title: 'Photoshop',
    imageUrl: '/tech/photoshop.png',
  },
  {
    title: 'Premiere Pro',
    imageUrl: '/tech/premiere-pro.png',
  },
  {
    title: 'After Effects',
    imageUrl: '/tech/after-effects.png',
  },
  {
    title: 'Gimp',
    imageUrl: '/tech/gimp-logo-editor-2.svg',
  },
  {
    title: 'Krita',
    imageUrl: '/tech/Calligrakrita-base.svg',
  },
  {
    title: 'Capture One',
    imageUrl: '/tech/capture-one.png',
  },
  {
    title: 'DaVinci Resolve',
    imageUrl: '/tech/DaVinci_Resolve_Studio.png',
  },
  {
    title: 'ON1 Photo RAW',
    imageUrl: '/tech/photoraw.webp',
  },
  {
    title: 'Luminar',
    imageUrl: '/tech/luminar.jpg',
  },
];

const gearList = [
  {
    category: 'Camera',
    items: [
      { name: 'Sony Alpha A6600', image: '/gear/a6600.webp' },
      { name: 'Sony Alpha A6400', image: '/gear/a6400.jpg' },
      { name: 'Canon EOS 80D', image: '/gear/80d.jpg' },
    ],
  },
  {
    category: 'Lens',
    items: [
      { name: 'Canon EF-S 18-135mm f/3.5-5.6 Is STM ', image: '/gear/canon13-135.jpg' },
      { name: 'Sony E 18-135mm f/3.5-5.6 OSS', image: '/gear/sony18-135.jpg' },
      { name: 'Sony E PZ 16-50mm f/3.5-5.6 OSS', image: '/gear/Sony16_50mm.jpg' },
      { name: 'Sigma Sony E 18-50mm F2.8 DC DN Contemporary', image: '/gear/signma18-50.jpg' },
    ],
  },
  {
    category: 'Accessories',
    items: [
      { name: 'DJI Mini 3 Pro', image: '/gear/dji.jpg' },
      { name: 'MOZA AirCross 2 Gimbal', image: '/gear/aircross.webp' },
      { name: 'Tascam DR-07X', image: '/gear/tascam.jpg' },
      { name: 'Zoom H1n', image: '/gear/zoom.jpg' },
      { name: 'Specialist Series SP425K Professional Tripod ', image: '/gear/promaster.jpg' },
    ],
  },
];

export default async function About() {
  const photographers = await getPhotographer();
  const photographer = photographers[0];
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-6 py-12 xl:mx-auto xl:px-30 xl:py-20'>
        {/* Heading  */}
        <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
          - About <span className='text-accent'>Me</span> -
        </h1>

        <div className='w-full'>
          <hr className='mb-8 border-accent' />

          {/* Bio Section  */}
          <section className='flex h-full w-full flex-col items-center justify-center space-y-8 dxl:mx-auto dxl:flex-row dxl:space-x-36 dxl:space-y-0'>
            {/* Text & Counters */}
            <div className='flex flex-col items-center justify-center lg:w-5/6'>
              {/* Bio  */}
              <div className=' rounded-lg border border-solid border-steelflat-200/30 bg-steeldark-600/80 px-4 py-6 text-steeldark-200 shadow-xl shadow-steeldark-700/40 drop-shadow-lg'>
                <PortableText value={photographer.bio} components={RichTextComponents} />
              </div>
            </div>

            {/* Profile Image  */}
            <div className='flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:h-98 lg:w-98'>
              <Image
                src={urlForImage(photographer.authorImage2 as any)?.url() || ''}
                width={950}
                height={960}
                alt='Profile'
                className='rounded-full border-2 border-steeldark-300/80 opacity-55 shadow-xl shadow-steeldark-700/40 drop-shadow-lg'
              />
            </div>
          </section>
        </div>

        <section className='mx-auto flex h-full w-full flex-col space-y-8'>
          <h2 className={`text-center text-5xl font-bold ${headerFontStyle.className}`}>
            - Skills -
          </h2>
          <div className='w-full'>
            <hr className='mb-8 mt-4 border-accent' />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='rounded-lg border border-solid border-steelflat-200/30 bg-steeldark-600/80 px-4 py-6 text-steeldark-200 shadow-xl shadow-steeldark-700/40 drop-shadow-lg'>
                <h3 className='mb-2 text-2xl underline'>Skillset</h3>
                <ul className='ml-4 list-disc space-y-2'>
                  <li className=''>Exposure</li>
                  <li className=''>Lighting</li>
                  <li className=''>Composition</li>
                  <li className=''>Eye for Detail</li>
                  <li className=''>Highly Creative & Imaginative</li>
                  <li className=''>Color Theory</li>
                  <li className=''>Editing & Post Processing</li>
                  <li className=''>Image Manipuation</li>
                  <li className=''>Graphic Design</li>
                </ul>
                <h3 className='mb-2 mt-6 text-2xl underline'>Certifictions</h3>
                <ul className='ml-4 list-disc space-y-2 '>
                  <li className=''>Adobe Certified Expert (ACE)</li>
                  <li className=''>Certified Ethical Journalist (EJN)</li>
                  <li className=''>Certified Professional Photographer (CPP)</li>
                </ul>
                <h3 className='mb-2 mt-6 text-2xl underline'>Publications</h3>
                <ul className='ml-4 list-disc space-y-2 '>
                  <li className=''>Ruptly GmbH</li>
                  <li className=''>Al Jazeera English</li>
                  <li className=''>Denver 9 News</li>
                  <li className=''>Colorado Public Radio</li>
                  <li className=''>Rocky Mountain PBS</li>
                  <li className=''>UnTelevised Media</li>
                  <li className=''>Viory News Agency</li>
                </ul>
              </div>
              <div className='rounded-lg border border-solid border-steelflat-200/30 bg-steeldark-600/80 px-4 py-6 text-steeldark-200 shadow-xl shadow-steeldark-700/40 drop-shadow-lg'>
                <h3 className='mb-2 text-2xl underline'>Tech Stack</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {techStack.map((tech) => (
                    <div key={tech.title}>
                      <TechCard imageUrl={tech.imageUrl} title={tech.title} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='mx-auto flex h-full w-full flex-col space-y-8'>
          <h2 className={`text-center text-5xl font-bold ${headerFontStyle.className}`}>
            - Gear -
          </h2>
          <div className='w-full'>
            <hr className='mb-8 mt-4 border-accent' />
            <div className='flex flex-col items-start space-y-4'>
              {gearList.map((category, index) => (
                <div key={index}>
                  <div className='mb-2 text-xl underline'>{category.category}</div>
                  <div className='flex flex-wrap gap-4'>
                    {category.items.map((item, itemIndex) => (
                      <GearCard
                        key={`${index}-${itemIndex}`}
                        image={item.image}
                        name={item.name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Call the Sanity Fetch Function for the Photographer Information
async function getPhotographer(): Promise<Author[]> {
  // Fetch blog data from Sanity
  const photographer: Author[] = await sanityFetch({
    query: queryPhotographers,
    tags: ['author'],
  });
  // console.log("🚀 ~ getPhotographer ~ photographer:", photographer)
  return photographer;
}
