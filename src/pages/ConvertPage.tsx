import React from 'react'
import NavBar from '../components/NavBar'
import BrailleDeco from '../components/BrailleDeco'
import '../tailwind.css';

import UploadFileButton from '../components/UploadFileButton';

import axios from 'axios';

const ConvertPage = () => {
  return (
    <div className='w-full h-screen bg-stone-200'>
        <NavBar />
            <div className='content box w-1/2 h-auto m-auto align-middle flex flex-col itmes-center justify-center'>
                <div className='w-auto h-auto align-middle my-[180px]'>
                    <div className="text-neutral-800 m-auto text-center text-5xl font-semibold font-['Pretendard'] leading-[60px] tracking-wide">파일 변환하기</div>
                    <div className="text-center my-[20px] text-gray-700 text-base font-normal font-['Pretendard'] leading-[25px]">
                        원하는 교육 자료 파일을 Sunny Braille에 업로드해 점자로 변환해보세요.<br/>
                        변환된 파일을 다운로드해 점자정보단말기에 읽힐 수 있습니다.
                    </div>
                    <div className='w-[90px] h-[130px] m-auto my-[30px] relative'>
                        <img src='/img/uploadfile.png' />
                    </div>
                    <div className='w-auto h-auto my-[40px]'>
                        <div className="text-gray-700 text-center text-base font-normal font-['Pretendard'] leading-[15.12px]">PDF 형식의 파일을 업로드해주세요</div>
                    </div>
                <div>
                    <UploadFileButton />
                </div>
                </div>
            </div>
        <BrailleDeco />
    </div>
  )
}

export default ConvertPage