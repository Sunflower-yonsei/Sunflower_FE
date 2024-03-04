import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStatus from "./ProgressStatus";

interface TranslationProgressProps {
  translationsId: string;
}

const ProgressOverlay: React.FC<{
  progressMessage: string;
  children?: React.ReactNode;
}> = ({ progressMessage, children }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
      <div className="text-center">
        <div className="mb-4 text-lg font-semibold">{progressMessage}</div>
        {children}
      </div>
    </div>
  );
};

const TranslationProgress: React.FC<TranslationProgressProps> = ({
  translationsId,
}) => {
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [brailleProgress, setBrailleProgress] = useState<number>(0);
  const navigate = useNavigate();
  const [progressMessage, setProgressMessage] =
    useState<string>("변환을 시작합니다...");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const url = `${apiUrl}/translations/${translationsId}/status`;
        const response = await axios.get(url);
        const data = response.data;

        setOcrProgress(data.ocrPercentDone);
        setBrailleProgress(data.brailleTranslationPercentDone);

        if (data.ocrPercentDone < 100) {
          setProgressMessage("OCR 진행 중...");
        } else if (data.brailleTranslationPercentDone < 100) {
          setProgressMessage("Braille 변환 진행 중...");
        } else {
          setProgressMessage("변환이 완료되었습니다.");
          setTimeout(
            () => navigate(`/download?fileId=${translationsId}`),
            2000
          );
          return;
        }
      } catch (error) {
        console.error("Error checking the translation status:", error);
        setProgressMessage("진행 상황을 불러오는 중 오류가 발생했습니다.");
      }

      const timer = setTimeout(checkStatus, 1000);
      return () => clearTimeout(timer);
    };

    checkStatus();
  }, [translationsId, navigate, ocrProgress, brailleProgress]);

  return (
    <ProgressOverlay progressMessage={progressMessage}>
      <ProgressStatus progress={ocrProgress} label="OCR Progress" />
      <ProgressStatus
        progress={brailleProgress}
        label="Braille Translation Progress"
      />
    </ProgressOverlay>
  );
};
export default TranslationProgress;
