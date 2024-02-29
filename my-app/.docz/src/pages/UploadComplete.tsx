import React from 'react'
import NavBar from '../components/NavBar'
import BrailleDeco from '../components/BrailleDeco'
import ConvertButton from '../components/ConvertButton'
import ReUploadButton from '../components/ReUploadButton'

const UploadComplete = () => {
    return (
        <div className='w-full h-screen bg-stone-200'>
            <NavBar />
            <div className='content box w-1/2 h-auto m-auto align-middle flex flex-col itmes-center justify-center'>
                <div className='w-auto h-auto align-middle my-[180px]'>
                    <div className="text-neutral-800 m-auto text-center text-5xl font-semibold font-['Pretendard'] leading-[60px] tracking-wide">업로드 파일 변환하기</div>
                    <div className="text-center my-[20px] text-gray-700 text-base font-normal font-['Pretendard'] leading-[25px]">
                        [파일명] 파일이 성공적으로 업로드 되었습니다.<br/>
                        파일을 BRF 형식으로 변환하기 위해 변환 버튼을 눌러주세요.
                    </div>
                    <div className='w-[90px] h-[130px] m-auto my-[30px] relative'>
                        <img src='/img/uploadedfile.png' />
                    </div>
                <div className = 'w-auto h-auto m-auto align-middle flex flex-col items-center justify-center'>
                    <ConvertButton />
                    <ReUploadButton />
                </div>
                </div>
            </div>
            <BrailleDeco />
        </div>
    )
}

export default UploadComplete