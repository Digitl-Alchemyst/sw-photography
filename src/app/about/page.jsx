'use client';
import Image from 'next/image';
import React from 'react'
import CountUp from 'react-countup';

function About() {
  return (
    <div className='bg-steeldark-600 w-full '>
      <div className='mx-auto flex h-full w-full flex-col items-center gap-x-6 xl:flex-row xl:justify-center'>

        {/* Text & Counters */}
        <div>
          <Image src='/Steven2.jpg' width={200} height={200} alt='Profile' />
        </div>
        <div className='flex flex-col justify-center xl:ml-80 '>
          
          {/* Heading & Bio  */}
          <h2
            className='h2 text-steelpolished-100'
          >
            Crafting unique{' '}
            <span className='text-steelpolished-400'>digital experiences</span> captivating
            users through{' '}
            <span className='text-steelflat-200'>alchemical designs</span>
          </h2>
          <p
            className='border-steelflat-200/30  mx-auto mb-10 max-w-[500px] rounded-lg border border-solid bg-slate-700/80 px-3 py-5 text-xs text-steeldark-300 md:text-sm xl:mx-0 xl:mb-10 xl:max-w-[850px] xl:px-4 xl:text-base'
          >
            Throughout my life, I&apos;ve been drawn to the world of technology,
            and it was in web application development that I found my true
            passion. Starting with humble experiments in HTML and CSS, I
            steadily honed my skills, delving into JavaScript and its frameworks
            to create dynamic and interactive web applications. Late nights were
            spent tirelessly coding, driven by an unyielding ambition to excel
            in my craft. As the years passed, I encountered various challenges
            and learned from both successes and failures. My journey as a web
            application developer has been one of continuous growth and
            adaptation. I embraced the ever-changing landscape of technology,
            staying updated with the latest trends and tools to ensure my work
            remained innovative and cutting-edge. Sharing my knowledge and
            contributing to the community became second nature, and I found
            immense satisfaction in helping aspiring developers along their
            paths. The projects I&apos;ve undertaken, ranging from startups to
            established companies, have provided me with valuable experiences
            that have shaped me into the developer I am today. As I stand at
            this juncture, I am filled with a profound sense of purpose, ready
            to face new challenges and create impactful solutions that push the
            boundaries of web application development.
          </p>

          {/* Counters  */}
          <div

            className='mx-auto md:max-w-2xl xl:mx-0 xl:max-w-3xl'
          >
            <div className='flex gap-x-2 xl:gap-x-3 '>
              {/* Years of Experience  */}
              <div className='after:bg-steelflat-200 relative flex flex-1 flex-col items-center after:absolute after:right-0 after:top-0 after:h-full after:w-[1px]'>
                <div className='text-2xl font-extrabold text-steelpolished-400 xl:text-4xl'>
                  <CountUp start={0} end={17} duration={5} /> +
                </div>
                <div className='mr-2 max-w-[100px] text-xs capitalize leading-[1.4] tracking-[1px] md:text-sm'>
                  Years of experience
                </div>
              </div>
              {/* Open Source Contributions */}
              <div className='after:bg-steelflat-200 relative flex flex-1 flex-col items-center after:absolute after:right-0 after:top-0 after:h-full after:w-[1px]'>
                <div className='text-2xl font-extrabold text-steelpolished-400 xl:text-4xl'>
                  <CountUp start={0} end={22567} duration={5} /> +
                </div>
                <div className='mr-2 max-w-[100px] text-xs capitalize leading-[1.4] tracking-[1px] md:text-sm'>
                  Photos & Videos Shot
                </div>
              </div>
              {/* Satisfied Clients */}
              <div className='after:bg-steelflat-200 relative flex flex-1 flex-col items-center after:absolute after:right-0 after:top-0 after:h-full after:w-[1px]'>
                <div className='text-2xl font-extrabold text-steelpolished-400 xl:text-4xl'>
                  <CountUp start={0} end={42} duration={5} /> +
                </div>
                <div className='mr-2 max-w-[100px] text-xs capitalize leading-[1.4] tracking-[1px] md:text-sm'>
                  Satisfied Clients
                </div>
              </div>
              {/* Completed Projects */}
              <div className='after:bg-steelflat-200 relative flex flex-1 flex-col items-center after:absolute after:right-0 after:top-0 after:h-full after:w-[1px]'>
                <div className='text-2xl font-extrabold text-steelpolished-400 xl:text-4xl'>
                  <CountUp start={0} end={28} duration={5} /> +
                </div>
                <div className='mr-2 max-w-[100px] text-xs capitalize leading-[1.4] tracking-[1px] md:text-sm'>
                  Projects Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info  */}
        <div

          className='flex h-[480px] w-full flex-col sm:mb-10 md:mb-0 xl:max-w-[48%]'
        >
          <div className='mx-auto mb-6 flex flex-wrap gap-x-4 gap-y-4 xl:mx-0 xl:gap-x-8'>
            place holder
          </div>
          <div className='gap-y2 flex flex-col items-center rounded-xl border border-sky-400/20 bg-lime-400/20 py-2 xl:mr-16 xl:items-start xl:gap-y-4 xl:px-2 xl:py-6'>
what goes here
          </div>
          <div className='flex min-h-[200px] sm:hidden' />
        </div>
      </div>
    </div>
  );
}

export default About