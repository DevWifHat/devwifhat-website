import Head from 'next/head';

export default function Hatpaper() {
  return (
    <>
      <Head>
        <title>Hatpaper - A Visual Journey</title>
        <meta name="description" content="Dive into the visual journey of the devwifhat Hatpaper." />
        <meta property="og:title" content="Hatpaper - A Visual Journey" />
        <meta property="og:description" content="Dive into the visual journey of Hatpaper." />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Hatpaper - A Visual Journey" />
        <meta property="twitter:description" content="Dive into the visual journey of Hatpaper." />
        <meta property="twitter:image" content="/path/to/your/twitter-image.jpg" />
        {/* Add any additional metadata here */}
      </Head>
      <img src="/1.png" alt="1" className='w-full' />
      <img src="/2.png" alt="2" className='w-full' />
      <img src="/3.png" alt="3" className='w-full' />
      <img src="/4.png" alt="4" className='w-full' />
    </>
  )
}