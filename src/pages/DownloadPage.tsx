import React from 'react'
import BrailleDeco from '../components/BrailleDeco'
import DownloadBrf from '../components/DownloadBrf'
import NavBar from '../components/NavBar'
import NewFileUpload from '../components/NewFileUploadButton'

const DownloadPage = () => {
  return (
    <div className='w-full h-screen bg-stone-200'>
      <NavBar />
      <div className='content box w-1/2 h-auto m-auto align-middle flex flex-col itmes-center justify-center'>
        <div className='w-auto h-auto align-middle my-[180px]'>
          <div className="text-neutral-800 m-auto text-center text-5xl font-semibold font-['Pretendard'] leading-[60px] tracking-wide">파일 변환 완료!</div>
          <div className="text-center my-[20px] text-gray-700 text-base font-normal font-['Pretendard'] leading-[25px]">
            [파일명] 파일 변환이 성공적으로 완성되었습니다. <br />
            파일 다운로드 버튼을 눌러 BRF 파일을 받아보세요!
          </div>
          <div className='w-[90px] h-[130px] m-auto my-[30px] relative'>
            <img src='/img/complete.png' />
          </div>
          <div className='w-auto h-auto m-auto align-middle flex flex-col items-center justify-center'>
            <DownloadBrf />
            <NewFileUpload />
          </div>
        </div>
      </div>
      <BrailleDeco />
    </div>
  )
}

export default DownloadPage