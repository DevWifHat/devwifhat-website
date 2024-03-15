import React from 'react'

const Logo = () => {
  return (
    <a href="/" className="-m-1.5 p-1.5 flex flex-row items-center justify-center gap-2">
      <img src="dev_wif_hat_icon.png" alt="dev wif hat" className="w-14 h-14 mx-auto" />
      <span className='text-xl md:text-2xl lg:text-3xl'>DevWifHat</span>
    </a>
  )
}

export default Logo