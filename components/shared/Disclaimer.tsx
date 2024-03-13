'use client'

import React, { useEffect, useState } from 'react'


const Disclaimer = () => {

  const [accepted, setAccepted] = useState(localStorage.getItem('disclaimerAccepted') === 'true');

  // Effect hook to run once component mounts
  useEffect(() => {
    // Check localStorage for the disclaimerAccepted flag
    const isAccepted = localStorage.getItem('disclaimerAccepted') === 'true';
    setAccepted(isAccepted);

    // Optionally, handle the overflow style here to ensure it runs on the client side
    if (isAccepted) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const acceptDisclaimer = () => {
    setAccepted(true);
    localStorage.setItem('disclaimerAccepted', 'true');
    document.body.style.overflow = 'auto';
  };

  if (accepted) {
    return null;
  }

  return (
    <>
      {!accepted && <div className='w-screen h-screen absolute z-[99] flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-xl'>
        <div className="w-[80%] lg:w-[60%] min-h-[50%] max-h-[80%] overflow-y-scroll flex flex-col items-center justify-start gap-8 bg-black rounded-xl border border-white p-6 py-10 -mt-20">
          <span className='lg:max-w-[90%] mx-auto'>
            This website is operated by DevWiFhat.
            <br />
            <br />
            The views and content presented here reflect the opinions of DevWiFhat alone. DevWiFhat makes no guarantees regarding the accuracy, completeness, or currency of the information on this site. Furthermore, DevWiFhat assumes no responsibility for the content and categorically denies any liability for any damages arising from engaging with, referencing, or depending on any information found herein. This site does not serve as an offer to buy or an invitation to sell, nor does it recommend the purchase or sale of any token or product. The nature of buying and selling tokens involves substantial risk, and holders must be prepared to accept the possibility of complete loss.
            <br />
            <br />
            The creators of this site, DevWiFhat, and any contributors to the DWH project shall not be held liable for any financial losses or taxes that might be incurred by holders, buyers, or sellers of the $DWH currency. The DWH operates entirely on-chain, underscoring its decentralized essence. To the fullest extent permitted by law, both the DWH and DevWiFhat emphatically disclaim any implied warranties, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement, as well as any warranties arising from the conduct of dealings, or usage in trade.
            <br />
            <br />
            Access to and use of DWH products, including the $DWH token, NFTs, and any associated staking or rewards, is strictly forbidden for residents of China, Belarus, The Central African Republic, The Democratic Republic of Congo, The Democratic People&apos;s Republic of Korea, The Crimea region of Ukraine, Cuba, Iran, Libya, Somalia, Sudan, South Sudan, Syria, The USA, Yemen, Zimbabwe, and any other jurisdictions where DWH products are legally restricted or prohibited. By utilizing DWH products, you affirm that you do not reside in any such prohibited jurisdictions. It is advised to consult local laws and regulations before engaging in any cryptocurrency transactions.

          </span>

          <button onClick={acceptDisclaimer} className='bg-black hover:bg-white hover:bg-opacity-10 border border-white rounded-md text-white px-8 py-3'>Accept the terms</button>
        </div>
      </div>}
    </>
  )
}

export default Disclaimer