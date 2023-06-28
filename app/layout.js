import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'
import Sidebar from '@/components/global/Sidebar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Steven Watkins Photography',
  description: 'My Photography Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>


<div className='flex-col flex w-full h-full'>
    <div className='flex items-center justify-center'>
  <Navbar />
  </div>
  <div className='flex flex-1'>
  <div className='flex items-center justify-center'>
        <Sidebar />
        </div>
        <div className='flex flex-col'>

        
        {/*  */}
<div className='flex-1'>
        {children}</div>
        <div className='flex items-center justify-center'></div>
        <Footer /></div>
        </div>

  </div>






        </body>
    </html>
  )
}
