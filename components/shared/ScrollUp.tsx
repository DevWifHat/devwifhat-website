'use client'

import React from 'react';

const ScrollUp = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for a smooth scrolling
    });
  };

  return (
    <div onClick={scrollToTop} style={{ cursor: 'pointer' }} className='w-full flex flex-row  items-center justify-center gap-8 text-6xl mt-10 font-black'
    >
      <span>UP ONLY</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </div>
  );
};

export default ScrollUp;