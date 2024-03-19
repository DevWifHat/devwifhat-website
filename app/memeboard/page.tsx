'use client'

import galeryImages from '../../data/galeryImages.json';

import GaleryItem from './GaleryItem';
import Head from 'next/head';

export default function MemeBoard() {
  return (
    <>
      <Head>
        <title>$DWH Gallery - MemeBoard</title>
        <meta name="description" content="Explore the funniest and most creative memes from the devs wif hat community. Dive into the $DWH Gallery now!" />
        <meta property="og:title" content="$DWH Gallery - MemeBoard" />
        <meta property="og:description" content="Explore the funniest and most creative memes from the devs wif hat community. Dive into the $DWH Gallery now!" />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="$DWH Gallery - MemeBoard" />
        <meta property="twitter:description" content="Explore the funniest and most creative memes from the devs wif hat community. Dive into the $DWH Gallery now!" />
        <meta property="twitter:image" content="/path/to/your/twitter-image.jpg" />
      </Head>


      <main>
        <section className='w-full my-20'>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className='text-4xl font-bold'>$DWH Memeboard</h1>
            <span className='opacity-50'>The meme collection of devs wif hat community.</span>
          </div>
        </section>

        <section className="w-full my-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {galeryImages.map((image, index) => {
              return (
                <GaleryItem
                  key={index}
                  image={image}
                />
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}