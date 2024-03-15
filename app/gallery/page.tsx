'use client'
import { toast } from 'sonner';

export default function GaleryPage() {

  const galeryImages = [
    {
      id: 1,
      name: 'Batman',
      src: '/images/galery/batman.jpg',
    },
    {
      id: 2,
      name: 'Joker',
      src: '/images/galery/coma.jpg',
    },
    {
      id: 3,
      name: 'All Needed',
      src: '/images/galery/allneed.jpg',
    },
    // Removed the duplicate Joker entry as it's the same as id: 2
    {
      id: 4,
      name: 'Dev Without Hat',
      src: '/images/galery/devwifouthat.jpeg',
    },
    {
      id: 5,
      name: 'Superman',
      src: '/images/galery/devwifouthatdead.jpeg',
    },
    {
      id: 6,
      name: 'Dollar',
      src: '/images/galery/dollar.jpg',
    },
    {
      id: 7,
      name: 'Foot',
      src: '/images/galery/foot.jpg',
    },
    {
      id: 8,
      name: 'Holder',
      src: '/images/galery/holder.jpeg',
    },
    {
      id: 9,
      name: 'DWH Party',
      src: '/images/galery/dwhparty.png',
    },
    {
      id: 10,
      name: 'Button DWH',
      src: '/images/galery/buttondwh.png',
    },
    {
      id: 11,
      name: 'Change Mind DWH',
      src: '/images/galery/changeminddwh.png',
    },
    {
      id: 12,
      name: 'Pirate',
      src: '/images/galery/pirate.jpg',
    },
    {
      id: 13,
      name: 'Potter',
      src: '/images/galery/potter.jpg',
    },
    {
      id: 14,
      name: 'Pump',
      src: '/images/galery/pump.jpg',
    },
    {
      id: 15,
      name: 'Rich',
      src: '/images/galery/rich.jpg',
    },
    {
      id: 16,
      name: 'The Hat Stays On',
      src: '/images/galery/thehatstayson.jpeg',
    },
    {
      id: 17,
      name: 'Trump',
      src: '/images/galery/trump.jpg',
    },
    {
      id: 18,
      name: 'Who Is',
      src: '/images/galery/whois.jpeg',
    },
    {
      id: 19,
      name: 'Yoda',
      src: '/images/galery/yoda.png',
    },
    {
      id: 20,
      name: 'Yoda With Hat',
      src: '/images/galery/yodawifhat.jpg',
    },
    {
      id: 20,
      name: 'Yoda With Hat',
      src: '/images/galery/airdrop.jpg',
    },
    {
      id: 20,
      name: 'Yoda With Hat',
      src: '/images/galery/walking.jpg',
    }

  ];


  const copyImageToClipboard = async (imageUrl: string) => {
    try {
      const imageFetch = await fetch(imageUrl);
      if (!imageFetch.ok) throw new Error('Network response was not ok.');
      const imageBlob = await imageFetch.blob();
      console.log('Image Blob:', imageBlob);
      await navigator.clipboard.write([
        new ClipboardItem({
          [imageBlob.type]: imageBlob
        })
      ]);
      toast.success('Image copied to clipboard!');

    } catch (err) {
      console.error('Error copying image:', err);
      toast.error('Failed to copy image.');
    }
  };

  return (
    <>
      <section className='w-full my-20'>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className='text-4xl font-bold'>$DWH Gallery</h1>
          <span className='opacity-50'>The meme collection of devs wif hat</span>
        </div>
      </section>

      <section className="w-full my-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {galeryImages.map((image, index) => {
            return (
              <div key={index} className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900 p-2 border border-white border-opacity-50 rounded-xl">
                <img src={image.src} alt={image.name} className="w-full h-full object-cover rounded-2xl" />
                <div className="w-full flex flex-row items-center justify-between gap-4">
                  {/* Copy to clipboard - not fully supported */}
                  {/* <button
                    className='w-1/2 flex flex-row items-center justify-center gap-2 border border-white rounded-xl py-2 bg-white bg-opacity-0 hover:bg-opacity-10'
                    onClick={() => copyImageToClipboard(image.src)}
                  >
                    Copy
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                  </button> */}
                  {/* Share */}
                  {/* <button className='w-1/2 border border-white rounded-xl py-2 bg-white bg-opacity-0 hover:bg-opacity-10'>
                    Share on X
                  </button> */}
                  {/* Download */}
                  <a
                    href={image.src}
                    download
                    className='w-full flex flex-row items-center justify-center gap-2 border border-white bg-black rounded-xl py-2 hover:bg-white bg-opacity-0 hover:bg-opacity-10'
                  >
                    Download
                    {/* SVG for Download Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l3.5-3.5M12 15l-3.5-3.5m3.5 3.5V3m6 18H6a2 2 0 01-2-2V6a2 2 0 012-2h3.5m8.5 0H18a2 2 0 012 2v12a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}