import Head from 'next/head';
import { grants } from '../../data/grants';
import Link from 'next/link';

export default function GrantsPage() {


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

      <main>
        {/* Your content goes here */}
        {/* Title */}
        <section className='w-full my-20'>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className='text-4xl font-bold'>$DWH Grants</h1>
            <span className='opacity-50'>Supporting the movement.</span>
          </div>
        </section>
        {/* Grants */}
        <section className='w-full my-20'>
          <div className="w-full flex flex-col items-center justify-center">
            {/* Grants go here */}
            <div className="w-full grid grid-cols-1 px-2 gap-2 lg:gap-4">
              {grants.map((grant, index) => {
                return (
                  <div key={index} className="w-full flex flex-col md:flex-row items-center justify-center gap-8 p-4 border border-gray-100 border-opacity-50 rounded-xl">
                    <div className="w-full md:w-1/4">
                      <img src={grant.imageUrl} alt={grant.name} className="w-full h-auto object-cover border p-2 rounded-xl" />
                    </div>
                    <div className="w-full md:w-3/4 flex flex-col items-start justify-start gap-8 my-4">
                      <div className="">
                        <h2 className="text-2xl font-bold">{grant.name}</h2>
                        <p className='opacity-50'>{grant.description}</p>
                      </div>

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p>Category: {grant.category}</p>
                        <p>Amount: {grant.amount}</p>
                        <p>Deadline: {grant.deadline}</p>
                        <p>Contact: {grant.contact.name} ({grant.contact.email})</p>
                        <p className='opacity-80'>Tags: {grant.tags.join(', ')}</p>
                      </div>

                      <div className="w-full">
                        <button className='btn uppercase'>
                          <Link href={`/grants/${grant.name.replace(/\s+/g, '-')}`}>
                            Learn More
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}