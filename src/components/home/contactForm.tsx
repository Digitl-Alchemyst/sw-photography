'use client';

import { useRef } from 'react';
import { sendForm } from '@emailjs/browser';
import { BsArrowRight } from 'react-icons/bs';
import { sendGTMEvent } from '@next/third-parties/google';

export const revalidate = 10;
const ContactForm = () => {
  // Email Form Logic
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form.current!,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    ).then(
      (result) => {
        console.log(result.text);
        // Reset the form after successful submission
        (e.target as HTMLFormElement).reset();
      },
      (error) => {
        console.log(error.text);
      },
    );
  };
  return (
    <section className='flex w-full flex-1 flex-col items-start justify-center space-y-4'>
      <h3 className='mb-6 text-2xl font-bold'>
        Contact <span className='text-accent'>Me</span>
      </h3>
      <form
        onSubmit={sendEmail}
        ref={form}
        className='mx-auto flex w-full flex-1 flex-col gap-y-4 text-steeldark-700 lg:pb-50 xl:pb-0'
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
          onClick={() => sendGTMEvent({ event: 'formSubmitted', value: 'Contact Form' })}
          value='Send'
          className='text-light group flex max-w-[170px] items-center justify-center overflow-hidden rounded-lg border border-solid border-accent bg-steeldark-800/60 p-3 px-8 text-lg font-semibold text-steelpolished-300 transition-all duration-75 hover:border-accent2 hover:bg-accent2 hover:text-steeldark-500 hover:neon-sky'
        >
          <span className='transition-all duration-500 group-hover:-translate-x-[120%] group-hover:opacity-0'>
            Let&apos;s Talk
          </span>
          <BsArrowRight className='delay-25 absolute translate-x-[120%] text-[22px] opacity-0 transition-all duration-300 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100' />
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
