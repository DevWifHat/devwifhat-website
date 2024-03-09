import React from 'react'
import useTokenData from '@/hooks/useTokenData';
import { Spin } from 'antd';


const TokenInfo = () => {
  const { holders, price, currentSupply, isLoading, fdmc, volume, error } = useTokenData();

  return (
    <div className="flex justify-center my-5 w-full mx-auto max-w-xl">
      <div className="w-full px-4">
        <div className="flex flex-wrap justify-between bg-black">
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1>{price.toFixed(7)}</h1>
              <p className='opacity-50'>per $DWH</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1>{isLoading ? <Spin /> : holders}</h1>
              <p className='opacity-50'>Holders</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1>760,000,000</h1>
              <p className='opacity-50'>Initial Supply</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1>{Math.round(currentSupply / 10e5).toLocaleString()}</h1>
              <p className='opacity-50'>Current Supply</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
              <div className='flex flex-col items-center justify-center gap-2'>
                <h1>${fdmc.toLocaleString()}</h1>
                <p className='opacity-50'>Market Cap</p>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
              <div className='flex flex-col items-center justify-center gap-2'>
                <h1>${volume.toLocaleString()}</h1>
                <p className='opacity-50'>24h Volume</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TokenInfo