import sanityFetch from '@/lib/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import urlForImage from '@/lib/util/urlForImage';
import { PortableText } from 'next-sanity';
import { RichTextComponents } from '../providers/RichTextComponents';
import Image from 'next/image';
import Link from 'next/link';

export default async function MissionStatement() {
  const photographers = await getPhotographer();
  const photographer = photographers[0];

  return (
    <section className='w-full bg-steeldark-700 text-steelpolished-400'>
      {/* Main Container */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-r from-steeldark-900 to-steelpolished-300/10 px-6 py-16 xl:px-30'>
        {/* Heading */}
        <h2 className={`text-center text-5xl font-bold lg:text-7xl ${headerFontStyle.className}`}>
          - Artistic <span className='text-accent'>Vision</span> -
        </h2>

        <div className='w-full'>
          <hr className='mb-12 border-accent' />
          
          {/* Content Section */}
          <div className='flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-16 lg:space-y-0'>
            {/* Text Content */}
            <div className='flex flex-1 flex-col space-y-8'>
              {/* Mission Statement */}
              <div className='rounded-lg border border-steeldark-400 bg-steelpolished-600/20 p-8 shadow-2xl shadow-steeldark-800 drop-shadow-lg'>
                <h3 className='mb-6 text-2xl font-bold text-accent'>
                  Landscape Photography & Photojournalism
                </h3>
                <div className='text-lg leading-relaxed text-steelpolished-300'>
                  <p className='mb-4'>
                    {photographer.snippet}
                  </p>
                  <p className='text-base text-steelpolished-400'>
                    Specializing in capturing the raw beauty of natural landscapes and the authentic moments that define our human experience through photojournalism.
                  </p>
                </div>
              </div>

              {/* Specialties */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='rounded-lg border border-steeldark-400 bg-steeldark-600/60 p-6 text-center shadow-lg'>
                  <h4 className='mb-3 text-xl font-semibold text-accent'>
                    Landscape Photography
                  </h4>
                  <p className='text-sm text-steelpolished-400'>
                    Capturing the majesty and serenity of natural environments with technical precision and artistic vision.
                  </p>
                </div>
                <div className='rounded-lg border border-steeldark-400 bg-steeldark-600/60 p-6 text-center shadow-lg'>
                  <h4 className='mb-3 text-xl font-semibold text-accent'>
                    Photojournalism
                  </h4>
                  <p className='text-sm text-steelpolished-400'>
                    Documenting real stories and authentic moments that matter, bringing truth to light through compelling imagery.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className='flex justify-center'>
                <Link
                  href='/about'
                  className='rounded-lg border border-accent bg-transparent px-6 py-3 text-lg font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-steeldark-900 hover:shadow-lg hover:shadow-accent/30'
                >
                  Learn More About Me
                </Link>
              </div>
            </div>

            {/* Profile Image */}
            <div className='flex flex-shrink-0 items-center justify-center'>
              <div className='relative h-80 w-80 lg:h-96 lg:w-96'>
                <Image
                  src={urlForImage(photographer.authorImage2 as any)?.url() || ''}
                  fill
                  sizes='(max-width: 1024px) 320px, 384px'
                  alt='Photographer Profile'
                  className='rounded-full border-4 border-accent/30 object-cover opacity-80 shadow-2xl shadow-steeldark-800 transition-all duration-300 hover:opacity-100 hover:shadow-accent/20'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Call the Sanity Fetch Function for the Photographer Information
async function getPhotographer(): Promise<Author[]> {
  const photographer: Author[] = await sanityFetch({
    query: queryPhotographers,
    tags: ['author'],
  });
  return photographer;
}
