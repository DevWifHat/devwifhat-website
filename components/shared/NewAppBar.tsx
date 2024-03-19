'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'

const navigation = [
  { name: 'HatPaper.', href: '/hatpaper' },
  { name: 'BurnBoard.', href: '/burnboard' },
  { name: 'MemeBoard.', href: '/memeboard' },
  { name: 'Grants.', href: '/grants' },
]

export default function NewAppBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <header className="bg-black border-b border-b-white border-opacity-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        {/* <div className="hidden lg:flex">
          <button className='bg-white bg-opacity-0 hover:bg-opacity-10'>
            <a href="https://t.co/lT4QYJIuYR" className='border border-white border-opacity-50 rounded-[6px] p-2 md:px-4 text-sm md:text-base flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text'>
              Join the Movement
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3646 6.0299L0.597563 10.7969C0.526053 10.8661 0.469028 10.9487 0.429814 11.0402C0.3906 11.1316 0.369983 11.2299 0.369166 11.3293C0.368349 11.4288 0.387348 11.5274 0.425055 11.6194C0.462762 11.7115 0.518421 11.7951 0.588786 11.8654C0.65915 11.9357 0.74281 11.9913 0.834885 12.0289C0.926959 12.0665 1.0256 12.0854 1.12506 12.0845C1.22452 12.0836 1.3228 12.0629 1.41417 12.0236C1.50554 11.9843 1.58817 11.9272 1.65724 11.8556L6.95361 6.55924C7.09388 6.41879 7.17267 6.2284 7.17267 6.0299C7.17267 5.8314 7.09388 5.64101 6.95361 5.50056L1.65724 0.203193C1.5159 0.0668103 1.32665 -0.00860314 1.13025 -0.00680449C0.933844 -0.00500583 0.746006 0.0738609 0.607188 0.212809C0.468371 0.351757 0.389681 0.53967 0.388068 0.736073C0.386454 0.932476 0.462046 1.12166 0.598562 1.26287L5.3646 6.0299ZM7.7576 9.48557C7.55894 9.48557 7.36841 9.56449 7.22794 9.70497C7.08746 9.84545 7.00854 10.036 7.00854 10.2346C7.00854 10.4333 7.08746 10.6238 7.22794 10.7643C7.36841 10.9048 7.55894 10.9837 7.7576 10.9837H13.2507C13.4494 10.9837 13.6399 10.9048 13.7804 10.7643C13.9209 10.6238 13.9998 10.4333 13.9998 10.2346C13.9998 10.036 13.9209 9.84545 13.7804 9.70497C13.6399 9.56449 13.4494 9.48557 13.2507 9.48557H7.7576Z" fill="#848D97" />
              </svg>
            </a>
          </button>
        </div> */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white py-2 border-b border-b-white border-opacity-0 hover:border-opacity-100 transition-all duration-300 ease-in-out">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className='bg-white bg-opacity-0 hover:bg-opacity-10'>
            <a href="https://t.co/lT4QYJIuYR" className='border border-white border-opacity-50 rounded-[6px] p-2 md:px-4 text-sm md:text-base flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text'>
              Join the Movement
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3646 6.0299L0.597563 10.7969C0.526053 10.8661 0.469028 10.9487 0.429814 11.0402C0.3906 11.1316 0.369983 11.2299 0.369166 11.3293C0.368349 11.4288 0.387348 11.5274 0.425055 11.6194C0.462762 11.7115 0.518421 11.7951 0.588786 11.8654C0.65915 11.9357 0.74281 11.9913 0.834885 12.0289C0.926959 12.0665 1.0256 12.0854 1.12506 12.0845C1.22452 12.0836 1.3228 12.0629 1.41417 12.0236C1.50554 11.9843 1.58817 11.9272 1.65724 11.8556L6.95361 6.55924C7.09388 6.41879 7.17267 6.2284 7.17267 6.0299C7.17267 5.8314 7.09388 5.64101 6.95361 5.50056L1.65724 0.203193C1.5159 0.0668103 1.32665 -0.00860314 1.13025 -0.00680449C0.933844 -0.00500583 0.746006 0.0738609 0.607188 0.212809C0.468371 0.351757 0.389681 0.53967 0.388068 0.736073C0.386454 0.932476 0.462046 1.12166 0.598562 1.26287L5.3646 6.0299ZM7.7576 9.48557C7.55894 9.48557 7.36841 9.56449 7.22794 9.70497C7.08746 9.84545 7.00854 10.036 7.00854 10.2346C7.00854 10.4333 7.08746 10.6238 7.22794 10.7643C7.36841 10.9048 7.55894 10.9837 7.7576 10.9837H13.2507C13.4494 10.9837 13.6399 10.9048 13.7804 10.7643C13.9209 10.6238 13.9998 10.4333 13.9998 10.2346C13.9998 10.036 13.9209 9.84545 13.7804 9.70497C13.6399 9.56449 13.4494 9.48557 13.2507 9.48557H7.7576Z" fill="#848D97" />
              </svg>
            </a>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button className='bg-white bg-opacity-0 hover:bg-opacity-10'>
                  <a href="https://t.co/lT4QYJIuYR" className='border border-white border-opacity-50 rounded-[6px] p-2 md:px-4 text-sm md:text-base flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text'>
                    Join the Movement
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.3646 6.0299L0.597563 10.7969C0.526053 10.8661 0.469028 10.9487 0.429814 11.0402C0.3906 11.1316 0.369983 11.2299 0.369166 11.3293C0.368349 11.4288 0.387348 11.5274 0.425055 11.6194C0.462762 11.7115 0.518421 11.7951 0.588786 11.8654C0.65915 11.9357 0.74281 11.9913 0.834885 12.0289C0.926959 12.0665 1.0256 12.0854 1.12506 12.0845C1.22452 12.0836 1.3228 12.0629 1.41417 12.0236C1.50554 11.9843 1.58817 11.9272 1.65724 11.8556L6.95361 6.55924C7.09388 6.41879 7.17267 6.2284 7.17267 6.0299C7.17267 5.8314 7.09388 5.64101 6.95361 5.50056L1.65724 0.203193C1.5159 0.0668103 1.32665 -0.00860314 1.13025 -0.00680449C0.933844 -0.00500583 0.746006 0.0738609 0.607188 0.212809C0.468371 0.351757 0.389681 0.53967 0.388068 0.736073C0.386454 0.932476 0.462046 1.12166 0.598562 1.26287L5.3646 6.0299ZM7.7576 9.48557C7.55894 9.48557 7.36841 9.56449 7.22794 9.70497C7.08746 9.84545 7.00854 10.036 7.00854 10.2346C7.00854 10.4333 7.08746 10.6238 7.22794 10.7643C7.36841 10.9048 7.55894 10.9837 7.7576 10.9837H13.2507C13.4494 10.9837 13.6399 10.9048 13.7804 10.7643C13.9209 10.6238 13.9998 10.4333 13.9998 10.2346C13.9998 10.036 13.9209 9.84545 13.7804 9.70497C13.6399 9.56449 13.4494 9.48557 13.2507 9.48557H7.7576Z" fill="#848D97" />
                    </svg>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
