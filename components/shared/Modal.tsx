import { useState } from "react";

function Modal({ setPopUp, setSlippage }: any) {
  const [customSlippage, setCustomSlippage] = useState<number | string>(100);

  return (
    <div className='w-screen h-screen bg-black bg-opacity-90 fixed top-0 right-0 flex justify-center items-center'>
      <div className='bg-black border rounded-xl p-10 rounded-md shadow-md z-10'>
        <h1 className='font-bold text-center text-lg my-5'>Slippage Settings</h1>
        <div className="w-full flex flex-col items-start justify-start gap-2 mb-4 bg-slate-900">
          <div
            className="inline-flex rounded-md shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-1 dark:focus:shadow-dark-1 dark:active:shadow-dark-1"
            role="group">
            <button
              type="button"
              onClick={() => setCustomSlippage(30)}
              className="inline-block focus:border focus:border-white rounded-s bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              0.3%
            </button>
            <button
              type="button"
              onClick={() => setCustomSlippage(50)}
              className="inline-block focus:border focus:border-white rounded-s bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              0.5%
            </button>
            <button
              type="button"
              onClick={() => setSlippage(100)}
              className="inline-block  focus:border focus:border-white rounded-s bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              1%
            </button>

            <div className="flex items-center justify-between focus:border focus:border-white cursor-text p-2 w-[130px] h-full text-black-50">
              <span className="text-xs lg:text-sm">Custom</span>
              <input inputMode="decimal" className="outline-none h-full w-full bg-transparent py-4 px-2 text-sm rounded-lg placeholder:text-white text-black-50 text-right pointer-events-all" placeholder="0.00%" type="text"
                onChange={(e) => {
                  setCustomSlippage(Number(e.target.value) * 100)
                }} />
            </div>
          </div>

        </div>
        <div className='flex justify-between mt-5'>
          <button onClick={() => { setPopUp(false); setSlippage(Number(customSlippage)) }} className='bg-black w-full border border-white rounded-xl btn'>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
