import React from 'react'

function Footer() {
  return (
    <footer className='w-full bg-steeldark-700 px-10 py-10 text-steelpolished-200'>
      <div className='mx-auto justify-between gap-16 sm:flex'>
        {/* COLUMN 1 */}
        <div className='mt-16 flex basis-1/2 flex-col sm:mt-0'>
          <h4 className='text-2xl font-bold text-steelpolished-500'>
            Steven Watkins Photography
          </h4>
          <p className='my-5  flex-1 text-sm text-steelpolished-300'>
            Welcome to my photography portfolio! Im a photographer based in the
            United States. I love to capture the beauty of nature and the world
            around us.
          </p>
          <p>© 2023 Steven Watkins. All rights reserved.</p>
        </div>

        {/* COLUMN 2 */}
        <div className='mt-16 basis-1/4 sm:mt-0'>
          <h4 className='text-2xl font-bold text-steelflat-400'>Social Media</h4>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://twitter.com/DigitlAlchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://twitter.com/DigitlAlchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Youtube
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://twitter.com/DigitlAlchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://facebook.com/DigitalAlchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://facebook.com/DigitalAlchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitch
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://www.flowcode.com/page/digitalalchemyst'
              target='_blank'
              rel='noopener noreferrer'
            >
              Link Tree
            </a>
          </p>
        </div>

        {/* COLUMN 3 */}
        <div className='mt-16 basis-1/4 sm:mt-0'>
          <h4 className='text-2xl font-bold text-steelflat-400'>Contact</h4>
          <p className='my-5  text-sm text-steelflat-600'>
            <a
              href='https://discord.gg/SvcgPzTn8d'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discord
            </a>
          </p>
          <p className='my-3  text-sm text-steelflat-600'>
            <a
              href='mailto:digitalalchemiststudios@gmail.com?subject=Website%20Footer%20Contact'
              target='_blank'
              rel='noopener noreferrer'
            >
              Email
            </a>
          </p>
          <p className='my-3  text-sm text-steelflat-600'>
            <a href='tel:+1234567890'>+1 (720) 451-3767</a>
          </p>
          <p className='my-3  text-sm text-steelflat-600'>
            <a href='tel:+1234567890'>+1 (720) 930-3876</a>
          </p>
        </div>

        {/* COLUMN 2 */}
        <div className='mt-16 basis-1/4 sm:mt-0'>
          <h4 className='text-2xl font-bold text-steelflat-400'>Policies</h4>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              Orders
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              Returns
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              NFT Redemption
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              Terms of Service
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              Privacy Policy
            </a>
          </p>
          <p className='my-5  text-sm text-steelflat-600'>
            <a href='./' target='_blank' rel='noopener noreferrer'>
              Image/Video Licensing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer