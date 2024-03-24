import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/c/global/Footer';
import Header from '@/c/global/Header';
import Sidebar from '@/c/global/Sidebar';

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
      <body className={`scrollbar-hide ${inter.className}`}>
        <div className='flex h-screen w-full flex-col '>
          {/* <Header /> */}

          <div className='flex flex-1'>
            <Sidebar />

            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
