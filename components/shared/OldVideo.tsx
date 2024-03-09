'use client'

import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useRef, useState } from 'react'

const OldVideo = () => {
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
    <div className=''>
      <div className="mt-12 flex justify-center bg-contain bg-no-repeat h-125 relative">
        {/* Video and button container */}
        <div className="relative" style={{ maxWidth: '55%' }}>
          <video ref={videoRef} className="mt-25" style={{ width: '100%', height: 'auto' }} autoPlay muted={isMuted} loop>
            <source src="dev_wif_hat_teaser.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img src="Dev_Wif_Hat_Frame.png" alt="Frame" className="absolute top-0 left-1/2 transform -translate-x-1/2" style={{ width: '100%', height: 'auto' }} />
          {/* Button positioned at the top right corner of the video */}
          <div className="text-center my-5 absolute right-4 top-0">
            <button onClick={toggleMute} className="text-md">
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} size="1x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OldVideo