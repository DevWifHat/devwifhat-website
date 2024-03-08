"use client"

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true); // Initial state is muted
  const videoRef = useRef(null); // Reference to the video element

  // Function to toggle mute state
  const toggleMute = () => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      const newState = !isMuted;
      // @ts-ignore
      currentVideo.muted = newState; // Set the video's muted property based on the new state
      setIsMuted(newState); // Update the state
    }
  };

  return (
    <div className='mt-20'>
      {/* Section 1: Header Links */}
      <header className="flex justify-center space-x-10 mb-10 text-2xl">
        <div><a href="#link1">events.</a></div>
        <div><a href="#link2">hackathons.</a></div>
        <div><a href="#link3">grants.</a></div>
      </header>

      {/* Section 2: Icon and Name */}
      <div className="text-center py-5">
        <img src="dev_wif_hat_icon.png" alt="dev wif hat" className="w-40 h-40 mx-auto" />
        <h1 className='text-4xl my-4'>DevWifHat</h1>
        <p>You either die a dev or live long enough to see yourself turn into a maxi.</p>
        <div>
          <div className="flex justify-center space-x-4 mt-5">
            <a href="https://twitter.com/thedevwifhat" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} size='2xl' />
            </a>
            <a href="https://t.me/thedevwifhat" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTelegram} size='2xl' />
            </a>
            <a href="https://birdeye.so/token/DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o?chain=solana" target="_blank" rel="noopener noreferrer">
              <img src="Birdeye_logo-01.png" alt="DevWifHatBirdeye" className="w-8 h-8" />
            </a>
            <button className="btn font-bold border border-white text-white bg-transparent rounded px-6" onClick={() => window.open('https://jup.ag/swap/SOL-DWH_DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o', '_blank')}>BUY $DWH</button>
          </div>
        </div>
      </div>

      {/* Section 3: Video inside a transparent frame */}
      <div className="mt-12 flex justify-center bg-contain bg-no-repeat h-125 relative">
        <video ref={videoRef} className="mt-25" style={{ maxWidth: '55%', height: 'auto' }} autoPlay muted={isMuted} loop>
          <source src="dev_wif_hat_teaser.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img src="Dev_Wif_Hat_Frame.png" alt="Frame" className="absolute top-0 left-1/2 transform -translate-x-1/2" style={{ maxWidth: '55%', height: 'auto' }} />
      </div>

      {/* Mute/Unmute Button */}
      <div className="text-center my-5">
        <button onClick={toggleMute} className="text-lg">
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} size="2x" />
        </button>
      </div>
    </div>
  );
}