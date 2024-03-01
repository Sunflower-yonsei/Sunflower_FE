import React from "react";
import { useMediaQuery } from "react-responsive";
import BrailleDeco from "../components/BrailleDeco";
import NavBar from "../components/NavBar";
import NewFileUpload from "../components/NewFileUploadButton";
import DownloadButton from "../components/DownloadButton";
import { useLocation } from "react-router-dom";

const DownloadBrf = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const fileId = query.get("fileId");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="w-full h-screen bg-stone-200">
      <NavBar />
      <div
        className={`w-full h-screen flex items-center justify-center bg-stone-200`}
      >
        <div
          className={`content box ${
            isMobile ? "w-full px-4" : "w-1/2"
          } h-auto flex flex-col items-center justify-center m-auto`}
        >
          <div className="w-auto h-auto">
            <div className="text-neutral-800 m-auto font-kor text-center text-5xl font-semibold leading-[60px] tracking-wide">
              파일 변환 완료!
            </div>
            <div className="text-center my-[20px] text-gray-700 font-kor text-base font-normal leading-[25px]">
              파일 변환이 성공적으로 완성되었습니다.
              <br />
              파일 다운로드 버튼을 눌러 BRF 파일을 받아보세요!
            </div>
            <div className="w-[90px] h-[130px] m-auto my-[30px] relative">
              <img src="/img/complete.png" alt="Conversion Complete" />
              <div className="text-center my-[20px] text-gray-700 text-base font-normal leading-[25px]">
                {fileId}.brf
              </div>
            </div>
            <div className="w-auto h-auto m-auto flex flex-col items-center justify-center">
              <DownloadButton />
              <NewFileUpload />
            </div>
          </div>
        </div>
      </div>
      <BrailleDeco />
    </div>
  );
};

export default DownloadBrf;
