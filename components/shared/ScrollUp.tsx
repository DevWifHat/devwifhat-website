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
    <div onClick={scrollToTop} style={{ cursor: 'pointer' }} className='bounce my-20 w-full flex flex-row items-center justify-center gap-8 text-6xl font-black '
    >
      <span className='font-black'>UP ONLY</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </div>
  );
};

export default ScrollUp;