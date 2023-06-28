import React from 'react'
import { SocialIcon } from 'react-social-icons'


const Props = {
    isDark: false,
    isMid: false
  };
  
  const SocialLinks = ({ isDark, isMid = false }) => {
  return (
    <div className='flex justify-between items-center gap-4 mx-5'>
        <SocialIcon 
            network="twitter" 
            bgColor="transparent" 
            fgColor='#64748b'
            url='https://twitter.com/DigitlAlchemyst'  
        />
        <SocialIcon
            network="facebook"
            bgColor="transparent"
            fgColor='#64748b'
            url='https://www.facebook.com/DigitalAlchemyst'
        />
        <SocialIcon
            network="instagram"
            bgColor="transparent"
            fgColor='#64748b'
            url='https://www.instagram.com/digital_alchemyst/'
        />
        {/* <SocialIcon
            network="discord"
            bgColor="none"
            fgColor='#64748b'
            url='https://discord.gg/vagabondgpt'
        /> */}
        <SocialIcon
            network="youtube"
            bgColor="transparent"
            fgColor='#64748b'
            url='https://www.youtube.com/@DigitalAlchemyst'
        />
        <SocialIcon
            network="twitch"
            bgColor="transparent"
            fgColor='#64748b'
            url='https://twitch.tv/'
        />
    </div>
  )
}

export default SocialLinks