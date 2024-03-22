function Modal({setPopUp, setSlippage} : any) {

  return (
    <div className='w-screen h-screen bg-black bg-opacity-90 fixed top-0 right-0 flex justify-center items-center'>
      <div className='bg-black border rounded-xl p-10 rounded-md shadow-md z-10'>
        <h1 className='font-bold text-center text-lg my-5'>Slippage Settings</h1>
        <div className="w-full flex flex-col items-start justify-start gap-2 mb-4 ">
              <span className='opacity-50 text-lg'>Enter Amount</span>
              <input
                type="number"
                className="w-full input input-bordered rounded-xl py-2 px-6 mb-2 bg-black border border-white border-opacity-50"
                min="1"
                max="10"
                placeholder="1" // Placeholder shown when input is empty 
                onChange={(e) => setSlippage(e.target.value)}       
              />
            </div>
        <div className='flex justify-between mt-5'>
          <button onClick={() => setPopUp(false)} className='bg-black w-full border border-white rounded-xl btn'>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
