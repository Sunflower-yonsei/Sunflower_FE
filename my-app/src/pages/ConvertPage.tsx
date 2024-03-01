import React from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
import BrailleDeco from "../components/BrailleDeco";
import UploadFileButton from "../components/UploadFileButton";
import "../tailwind.css";
import { useLanguage } from "../LanguageContext";

const ConvertPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  return (
    <div className="w-full h-screen relative bg-stone-200">
      <NavBar />
      <div
        className={`content box w-full ${
          isMobile ? "px-4" : "w-1/2"
        } h-auto m-auto align-middle flex flex-col items-center justify-center`}
      >
        <div className="w-auto h-auto align-middle my-[180px]">
          <div
            className={`${textClassName} text-neutral-800 m-auto text-center text-5xl font-semibold leading-[60px] tracking-wide`}
          >
            {language === "ko" ? "파일 변환하기" : "Convert File"}
          </div>
          <div
            className={`${textClassName} my-[20px] text-gray-700 text-center text-base font-normal leading-[25px]`}
          >
            {language === "ko" ? (
              <>
                원하는 교육 자료 파일을 업로드해 점자로 변환해보세요.
                <br />
                변환된 파일을 다운로드해 점자정보단말기에 읽힐 수 있습니다.
              </>
            ) : (
              <>
                Upload the educational material file you want and convert it
                into Braille.
                <br />
                Download the converted file and read it on a Braille information
                terminal.
              </>
            )}
          </div>
          <div className="w-[90px] h-[130px] m-auto my-[30px] relative">
            <img src="/img/uploadfile.png" alt="Upload File" />
          </div>
          <div className="w-auto h-auto my-[40px]">
            <div
              className={`${textClassName} text-gray-700 text-center text-base font-normal leading-[15.12px]`}
            >
              {language === "ko"
                ? "PDF 형식의 파일을 업로드해주세요"
                : "Please upload a file in PDF format"}
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
