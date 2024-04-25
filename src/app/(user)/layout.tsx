import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css'
import Footer from '@/c/global/Footer';
import Sidebar from '@/c/global/Sidebar';
import MobileNav from '@/components/global/MobileNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Steven Watkins Photography`,
  description: '',
  keywords: '',
  publisher: 'Digitl Alchemyst',

  openGraph: {
    title: `Steven Watkins Photography`,
    description: '',
    url: `https://sw-photography.vercel.app/`,
    siteName: 'Steven Watkins Photography',
    images: {
      url:'',
      width: 1200,
      height: 6300,
      alt: '',
    },
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: `Steven Watkins Photography`,
    description: '',
    siteId: '@DigitlAlchemyst',
    creator: '@DigitlAlchemyst',
    creatorId: '@DigitlAlchemyst',
    images: {
      url:  '',
      alt: '',
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
      <body
        className={`scrollbar-hide ${inter.className}`}
      >
        <div className='flex h-screen w-screen flex-1 flex-col'>
          <div className='flex flex-1 '>
            <Sidebar />
            <MobileNav />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
