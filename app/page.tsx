"use client"

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

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
    <main style={{
      backgroundColor: '#141414',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("dev_wif_hat_bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <video ref={videoRef} width="1000" autoPlay muted={isMuted} loop>
        <source src="dev_wif_hat_teaser.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={toggleMute} style={{ marginTop: '20px', fontSize: '24px' }}> {/* Adjust button style for larger icons */}
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} size="2x" /> {/* Use FontAwesomeIcon with size */}
      </button>
    </main>
  );
}