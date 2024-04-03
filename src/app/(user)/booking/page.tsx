import React from 'react';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});
function Booking() {
  return (
    <main className='w-full bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-8 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900'>
        {/* Header */}
        <h1 className={`text-center text-7xl font-bold capitalize ${scriptFont.className}`}>
          - Heading -
        </h1>
        <div className='w-full'>
          <hr className='mb-8 border-accent' />
          {/* Sub Container  */}
          <section className='flex items-center justify-center'>
            {' '}
            <div className='w-full rounded-lg bg-steeldark-600 text-white '>
              {/* <Calendar /> */}
              <p className='rounded-lg p-6 '>
                Booking feature under development. Please check back later.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Booking;
