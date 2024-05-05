import React from 'react';
import Script from 'next/script';
const Instagram = () => {
  return (
    <>
      <div
        className='tagembed-widget w-full px-12 py-8'
        data-widget-id='142726'
        view-url='https://widget.tagembed.com/142726'
      />
      <Script src='//widget.tagembed.com/embed.min.js' async defer type='text/javascript' />
    </>
  );
};

export default Instagram;

// Instagram Feed provided by Tagembed. Try it for free on https://tagembed.com/
