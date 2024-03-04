import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import BrailleDeco from "../components/BrailleDeco";
import NavBar from "../components/NavBar";
import NewFileUpload from "../components/NewFileUploadButton";
import DownloadButton from "../components/DownloadButton";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "../components/HighContrastMode";
import { useLocation } from "react-router-dom";

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
  const [fileName, setFileName] = useState("");
  const [announcement, setAnnouncement] = useState('');


  // Screen Reader Message Setting
  useEffect(() => {
    const message = language === 'ko' ? '변환이 완료되었습니다' : 'Conversion Completed';
    setAnnouncement(message);

    const timer = setTimeout(() => {
      setAnnouncement('');
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  // Catching Error
  useEffect(() => {
    const fetchFileInfo = async () => {
      if (fileId) {
        try {
          const response = await axios.get(`/translations/${fileId}`);
          setFileName(response.data.convertedFileName);
        } catch (error) {
          console.error("파일 정보를 불러오는데 실패했습니다.", error);
        }
      }
    };

    fetchFileInfo();
  }, [fileId]);

  return (
    <div className={`w-full h-screen bg-stone-200`}>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <NavBar />
      <div
        className={`w-full h-screen flex items-center justify-center ${
          isHighContrast ? "bg-black" : "bg-stone-200"
        }`}
      >
        <div
          className={`content box ${
            isMobile ? "w-full px-4" : "w-1/2"
          } h-auto flex flex-col items-center justify-center m-auto`}
        >
          <div className="w-auto h-auto">
            <div
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              } m-auto text-center text-5xl font-semibold leading-[60px] tracking-wide`}
            >
              {language === "ko" ? "파일 변환 완료!" : "Convert Completed!"}
            </div>
            <div
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              } text-center my-[20px] text-base font-normal leading-[25px]`}
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
            <div className="w-[90px] h-[130px] m-auto my-[30px] relative">
              <img src="/img/complete.png" alt="Conversion Complete" />
              <div
                className={`text-center my-[20px] ${
                  isHighContrast ? "text-yellow-300" : "text-neutral-800"
                } text-base font-normal leading-[25px]`}
              >
                {`${fileName.split(".")[0]}.brf`}
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

export default DownloadPage;
