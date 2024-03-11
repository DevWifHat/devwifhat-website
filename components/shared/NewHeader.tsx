import React from 'react'
import TokenInfo from './TokenInfo'

const HeaderImage = () => {
  return (
    <section className='w-full my-4 max-w-7xl mx-auto'>
      <img src="/dwhheader.png" alt="" className='w-full h-auto' />
      <div className="w-full hidden lg:flex">
        <TokenInfo />
      </div>
    </section>
  )
}

export default HeaderImage