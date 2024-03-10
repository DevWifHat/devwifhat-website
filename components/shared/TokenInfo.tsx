'use client'
import React from 'react'
import useTokenData from '@/hooks/useTokenData';
import { Skeleton } from 'antd';
import Chart from './Chart';

const TokenInfo = () => {
  const { holders, price, currentSupply, isLoading, fdmc, volume, error } = useTokenData();

  // Custom component for displaying either the value or a skeleton screen based on isLoading
  const DisplayValueOrSkeleton = ({ value, formatter = (val: any) => val }: { value: any, formatter?: (val: any) => any }) => (
    isLoading ? <Skeleton.Input style={{ width: 200, backgroundColor: 'rgba(255, 255, 255, 0.13)' }} active={true} size="small" /> : <h1>{formatter(value)}</h1>
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-between gap-12 md:gap-0 my-20 w-full mx-auto max-w-4xl">
      <div className="w-full px-4">
        <div className="flex flex-wrap justify-between bg-black">
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={price} formatter={(val) => val.toFixed(7)} />
              <p className='opacity-50'>per $DWH</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={holders} />
              <p className='opacity-50'>Holders</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={"760,000,000"} />
              <p className='opacity-50'>Initial Supply</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={currentSupply} formatter={(val) => Math.round(val / 10e5).toLocaleString()} />
              <p className='opacity-50'>Current Supply</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={fdmc} formatter={(val) => `$${val.toLocaleString()}`} />
              <p className='opacity-50'>Market Cap</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center border p-4 bg-white bg-opacity-0 hover:bg-opacity-10">
            <div className='flex flex-col items-center justify-center gap-2'>
              <DisplayValueOrSkeleton value={volume} formatter={(val) => `$${val.toLocaleString()}`} />
              <p className='opacity-50'>24h Volume</p>
            </div>
          </div>
        </div>
      </div>
      <Chart />
    </div>
  )
}

export default TokenInfo