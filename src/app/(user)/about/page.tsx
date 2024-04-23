import Image from 'next/image';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import sanityFetch from '@/lib/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import urlForImage from '@/lib/util/urlForImage';
import { PortableText } from 'next-sanity';
import { RichTextComponents } from '@/components/providers/RichTextComponents';

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
