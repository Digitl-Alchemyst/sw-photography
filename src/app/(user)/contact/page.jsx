/* eslint-disable import/no-named-as-default-member */
'use client';

import {
  BsArrowRight,
  BsFillChatLeftTextFill,
  BsSignal,
  BsTelephoneFill,
  BsWhatsapp,
} from 'react-icons/bs';
import { MdSettingsCell } from 'react-icons/md';
import { ImEnvelop } from 'react-icons/im';

import SocialLinks from '@/c/global/SocialLinks';
import { TbBrandLinktree } from 'react-icons/tb';
import Link from 'next/link';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { HiBuildingOffice2 } from 'react-icons/hi2';

import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

const Contact = () => {

  // Email Form Logic 
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );

    e.target.reset();
  };

  return (
    <main className=' bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-18 py-22'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>
          -Let&apos;s <span className='text-accent'>Connect-</span>
        </h1>

        {/* Sub Container  */}
        <div className='flex flex-col items-center justify-center space-y-8 xl:space-y-0 rounded-xl border border-steelflat-600/60 bg-steeldark-400/40 px-16 lg:py-16 py-6 shadow-xl shadow-steeldark-700/40 drop-shadow-lg xl:flex-row xl:space-x-16'>
          {/* Contact Info */}
          <section className='mx-auto flex w-full flex-1 flex-col items-start space-y-4'>
            <h3 className='text-2xl font-bold'>
              My <span className='text-accent'>Contact</span> Info
            </h3>

            <p className='text-left'>
              Feel free to get in touch with me however you prefer. Let&apos;s chat about your
              project and any photography or video needs you have. I&apos;m open to discussing new
              projects, creative ideas, collaborations, or any other opportunities you have in
              mind. Just reach out to me in whatever way works best for you.
            </p>

            {/* Link Tree  */}
            <div className='flex items-center space-x-4'>
              <TbBrandLinktree className='h-8 w-8 text-accent' />
              <Link
                href='https://www.flowcode.com/page/digitalalchemyst'
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
                  href='mailto:digitalalchemiststudios@gmail.com'
                  target='_blank'
                  className='cursor-pointer hover:text-accent2'
                >
                  StevenRWatkins86@gmail.com
                </Link>
                <Link
                  href='mailto:digitalalchemiststudios@gmail.com'
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
                    href='tel:7204513767'
                    target='_blank'
                    className='cursor-pointer hover:text-accent2'
                  >
                    +1 (720) 451-3767
                  </Link>
                </div>
                <div className='flex items-center gap-x-2'>
                  <HiBuildingOffice2 className='text-accent2' />
                  <Link
                    href='tel:7209303876'
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
              <Link href='sms:7204513767'>
                <BsFillChatLeftTextFill className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
              </Link>
              <Link
                href='https://signal.group/#CjQKIFmG5VRvMOLW8RsrO9Fo5C9nrJCfxV9TMKkW9qaexiVxEhBgwsiG6RorUJenFSjbISHI'
                target='_blank'
              >
                <BsSignal className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
              </Link>
              <Link href='https://wa.me/7204513767?text=Hello' target='_blank'>
                <BsWhatsapp className='h-7 w-7 cursor-pointer text-accent hover:text-accent2' />
              </Link>
            </div>

            {/* Social Links  */}
            <div className='-ml-3'>
              <SocialLinks />
            </div>
          </section>

          {/* Contact Form  */}
          <div className='flex w-full flex-1 flex-col items-start justify-center space-y-4'>
            <h3 className='mb-6 text-2xl font-bold'>
              Contact <span className='text-accent'>Me</span>
            </h3>
            <form
              onSubmit={sendEmail}
              ref={form}
              className='mx-auto flex w-full flex-1 flex-col gap-y-4 lg:pb-50 text-steeldark-700 xl:pb-0'
            >
              {/* Input Group */}
              <div className='flex w-full gap-x-6'>
                <input
                  required
                  type='text'
                  name='name'
                  placeholder='name'
                  className='w-full rounded-sm border border-white/20 bg-steelpolished-400 px-3 py-1 capitalize outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
                />
                <input
                  required
                  type='text'
                  name='email'
                  placeholder='email'
                  className='w-full rounded-sm border border-white/20 bg-steelpolished-400 px-3 py-1 capitalize outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
                />
              </div>
              <input
                required
                type='text'
                name='subject'
                placeholder='subject'
                className='rounded-sm border border-white/20 bg-steelpolished-400 px-3 py-1 capitalize outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
              />
              <textarea
                required
                name='message'
                placeholder='message'
                className='h-[180px] w-full resize-none rounded-lg p-3 capitalize'
              />
              <button
                type='submit'
                value='Send'
                className='text-light group flex max-w-[170px] items-center justify-center overflow-hidden rounded-lg border border-solid border-accent bg-steeldark-800/60 p-3 px-8 text-lg font-semibold text-steelpolished-300 transition-all duration-75 hover:border-accent2 hover:bg-accent2 hover:text-steeldark-500 hover:neon-sky'
              >
                <span className='transition-all duration-500 group-hover:-translate-x-[120%] group-hover:opacity-0'>
                  Let&apos;s Talk
                </span>
                <BsArrowRight className='delay-25 absolute translate-x-[120%] text-[22px] opacity-0 transition-all duration-300 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
