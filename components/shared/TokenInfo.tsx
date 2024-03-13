'use client'
import React from 'react'
import useTokenData from '@/hooks/useTokenData';
import { Skeleton } from 'antd';
import Chart from './Chart';

const TokenInfo = () => {
  const { holders, price, currentSupply, isLoading, fdmc, volume, error } = useTokenData();

  // Custom component for displaying either the value or a skeleton screen based on isLoading
  const DisplayValueOrSkeleton = ({ value, formatter = (val: any) => val }: { value: any, formatter?: (val: any) => any }) => (
    isLoading ? <Skeleton.Input style={{ width: 200, backgroundColor: 'rgba(255, 255, 255, 0.13)' }} active={true} size="large" /> : <h1 className='text-xl md:text-2xl'>{formatter(value)}</h1>
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-between gap-12 md:gap-0 mt-8 w-full mx-auto max-w-4xl">
      <div className="w-full px-4">
        <div className="flex flex-wrap justify-between bg-black">
          {/* per dwh */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full gap-2'>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/dev_wif_hat_icon.png" alt="" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>Price</p>
              </div>
              <div className="flex justify-end">
                $<DisplayValueOrSkeleton value={price} formatter={(val) => val.toFixed(7)} />
              </div>
            </div>
          </div>
          {/* holders */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full '>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/holders.svg" alt="" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>Holders</p>
              </div>
              <div className="flex justify-end">
                <DisplayValueOrSkeleton value={holders} />
              </div>
            </div>
          </div>
          {/* initial supply */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full gap-2'>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/initsupply.png" alt="initial supply" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>Initial Supply</p>
              </div>
              <div className="flex justify-end">
                <DisplayValueOrSkeleton value={"760,000,000"} />
              </div>
            </div>
          </div>
          {/* current supply */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full gap-2'>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/currentsupply.svg" alt="" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>Current Supply</p>
              </div>
              <div className="flex justify-end">
                <DisplayValueOrSkeleton value={currentSupply} formatter={(val) => Math.round(val / 10e5).toLocaleString()} />
              </div>
            </div>
          </div>
          {/* market cap */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full gap-2'>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/mc.png" alt="" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>Market Cap</p>
              </div>
              <div className="flex justify-end">
                <DisplayValueOrSkeleton value={fdmc} formatter={(val) => `$${val.toLocaleString()}`} />
              </div>
            </div>
          </div>
          {/* volume  */}
          <div className="w-1/2 flex justify-between items-start border p-6 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col justify-between h-full w-full gap-2'>
              <div className="flex flex-row items-center justify-start gap-2">
                <img src="/volume.svg" alt="" className='w-4 h-4 md:w-6 md:h-6' />
                <p className='opacity-50 text-xs md:text-base'>24H Volumen</p>
              </div>
              <div className="flex justify-end">
                <DisplayValueOrSkeleton value={volume} formatter={(val) => `$${val.toLocaleString()}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenInfo