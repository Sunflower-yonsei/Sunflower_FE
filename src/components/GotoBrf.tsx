import React from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import ConvertPage from '../pages/ConvertPage'

const GotoBrf = () => {
  return (
    <div className='w-[300px] h-[52px] mx-auto align-middle bg-neutral-800'>
        <Link to='/convert'>
            <button className='flex mx-auto justify-center items-center'>
                <div className="text-center text-white text-2xl font-semibold font-['Pretendard'] leading-[57.60px] tracking-wide">CONVERT TO BRF</div>
            </button>
        </Link>

        <Routes>
            <Route path='/convert' element={<ConvertPage />} />
        </Routes>
    </div>
  )
}

export default GotoBrf