"use client"

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import ButtonGroup from '@/components/shared/ButtonGroup';
import OldVideo from '@/components/shared/OldVideo';
import TokenInfo from '@/components/shared/TokenInfo';


export default function Home() {

  return (
    <div className=' relative'>


      {/* Section 2: Icon and Name */}
      <div className="text-center py-5">
        <img src="dev_wif_hat_icon.png" alt="dev wif hat" className="w-20 h-20 md:w-40 md:h-40 mx-auto" />
        <h1 className='text-xl md:text-2xl lg:text-4xl my-4'>DevWifHat</h1>
        <p>You either die a dev or live long enough to see yourself turn into a maxi.</p>
        <div>
          <div className="flex flex-col justify-center  items-center gap-4 space-x-4 mt-5">
            <div className="flex flex-row items-center justify-center gap-4">
              <a href="https://twitter.com/thedevwifhat" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} size='2xl' />
              </a>
              <a href="https://t.me/thedevwifhat" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTelegram} size='2xl' />
              </a>
              <a href="https://birdeye.so/token/DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o?chain=solana" target="_blank" rel="noopener noreferrer">
                <img src="Birdeye_logo-01.png" alt="DevWifHatBirdeye" className="w-8 h-8" />
              </a>
            </div>
            <ButtonGroup />
          </div>
        </div>
      </div>


      <TokenInfo />
      <OldVideo />

    </div>
  );
}