import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ConvertPage from '../pages/ConvertPage'


const ReUploadButton = () => {
  return (
    <div>
      <Link to='/convert'>
        <button>
          <div className='w-[320px] h-[36px] ml-4 border border-neutral-800 justify-center items-center gap-2.5 inline-flex'>
            <div className="text-neutral-800 text-base font-medium font-['Pretendard'] leading-none">파일 재선택하기</div>
          </div>
        </button>
      </Link>


      <Routes>
        <Route path='/convert' element={<ConvertPage />} />
      </Routes>
    </div>
  )
}

export default ReUploadButton