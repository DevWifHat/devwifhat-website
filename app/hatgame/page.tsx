import Head from 'next/head';

export default function Hatpaper() {
  return (
    <>
      <Head>
        <title>HatGame.</title>
        <meta name="description" content="The HatGame" />
        <meta property="og:title" content="The HatGame" />
        <meta property="og:description" content="The HatGame" />
        <meta property="og:image" content="e/dev_wif_hat_icon.png" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="The HatGame" />
        <meta property="twitter:description" content="The HatGame" />
        <meta property="twitter:image" content="/dev_wif_hat_icon.png" />

        {/* Add any additional metadata here */}
      </Head>
      {/* Add your page content here */}
      <main>
        <h1>The HatGame</h1>
        <p>Coming soon...</p>
      </main>
    </>
  )
}