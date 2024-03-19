'use client'

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { grants } from '../../../data/grants';

export default function GrantsItemPage({ params }: { params: { slug: string } }) {
  const grant = grants.find((grant) => grant.name.replace(/\s+/g, '-') === params.slug);
  const name = grant?.name.replace('-', ' ');

  return (
    <>
      <Head>
        <title>$DWH Grants.</title>
        <meta name="description" content="$DWH Grants to support the movement." />
        <meta property="og:title" content="$DWH Grants - Supporting the " />
        <meta property="og:description" content="Explore the funniest and most creative memes from the devs wif hat community. Dive into the $DWH Gallery now!" />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="$DWH Gallery - MemeBoard" />
        <meta property="twitter:description" content="Explore the funniest and most creative memes from the devs wif hat community. Dive into the $DWH Gallery now!" />
        <meta property="twitter:image" content="/path/to/your/twitter-image.jpg" />
        {/* Add any additional metadata here */}
      </Head>

      <main className='w-full my-20'>
        {/* Your content goes here */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 lg:gap-8 border border-opacity-50 rounded-xl">
          <div className="w-full px-2 flex flex-col items-start justify-start gap-2 p-2 lg:p-4">
            <span className='opacity-30 text-base uppercase'>$DWH Grant</span>
            <h1 className='text-4xl font-bold'>{name}</h1>
            <span className='opacity-50'>{grant?.description}</span>
            <div className="flex flex-row items-center justify-start gap-2">
              <span className='text-lg font-bold'>{grant?.amount}</span>
              <span className='text-lg font-bold'>DWH</span>
              <>
                <span className='text-xs font-bold opacity-50'>- xxx USD</span>
              </>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 my-10">
              <p><span className='lowercase opacity-50'>Category:</span> {grant?.category}</p>
              <p><span className='lowercase opacity-50'>Amount:</span>{grant?.amount}</p>
              <p><span className='lowercase opacity-50'>Deadline:</span> {grant?.deadline}</p>
              <p><span className='lowercase opacity-50'>Contact:</span> {grant?.contact.name} ({grant?.contact.email})</p>
              <p className='opacity-20 col-span-1 lg:col-span-3'>
                {/* <span className='lowercase'>Tags:</span> */}
                {grant?.tags.join(', ')}</p>
            </div>
          </div>

          <div className="w-full">
            <img src={grant?.imageUrl} alt={name} className='h-fit max-h-[320px] w-full object-cover' />
          </div>
        </div>

        <div className="w-full my-10 border border-opacity-50 p-2 lg:p-4 rounded-xl">
          {grant?.richTextDescription}
        </div>

        <div className="w-full my-10 border border-opacity-50  rounded-xl">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            {grant?.moreImageUrls.map((imageUrl, index) => {
              return (
                <div key={index} className="w-full">
                  <img src={imageUrl} alt={name} className='h-fit max-h-[320px] w-full object-cover' />
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}