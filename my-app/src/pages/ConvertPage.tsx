import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
import BrailleDeco from "../components/BrailleDeco";
import UploadFileButton from "../components/UploadFileButton";
import "../tailwind.css";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "../components/HighContrastMode";

const ConvertPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const message =
      language === "ko"
        ? "파일을 업로드하는 페이지입니다."
        : "This page is for File Upload";
    setAnnouncement(message);

    const timer = setTimeout(() => {
      setAnnouncement("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div
      className={`w-full h-screen relative ${
        isHighContrast ? "bg-black" : "bg-stone-200"
      }`}
    >
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <NavBar />
      <div
        className={`content box w-full ${
          isMobile ? "px-4" : "w-1/2"
        } h-auto m-auto align-middle flex flex-col items-center justify-center`}
      >
        <div
          className={`w-auto h-auto align-middle ${
            isMobile ? "my-[100px]" : "my-[180px]"
          }`}
        >
          <div
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            }  m-auto text-center ${
              isMobile ? "text-base" : "text-5xl"
            } font-bold leading-[60px] tracking-wide`}
          >
            {language === "ko" ? "파일 변환하기" : "Convert File"}
          </div>
          <div
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            } text-center ${
              isMobile ? "text-sm my-[5px]" : "text-base my-[20px]"
            } font-normal leading-[25px]`}
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
          <div
            className={`${
              isMobile ? "w-[60px] h-[80px]" : "w-[90px] h-[130px]"
            } m-auto my-[30px] relative`}
          >
            <img src="/img/uploadfile.png" alt="Upload File" />
          </div>
          <div className="w-auto h-auto my-[40px]">
            <div
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              } text-center text-base font-normal leading-[15.12px]`}
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
