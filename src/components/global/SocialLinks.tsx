import React from 'react';
import { SocialIcon } from 'react-social-icons';

const SocialLinks = () => {
  return (
    <div className='flex items-center justify-between'>
      <SocialIcon
        network='instagram'
        bgColor='transparent'
        fgColor='#7b7b7d'
        url='https://www.instagram.com/digital_alchemyst/'
        style={{
          height: 40,
          width: 40,
        }}
        className='transition-all duration-300 hover:text-accent2'
      />
      <SocialIcon
        network='twitter'
        bgColor='transparent'
        fgColor='#7b7b7d'
        url='https://twitter.com/DigitlAlchemyst'
        style={{ height: 40, width: 40 }}
      />
      <SocialIcon
        network='facebook'
        bgColor='transparent'
        fgColor='#7b7b7d'
        url='https://www.facebook.com/DigitalAlchemyst'
        style={{ height: 40, width: 40 }}
      />
      <SocialIcon
        network='youtube'
        bgColor='transparent'
        fgColor='#7b7b7d'
        url='https://www.youtube.com/@DigitalAlchemyst'
        style={{ height: 40, width: 40 }}
      />
      {/* <SocialIcon
            network="discord"
            bgColor="none"
            fgColor='#7b7b7d'
            url='https://discord.gg/vagabondgpt'
            style={{ height: 40, width: 40, }}
        /> */}
      {/* <SocialIcon
        network='twitch'
        bgColor='transparent'
        fgColor='#7b7b7d'
        url='https://twitch.tv/'
        style={{ height: 40, width: 40, }}
      /> */}
    </div>
  );
};

export default SocialLinks;
