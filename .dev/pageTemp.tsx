import React from 'react';
import { Alex_Brush, Satisfy, Allison } from 'next/font/google';

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});
function pageTemp() {
  return (
    <main className='bg-steeldark-600 text-steelpolished-400'>
      {/* Main Container  */}
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-12 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900'>

        {/* Header */}
        <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>
          -Heading-
        </h1>

        {/* Sub Container  */}
        <section className='flex items-center justify-center'>
            Page content
        </section>
      </div>
    </main>
  );
}

export default pageTemp;