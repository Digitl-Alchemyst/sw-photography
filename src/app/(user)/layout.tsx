import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, PT_Serif } from 'next/font/google';
import '@/app/globals.css'
import Footer from '@/c/global/Footer';
import Sidebar from '@/c/global/Sidebar';
import MobileNav from '@/components/global/MobileNav';


const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
});
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
});
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
});

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
        className={`scrollbar-hide ${inter.className} ${mono.variable} ${sans.variable} ${serif.variable}`}
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