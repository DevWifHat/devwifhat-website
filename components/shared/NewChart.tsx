'use client'

import React from 'react'
import { toast } from 'sonner';

const NewChart = () => {

  function truncateMiddle(text: string, startChars = 3, endChars = 3, separator = '...') {
    if (text.length <= startChars + endChars) {
      return text;
    }
    return `${text.substring(0, startChars)}${separator}${text.substring(text.length - endChars)}`;
  }

  const handleDivClick = async (fullAddress: string) => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      toast.success('Copied to clipboard'); // Show toast message
      window.open(`https://solscan.io/account/${fullAddress}`, '_blank');
    } catch (error) {
      toast.error('Failed to copy'); // Show error toast if copy fails
    }
  };

  const liquidity = 'DevwHyy46NcEduCJ32WwsJFUirifWgvSdSGUNEj6DrVM';
  const ecosystemGrants = 'M2Ec2AF6YymvKuCtNDrKhHGivcr3UXavthqnsJ9Pm9c'
  const founders = 'GQYTML41FGmURjRUpHhyGKKZQwAz1688ioMo99Y174nD'
  const marketing = '4ttnXjwWHd18TnctDWprvFbuifW2qWwhZMn6ZnfzzRqV'
  const airdrops = 'CnwUCTGTMDhWpoGxGkLh76i9FeCzHb69xAyUk5NZHfqk'
  const ecosystemdevelopment = '42uTUpwpRTimtP6L7EYF8JKDhrMxVFgyEFGSAmTbrvQX'


  return (
    <section className='w-full relative'>

      <img src="/chart.png" alt="" className='hidden lg:block w-full relative z-10' />
      <img src="/devmask.png" alt="" className='absolute z-0 inset-0 w-full' />
      <img src="/chartmobile.png" alt="" className='block lg:hidden w-full p-4 relative z-10' />
      <div className="w-full flex lg:hidden flex-col items-center justify-start gap-4 my-4 relative z-10 text-opacity-60">
        {/* Liquidity */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#E63946] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs hover:opacity-80'>
              Liquidity
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 " onClick={() => handleDivClick(liquidity)}>
            <span className='text-xs'>{truncateMiddle(liquidity)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        {/* Ecosystem Grants  */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#698EFF] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs'>
              Ecosystem Grants
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1" onClick={() => handleDivClick(ecosystemGrants)}>
            <span className='text-xs'>{truncateMiddle(ecosystemGrants)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        {/* Founders Vesting  */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#F18500] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs'>
              Founders Vesting
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1" onClick={() => handleDivClick(founders)}>
            <span className='text-xs'>{truncateMiddle(founders)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        {/* Marketing & Operations  */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#00A084] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs'>
              Marketing & Operations
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1" onClick={() => handleDivClick(marketing)}>
            <span className='text-xs'>{truncateMiddle(marketing)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        {/* Airdrops  */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#6D6875] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs'>
              Airdrops
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1" onClick={() => handleDivClick(airdrops)}>
            <span className='text-xs'>{truncateMiddle(airdrops)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        {/* Ecosystem Development  */}
        <div className="w-full flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#353535] h-2 w-5 rounded-sm border border-white"></div>
            <a href="" className='flex flex-row items-center justify-center gap-1 text-xs'>
              Ecosystem Development
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-1" onClick={() => handleDivClick(ecosystemdevelopment)}>
            <span className='text-xs'>{truncateMiddle(ecosystemdevelopment)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewChart