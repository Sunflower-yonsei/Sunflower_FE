import React from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import ConvertPage from '../pages/ConvertPage'

const ConvertPageRoutingButton = () => {
  return (
    <div className='w-[300px] h-[52px] mx-auto align-middle rounded bg-neutral-800 hover:bg-neutral-600 transition duration-300 ease-in-out'>
        <Link to='/convert'>
            <button className='flex mx-auto justify-center items-center'>
                <div className="text-center text-white text-2xl font-semibold font-eng leading-[57px] tracking-wide">CONVERT TO BRF</div>
            </button>
        </Link>

        <Routes>
            <Route path='/convert' element={<ConvertPage />} />
        </Routes>
    </div>
  )
}

export default ConvertPageRoutingButton