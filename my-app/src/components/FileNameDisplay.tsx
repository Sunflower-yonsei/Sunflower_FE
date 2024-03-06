import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

interface FileNameDisplayProps {
  fileId: string | null;
}

const FileNameDisplay: React.FC<FileNameDisplayProps> = ({ fileId }) => {
  const [fileName, setFileName] = useState<string>("");
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  useEffect(() => {
    const fetchFileName = async () => {
      if (!fileId) {
        console.error("No file ID provided");
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL; // API 주소
        const response = await axios.get(`${apiUrl}/translations/${fileId}`);
        const originalFileName = response.data.originalFileName;

        const fileNameWithoutExtension = originalFileName
          .split(".")
          .slice(0, -1)
          .join(".");
        setFileName(fileNameWithoutExtension);
      } catch (error) {
        console.error("파일 정보를 불러오는데 실패했습니다.", error);
        setFileName("파일 정보 조회 실패");
      }
    };

    fetchFileName();
  }, [fileId]);

  return (
    <div
      className={`${textClassName} ${
        isHighContrast ? "text-yellow-300" : "text-neutral-800"
      } text-center text-base font-normal my-[10px]`}
    >
      {fileName ? `${fileName}.brf` : "파일 이름을 불러오는 중..."}
    </div>
  );
};

export default FileNameDisplay;
