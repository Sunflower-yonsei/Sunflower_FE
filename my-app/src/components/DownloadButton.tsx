import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

function removeExtension(fileName: string): string {
  const lastIndex = fileName.lastIndexOf(".");
  if (lastIndex === -1) return fileName;
  return fileName.substring(0, lastIndex);
}

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

      // File Name setting
      const metadataResponse = await fetch(`${apiUrl}/translations/${fileId}`);
      if (!metadataResponse.ok) {
        throw new Error("Metadata not found on server");
      }
      const metadata = await metadataResponse.json();
      const originalFileName = metadata.originalFileName;
      const fileContent = metadata.content;
      if (!originalFileName || !fileContent) {
        throw new Error("Original file name or content is missing");
      }

      const contentToDownload =
        typeof fileContent === "string"
          ? fileContent
          : JSON.stringify(fileContent);

      const blob = new Blob([contentToDownload], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `${removeExtension(originalFileName)}.brf`;
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
        } my-[10px] flex justify-center items-center hover:bg-neutral-600 transition duration-300 ease-in-out`}
      >
        <div
          className={`${textClassName} ${
            isHighContrast ? "text-stone-800" : "text-white"
          } text-base font-medium leading-none`}
        >
          {language === "ko" ? "BRF 파일 다운로드" : "Download Brf"}
        </div>
      </button>
    </div>
  );
};

export default DownloadButton;
