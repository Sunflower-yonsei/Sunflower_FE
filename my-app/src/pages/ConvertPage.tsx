import React from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
import BrailleDeco from "../components/BrailleDeco";
import UploadFileButton from "../components/UploadFileButton";
import "../tailwind.css";

const ConvertPage = () => {
  
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="w-full h-screen relative bg-stone-200">
      <NavBar />
      <div
        className={`content box w-full ${
          isMobile ? "px-4" : "w-1/2"
        } h-auto m-auto align-middle flex flex-col items-center justify-center`}
      >
        <div className="w-auto h-auto align-middle my-[180px]">
          <div className="text-neutral-800 m-auto text-center text-5xl font-semibold font-kor leading-[60px] tracking-wide">
            파일 변환하기
          </div>
          <div className="text-center my-[20px] text-gray-700 text-base font-normal font-kor leading-[25px]">
            원하는 교육 자료 파일을 업로드해 점자로
            변환해보세요.
            <br />
            변환된 파일을 다운로드해 점자정보단말기에 읽힐 수 있습니다.
          </div>
          <div className="w-[90px] h-[130px] m-auto my-[30px] relative">
            <img src="/img/uploadfile.png" alt="Upload File" />
          </div>
          <div className="w-auto h-auto my-[40px]">
            <div className="text-gray-700 text-center text-base font-normal font-kor leading-[15.12px]">
              PDF 형식의 파일을 업로드해주세요
            </div>
          </div>
          <div>
            <UploadFileButton />
          </div>
        </div>
      </div>
      <BrailleDeco />
    </div>
  );
};

export default ConvertPage;
