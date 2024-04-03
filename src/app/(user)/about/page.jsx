'use client';
import Image from 'next/image';
import { headerFontStyle } from '@/lib/util/headerFontStyles';
import CountUp from 'react-countup';

function About() {
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
              <p className=' rounded-lg border border-solid border-steelflat-200/30 bg-steeldark-600/80 px-4 py-6 text-steeldark-200 shadow-xl shadow-steeldark-700/40 drop-shadow-lg'>
                Throughout my life, I&apos;ve been drawn to the world of technology, and it was in
                web application development that I found my true passion. Starting with humble
                experiments in HTML and CSS, I steadily honed my skills, delving into JavaScript
                and its frameworks to create dynamic and interactive web applications. Late nights
                were spent tirelessly coding, driven by an unyielding ambition to excel in my
                craft. As the years passed, I encountered various challenges and learned from both
                successes and failures. My journey as a web application developer has been one of
                continuous growth and adaptation. I embraced the ever-changing landscape of
                technology, staying updated with the latest trends and tools to ensure my work
                remained innovative and cutting-edge. Sharing my knowledge and contributing to the
                community became second nature, and I found immense satisfaction in helping
                aspiring developers along their paths. The projects I&apos;ve undertaken, ranging
                from startups to established companies, have provided me with valuable experiences
                that have shaped me into the developer I am today. As I stand at this juncture, I
                am filled with a profound sense of purpose, ready to face new challenges and create
                impactful solutions that push the boundaries of web application development.
              </p>
            </div>

            {/* Profile Image  */}
            <div className='flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:h-98 lg:w-98'>
              <Image
                src='/Steven2.jpg'
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

export default About;
