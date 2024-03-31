import { useState } from "react";

function Modal({ setPopUp, setSlippage }: any) {
  const [customSlippage, setCustomSlippage] = useState<number | string>(100);

  return (
    <div className='w-screen h-screen bg-black bg-opacity-90 fixed top-0 right-0 flex justify-center items-center'>
      <div className='bg-black border border-slate-300 rounded-xl p-10 rounded-md shadow-md z-10'>
        <h1 className='font-bold text-center text-2xl my-5'>Slippage Settings</h1>
        <div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
          <div
            className="inline-flex rounded-2xl shadow-primary-3 transition duration-150 ease-in-out"
            role="group">
            <button
              type="button"
              onClick={() => setCustomSlippage(30)}
              className="inline-block border-t border-b border-l border-r border-zinc-500 focus:border focus:border-white rounded-tl rounded-bl px-6 pb-2 pt-2.5 text-md font-medium uppercase text-black-50 transition duration-150 ease-in-out focus:bg-black focus:outline-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              0.3%
            </button>
            <button
              type="button"
              onClick={() => setCustomSlippage(50)}
              className="inline-block border-t border-b border-r border-zinc-500 focus:border focus:border-white px-6 pb-2 pt-2.5 text-md font-medium uppercase text-white transition duration-150 ease-in-out focus:bg-black focus:outline-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              0.5%
            </button>
            <button
              type="button"
              onClick={() => setSlippage(100)}
              className="inline-block border-t border-b  border-r border-zinc-500 focus:border focus:border-white px-6 pb-2 pt-2.5 text-md font-medium uppercase text-white transition duration-150 ease-in-out focus:bg-black focus:outline-none"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              1%
            </button>

            <div className="flex items-center justify-between border-t border-b border-r border-zinc-500 rounded-tr rounded-br focus:border focus:border-white focus:bg-black focus:outline-none cursor-text p-2 w-[130px] h-full text-black-50">
              <span className="text-xs lg:text-sm">Custom</span>
              <input inputMode="decimal" className="outline-none h-full w-full bg-transparent py-4 px-2 text-sm rounded-tl rounded-bl placeholder:text-white text-black-50 text-right pointer-events-all" placeholder="0.00%" type="text"
                onChange={(e) => {
                  setCustomSlippage(Number(e.target.value) * 100)
                }} />
            </div>
          </div>

        </div>
        <div className='flex justify-between mt-5'>
          {/* <button onClick={() => { setPopUp(false); setSlippage(Number(customSlippage)) }} className='bg-black text-slate-100 w-full border border-zinc-500 rounded-xl btn hover:border-white'>
            Save Settings
          </button> */}
          <button onClick={() => { setPopUp(false); setSlippage(Number(customSlippage)) }} className='btn w-full border border-white border-opacity-50 rounded-[6px] p-2 md:px-4 text-sm md:text-base flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text'>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
