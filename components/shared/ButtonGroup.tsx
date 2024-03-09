'use client'

import React from 'react'

const ButtonGroup = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4">
        <button className="btn font-bold border border-white text-white bg-white bg-opacity-0 hover:bg-opacity-10 rounded px-6" onClick={() => window.open('https://jup.ag/swap/SOL-DWH_DEVwHJ57QMPPArD2CyjboMbdWvjEMjXRigYpaUNDTD7o', '_blank')}>BUY $DWH</button>
      </div>
    </>
  )
}

export default ButtonGroup