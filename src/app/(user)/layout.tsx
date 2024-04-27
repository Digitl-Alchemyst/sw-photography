import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css'
import Footer from '@/c/global/Footer';
import Sidebar from '@/c/global/Sidebar';
import MobileNav from '@/components/global/MobileNav';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });


const baseURL = process.env.NEXT_PUBLIC_METADATA_BASE_URL;
export const metadata: Metadata = {
  title: `Steven Watkins Photography`,
  description:
    'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
  keywords:
    'Photographer, Portfolio, Steven Watkins, Steven Watkins Photography, Landscape Photographer, Photojournalist, Photography, Journalist Landscape Photography, Journalist Photography, Photographer Landscape Photography, Colorado Photographer, Colorado Landscape Photography, Colorado Journalist, Colorado Photography',
  publisher: 'Digitl Alchemyst',

  openGraph: {
    title: `Steven Watkins Photography`,
    description:
      'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
    url: baseURL,
    siteName: 'Steven Watkins Photography',
    images: {
      url: `${baseURL}Profile.jpg`,
      width: 1200,
      height: 6300,
      alt: 'SW-Photography Profile Photo',
    },
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: `Steven Watkins Photography`,
    description:
      'As a landscape photographer, my journey is a testament to my unwavering passion for capturing the breathtaking beauty of our natural world. From my early years exploring the scenic landscapes near my hometown to my formal education in photography, I have continuously honed my technical skills and artistic vision. With a deep reverence for nature, I strive to convey its raw, untamed beauty through bold compositions and vibrant colors. My work has been recognized in various publications and exhibitions, but beyond accolades, my ultimate goal is to inspire others to connect with and protect our planet. Through my lens, I aim to freeze fleeting moments in time, inviting viewers to embark on their own journey of discovery and appreciation for the wonders that surround us.',
    siteId: '@DigitlAlchemyst',
    creator: '@DigitlAlchemyst',
    creatorId: '@DigitlAlchemyst',
    images: {
      url: '/Profile.jpg',
      alt: 'SW-Photography Profile Photo',
    },
  },

  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <body className={`scrollbar-hide ${inter.className}`}>
        <div className='flex h-screen w-screen flex-1 flex-col'>
          <div className='flex flex-1 '>
            <Sidebar />
            <MobileNav />
            {draftMode().isEnabled && (

<></>
            )}
            {children}
            {draftMode().isEnabled && <VisualEditing />}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
