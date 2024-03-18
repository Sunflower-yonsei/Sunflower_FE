import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BrailleDeco from "../components/BrailleDeco";
import NavBar from "../components/NavBar";
import NewFileUpload from "../components/NewFileUploadButton";
import DownloadButton from "../components/DownloadButton";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "../components/Accessibility/HighContrastMode";
import { useLocation } from "react-router-dom";
import FileNameDisplay from "../components/FileNameDisplay";
import ContrastToggleButton from "../components/Accessibility/ContrastToggleButton";
import LanguageToggleButton from "../components/Language/LanguageToggleButton";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DownloadPage = () => {
  const query = useQuery();
  const fileId = query.get("fileId");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();
  const [announcement, setAnnouncement] = useState("");

  // Screen Reader Message Setting
  useEffect(() => {
    const message =
      language === "ko" ? "변환이 완료되었습니다" : "Conversion Completed";
    setAnnouncement(message);

    const timer = setTimeout(() => {
      setAnnouncement("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div
      className={`w-full h-screen ${
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
            {language === "ko" ? "파일 변환 완료!" : "Convert Completed!"}
          </div>
          <div
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            } m-auto text-center ${
              isMobile ? "text-base" : "text-5xl"
            } font-bold leading-[60px] tracking-wide`}
          >
            <div
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              } text-center ${
                isMobile ? "text-sm my-[5px]" : "text-base my-[20px]"
              } font-normal leading-[25px]`}
            >
              {language === "ko" ? (
                <>
                  파일 변환이 성공적으로 완성되었습니다.
                  <br />
                  파일 다운로드 버튼을 눌러 BRF 파일을 받아보세요!
                </>
              ) : (
                <>
                  File Convert Succeeded.
                  <br />
                  Press 'Download Brf' to download!
                </>
              )}
            </div>
            <div
              className={`${
                isMobile ? "w-[60px] h-[80px]" : "w-[90px] h-[130px]"
              } m-auto my-[10px] relative`}
            >
              <img src="/img/complete.png" alt="Conversion Complete" />
            </div>
            <div className="w-auto h-auto m-auto flex flex-col items-center justify-center">
              <FileNameDisplay fileId={fileId} />
              <DownloadButton />
              <NewFileUpload />
            </div>
          </div>
          <br />
          {isMobile && (
            <div className="transform -translate-y-1/2 flex flex-row justify-center gap-4">
              <ContrastToggleButton />
              <LanguageToggleButton />
            </div>
          )}
        </div>
      </div>
      <BrailleDeco />
    </div>
  );
};

export default DownloadPage;
