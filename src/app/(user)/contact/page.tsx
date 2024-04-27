/* eslint-disable import/no-named-as-default-member */
import Link from 'next/link';
import SocialLinks from '@/c/global/SocialLinks';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import {

  BsFillChatLeftTextFill,
  BsSignal,
  BsTelephoneFill,
  BsWhatsapp,
} from 'react-icons/bs';
import { MdSettingsCell } from 'react-icons/md';
import { ImEnvelop } from 'react-icons/im';
import { TbBrandLinktree } from 'react-icons/tb';
import { FaBuilding } from 'react-icons/fa';

import sanityFetch from '@/l/sanity/fetch';
import { queryPhotographers } from '@/lib/sanity/queries';
import type { Metadata } from 'next';
import ContactForm from '@/c/home/contactForm';


export const metadata: Metadata = {
  title: `Contact | SW Photography`,
  description:
    'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
  keywords:
    'Photographer, Portfolio, Contact, Steven Watkins, Steven Watkins Photography, Landscape Photographer, Photojournalist, Photography, Journalist Landscape Photography, Journalist Photography, Photographer Landscape Photography, Colorado Photographer, Colorado Landscape Photography, Colorado Journalist, Colorado Photography',
};

export default async function Contact() {
    const photographers = await getPhotographer();
    const photographer = photographers[0];
  return (
    <main className=' bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-18 py-22'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${headerFontStyle.className}`}>
          - Let&apos;s <span className='text-accent'>Connect -</span>
        </h1>
        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          {/* Sub Container  */}
          <section className='flex flex-col items-center justify-center space-y-8 rounded-xl border border-steelflat-600/60 bg-steeldark-400/40 px-16 py-6 shadow-xl shadow-steeldark-700/40 drop-shadow-lg lg:py-16 xl:flex-row xl:space-x-16 xl:space-y-0'>
            {/* Contact Info */}
            <section className='mx-auto flex w-full flex-1 flex-col items-start space-y-4'>
              <h3 className='text-2xl font-bold'>
                My <span className='text-accent'>Contact</span> Info
              </h3>

              <p className='text-left'>
                Feel free to get in touch with me however you prefer. Let&apos;s chat about your
                project and any photography or video needs you have. I&apos;m open to discussing
                new projects, creative ideas, collaborations, or any other opportunities you have
                in mind. Just reach out to me in whatever way works best for you.
              </p>

              {/* Link Tree  */}
              <div className='flex items-center space-x-4'>
                <TbBrandLinktree className='h-8 w-8 text-accent' />
                <Link
                  href={photographer.linkTree}
                  className='font-semibold underline decoration-steelflat-600 hover:text-accent'
                >
                  <span className='text-accent2'>Visit my Link Tree</span> for a full scope of my
                  projects
                </Link>
              </div>

              {/* Email  */}
              <div className='flex items-center space-x-4'>
                <ImEnvelop className='h-8 w-8 text-accent' />
                <div className='flex flex-col items-start'>
                  <Link
                    href={`mailto:${photographer.email}`}
                    target='_blank'
                    className='cursor-pointer hover:text-accent2'
                  >
                    StevenRWatkins86@gmail.com
                  </Link>
                  <Link
                    href={`mailto:${photographer.email2}`}
                    target='_blank'
                    className='cursor-pointer hover:text-accent2'
                  >
                    DigialAlchemistStudios@gmail.com
                  </Link>
                </div>
              </div>

              {/* Phone  */}
              <div className='flex items-center space-x-4'>
                <BsTelephoneFill className='h-8 w-8 text-accent' />
                <div className='flex flex-col'>
                  <div className='flex items-center gap-x-2'>
                    <MdSettingsCell className='text-accent2' />
                    <Link
                      href={`tel:${photographer.phone}`}
                      target='_blank'
                      className='cursor-pointer hover:text-accent2'
                    >
                      +1 (720) 451-3767
                    </Link>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <FaBuilding className='text-accent2' />
                    <Link
                      href={`tel:${photographer.phone2}`}
                      target='_blank'
                      className='cursor-pointer hover:text-accent2'
                    >
                      +1 (720) 930-3876
                    </Link>
                  </div>
                </div>
              </div>

              {/* Text Links  */}
              <div className='mb-4 flex items-center gap-x-6 text-lg'>
                <Link href={`sms:${photographer.phone}`}>
                  <BsFillChatLeftTextFill className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
                </Link>
                <Link href={photographer.signal} target='_blank'>
                  <BsSignal className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
                </Link>
                <Link href={photographer.whatsApp} target='_blank'>
                  <BsWhatsapp className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
                </Link>
              </div>

              {/* Social Links  */}
              <div className='-ml-3'>
                <SocialLinks />
              </div>
            </section>

            {/* Contact Form  */}
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
};

// Call the Sanity Fetch Function for the Photographer Information
async function getPhotographer(): Promise<Author[]> {
  // Fetch blog data from Sanity
  const photographer: Author[] = await sanityFetch({
    query: queryPhotographers,
    tags: ['author'],
  });
  return photographer;
}

// getstaticparams probably