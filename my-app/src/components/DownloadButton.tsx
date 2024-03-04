import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

const DownloadButton = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  const getFileIdFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("fileId");
  };

  const downloadFile = async (fileId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/translations/${fileId}`);
      if (!response.ok) {
        throw new Error("File not found on server");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `${fileId}.brf`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDownload = () => {
    const fileId = getFileIdFromURL();
    if (fileId) {
      downloadFile(fileId);
    } else {
      console.error("No file found in URL");
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className={`w-[320px] h-[50px] rounded  ${
          isHighContrast
            ? "bg-yellow-300 hover:bg-yellow-600"
            : "bg-stone-800 hover:bg-stone-600"
        } ml-4 mb-2 flex justify-center items-center hover:bg-neutral-600 transition duration-300 ease-in-out`}
      >
        <div
          className={`${textClassName} ${
            isHighContrast ? "text-stone-800" : "text-white"
          } text-base font-medium  leading-none`}
        >
          {language === "ko" ? "BRF 파일 다운로드" : "Download Brf"}
        </div>
      </button>
    </div>
  );
};

export default DownloadButton;
