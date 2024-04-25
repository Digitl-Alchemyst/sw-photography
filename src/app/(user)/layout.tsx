import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css'
import Footer from '@/c/global/Footer';
import Sidebar from '@/c/global/Sidebar';
import MobileNav from '@/components/global/MobileNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Steven Watkins Photography',
  description: 'My Photography Portfolio',
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
