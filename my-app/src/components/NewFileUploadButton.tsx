import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ConvertPage from '../pages/ConvertPage';
import { useLanguage } from "../LanguageContext";



const NewFileUpload = () => {
  const { language, toggleLanguage } = useLanguage();
  const textClassName = language === 'ko' ? 'font-kor' : 'font-eng';

  return (
    <div>
      <Link to='/convert'>
        <button>
          <div className='w-[320px] h-[36px] ml-4 border border-neutral-800 justify-center items-center gap-2.5 inline-flex'>
            <div className={`${textClassName} text-neutral-800 text-base font-medium  leading-none`}>{language === "ko"
                    ? "다른 파일 변환하기"
                    : "Convert Another File"}</div>
          </div>
        </button>
      </Link>


      <Routes>
        <Route path='/convert' element={<ConvertPage />} />
      </Routes>
    </div>
  )
}

export default NewFileUpload