'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

function About() {
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>

      {/* Main Container  */}
      <div className='bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-30 py-20 space-y-12'>
        
        {/* Heading  */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>
          -About Me-
        </h1>

        {/* Bio Section  */}
        <section className='mx-auto flex h-full w-full flex-col items-center justify-center space-x-36   xl:flex-row'>

          {/* Text & Counters */}
          <div className='flex flex-col justify-center items-center w-5/6'>

            {/* Bio  */}
            <p className=' rounded-lg border border-solid border-steelflat-200/30 bg-slate-700/80 px-4 py-6 text-steeldark-300'>
              Throughout my life, I&apos;ve been drawn to the world of
              technology, and it was in web application development that I found
              my true passion. Starting with humble experiments in HTML and CSS,
              I steadily honed my skills, delving into JavaScript and its
              frameworks to create dynamic and interactive web applications.
              Late nights were spent tirelessly coding, driven by an unyielding
              ambition to excel in my craft. As the years passed, I encountered
              various challenges and learned from both successes and failures.
              My journey as a web application developer has been one of
              continuous growth and adaptation. I embraced the ever-changing
              landscape of technology, staying updated with the latest trends
              and tools to ensure my work remained innovative and cutting-edge.
              Sharing my knowledge and contributing to the community became
              second nature, and I found immense satisfaction in helping
              aspiring developers along their paths. The projects I&apos;ve
              undertaken, ranging from startups to established companies, have
              provided me with valuable experiences that have shaped me into the
              developer I am today. As I stand at this juncture, I am filled
              with a profound sense of purpose, ready to face new challenges and
              create impactful solutions that push the boundaries of web
              application development.
            </p>



          </div>

          

          {/* Profile Image  */}
          <div>
            <Image
              src='/Steven2.jpg'
              width={500}
              height={1200}
              alt='Profile'
              className='rounded-full border-2 border-steeldark-300/80 opacity-55'
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
