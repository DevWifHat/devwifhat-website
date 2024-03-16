'use client'
import { toast } from 'sonner';
import GaleryItem from './GaleryItem';

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
              <GaleryItem
                key={index}
                image={image}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}