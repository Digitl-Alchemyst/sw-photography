import '@/app/globals.css';
export const metadata = {
  title: 'Studio',
  description: 'Steven Watkins Photography | CMS Studio',
};

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
