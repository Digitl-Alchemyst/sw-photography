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
import Head from 'next/head';
import { HiBuildingOffice2 } from 'react-icons/hi2';

const Contact = () => {
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
      <div className='mx-auto flex h-full w-5/6 flex-col items-center justify-center px-18 py-32'>
        {/* Header */}
        <h1 className='mb-12 text-center text-4xl font-bold underline decoration-steelflat-600 underline-offset-4'>
          Let&apos;s <span className='text-accent'>connect</span>
        </h1>

        {/* Sub Container  */}
        <div className='flex flex-row items-center justify-center space-x-16 rounded-xl border border-steelflat-600 bg-steeldark-400/30 px-16 py-16'>
          {/* Contact Info */}
          <section className='mx-auto flex w-full flex-1 flex-col items-start space-y-4'>
            <h3 className='text-2xl font-bold'>
              My <span className='text-accent'>Contact</span> Info
            </h3>

            <p className='text-left'>
              You may use your preferred method of communication to reach me.
              Contact me to discuss your project, and photography or video
              needs. I am always open to discuss new projects, creative ideas,
              collaborations or other opportunities. Please feel free to to
              reach out to me through your preferred mode of communication.
            </p>

            {/* Link Tree  */}
            <div className='flex items-center space-x-4'>
              <TbBrandLinktree className='h-8 w-8 text-accent' />
              <Link
                href='https://www.flowcode.com/page/digitalalchemyst'
                className='font-semibold underline decoration-steelflat-600 hover:text-accent'
              >
                <span className='text-accent2'>Visit my Link Tree</span> for a
                full scope of my projects
              </Link>
            </div>

            {/* Email  */}
            <div className='flex items-center space-x-4'>
              <ImEnvelop className='h-8 w-8 text-accent' />
              <div className='flex flex-col items-start'>
                <Link
                  href='mailto:digitalalchemiststudios@gmail.com'
                  target='_blank'
                  className='hover:text-accent2 cursor-pointer'
                >
                  StevenRWatkins86@gmail.com
                </Link>
                <Link
                  href='mailto:digitalalchemiststudios@gmail.com'
                  target='_blank'
                  className='hover:text-accent2 cursor-pointer'
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
                    className='hover:text-accent2 cursor-pointer'
                  >
                    +1 (720) 451-3767
                  </Link>
                </div>
                <div className='flex items-center gap-x-2'>
                  <HiBuildingOffice2 className='text-accent2' />
                  <Link
                    href='tel:7209303876'
                    target='_blank'
                    className='hover:text-accent2 cursor-pointer'
                  >
                    +1 (720) 930-3876
                  </Link>
                </div>
              </div>
            </div>

            {/* Text Links  */}
            <div className='mb-4 flex items-center gap-x-6 text-lg'>
              <Link href='sms:7204513767'>
                <BsFillChatLeftTextFill className='hover:text-accent2 h-7 w-7 cursor-pointer text-accent' />
              </Link>
              <Link
                href='https://signal.group/#CjQKIFmG5VRvMOLW8RsrO9Fo5C9nrJCfxV9TMKkW9qaexiVxEhBgwsiG6RorUJenFSjbISHI'
                target='_blank'
              >
                <BsSignal className='hover:text-accent2 h-7 w-7 cursor-pointer text-accent' />
              </Link>
              <Link href='https://wa.me/7204513767?text=Hello' target='_blank'>
                <BsWhatsapp className='hover:text-accent2 h-7 w-7 cursor-pointer text-accent' />
              </Link>
            </div>

            {/* Social Links  */}
            <div className='-ml-3'>
              <SocialLinks />
            </div>
          </section>

          {/* Contact Form  */}
          <div className='flex flex-col w-full flex-1 items-start space-y-4 justify-center'>
            <h3 className='text-2xl font-bold mb-16'>
              Contact <span className='text-accent'>Me</span>
            </h3>
            <form
              onSubmit={sendEmail}
              ref={form}
              className='mx-auto flex w-full flex-1 flex-col gap-y-4 pb-50 xl:pb-0'
            >
              {/* Group */}
              <div className='flex gap-x-6'>
                <input
                  type='text'
                  name='name'
                  placeholder='name'
                  className='border border-white/20 bg-steelpolished-400 outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
                />
                <input
                  type='text'
                  name='email'
                  placeholder='email'
                  className='border border-white/20 bg-steelpolished-400 outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
                />
              </div>
              <input
                type='text'
                name='subject'
                placeholder='subject'
                className='border border-white/20 bg-steelpolished-400 outline-none placeholder:font-light placeholder:text-steeldark-700 focus:ring-1 focus:ring-accent'
              />
              <textarea
                name='message'
                placeholder='message'
                className='h-[180px] w-full resize-none rounded-lg p-6 capitalize'
              />
              <button
                type='submit'
                value='Send'
                className='text-light hover:border-accent2 hover:bg-accent2 group flex max-w-[170px] items-center justify-center overflow-hidden rounded-lg border border-solid border-accent bg-steeldark-800/60 p-3 px-8 text-lg font-semibold transition-all duration-300 hover:text-steeldark-500 hover:neon-sky'
              >
                <span className='transition-all duration-500 group-hover:-translate-x-[120%] group-hover:opacity-0'>
                  Let&apos;s Talk
                </span>
                <BsArrowRight className='absolute translate-x-[120%] text-[22px] opacity-0 transition-all delay-75 duration-500 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
