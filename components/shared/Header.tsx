import { faXTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ButtonGroup from './ButtonGroup'

const Header = () => {
  return (
    <section className="w-full md:w-1/3 my-4">
      <div className="w-full px-4 flex flex-col items-start justify-start gap-4">
        <div className="w-full flex flex-row md:flex-col items-center md:items-start justify-start gap-8">
          <img src="dev_wif_hat_icon.png" alt="dev wif hat" className="w-20 h-20 md:w-40 md:h-40 lg:w-60 lg:h-60" />
          <div className="">
            <h1 style={{ textShadow: '0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red' }} className='text-xl md:text-2xl lg:text-6xl'>DevWifHat</h1>
            <span className='opacity-50 text-base md:text-lg lg:text-2xl'>$DWH</span>
          </div>
        </div>
        <p className='text-sm '>You either die a dev or live long enough to see yourself turn into a maxi.</p>
      </div>
      <div className="mt-4 w-full px-4 flex flex-row items-center justify-between gap-2">
        <button className='w-1/2 p-2 rounded-[8px] bg-gradient-to-r from-green-400 to-purple-500 font-black'>Buy $DWH</button>
        <button className='w-1/2 p-2 rounded-[8px] bg-gradient-to-r from-green-400 to-purple-500 font-black'>
          <a href="" className='bg-black w-full'>DAO</a>
        </button>
      </div>
      <div className="w-full px-4 mt-4 text-base md:text-lg">
        Gm $DWH family; We're the first DevCoin in Web3 and we are here for devs and founders, with a degen touch.
      </div>
      <div className='w-full px-4 mt-4'>
        <div className="w-full flex flex-col justify-center  items-center gap-4 space-x-4 mt-5">
          <button className="btn font-bold border border-white text-white  rounded p-2 bg-white bg-opacity-0 hover:bg-opacity-10 px-6 underline">
            <a href="https://jup.ag/swap/SOL-DWH_DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o" target='_blank' className='flex flex-row items-center justify-center gap-2'>
              Hatpaper
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </button>

          {/* <ButtonGroup /> */}
          <div className="w-full flex flex-row items-center justify-start gap-4 mt-4 ">
            <a href="https://twitter.com/thedevwifhat" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center justify-center gap-2'>
              <FontAwesomeIcon icon={faXTwitter} size='2xl' />
              <div className="flex flex-row items-center justify-center gap-2">
                Twitter
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
            <a href="https://t.me/thedevwifhat" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center justify-center gap-2'>
              <FontAwesomeIcon icon={faTelegram} size='2xl' />
              <div className="flex flex-row items-center justify-center gap-2">
                Telegram
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
            <a href="https://birdeye.so/token/DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o?chain=solana" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center justify-center gap-2'>
              <img src="Birdeye_logo-01.png" alt="DevWifHatBirdeye" className="w-8 h-8" />
              <div className="flex flex-row items-center justify-center gap-2">
                Birdeye
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Header