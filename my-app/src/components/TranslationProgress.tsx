import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStatus from "./ProgressStatus";
import { useLanguage } from "../LanguageContext";

interface TranscriptionsProgressProps {
  transcriptionsId: string;
}

const ProgressOverlay: React.FC<{
  progressMessage: string;
  children?: React.ReactNode;
}> = ({ progressMessage, children }) => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
      <div className="text-center">
        <div className={`${textClassName} mb-4 text-lg font-semibold`}>
          {progressMessage}
        </div>
        {children}
      </div>
    </div>
  );
};

const TranslationProgress: React.FC<TranscriptionsProgressProps> = ({
  transcriptionsId,
}) => {
  const { language } = useLanguage();
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [brailleProgress, setBrailleProgress] = useState<number>(0);
  const navigate = useNavigate();
  const [dotCount, setDotCount] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");

  // Dot Animation
  useEffect(() => {
    const dotAnimation = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 1000);

    return () => clearInterval(dotAnimation);
  }, []);

  //Initial Message
  useEffect(() => {
    if (language === "ko") {
      setProgressMessage("변환을 시작합니다");
    } else {
      setProgressMessage("Starting conversion");
    }
  }, [language]);

  const dots = ".".repeat(dotCount);

  // Progress Message
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const url = `${apiUrl}/transcriptions/${transcriptionsId}/status`;
        const response = await axios.get(url);
        const data = response.data;

        setOcrProgress(data.ocrPercentDone);
        setBrailleProgress(data.transcriptionPercentDone);

        if (data.ocrPercentDone < 100) {
          setProgressMessage(
            language === "ko"
              ? `문제를 읽는 중${dots}`
              : `Reading the problem${dots}`
          );
        } else if (data.transcriptionPercentDone < 100) {
          setProgressMessage(
            language === "ko"
              ? `점자로 바꾸는 중${dots}`
              : `Converting to Braille${dots}`
          );
        } else {
          setProgressMessage(
            language === "ko" ? "변환이 완료되었습니다" : "Conversion completed"
          );
          setTimeout(
            () => navigate(`/download?fileId=${transcriptionsId}`),
            2000
          );
        }
      } catch (error) {
        console.error("Error checking the translation status:", error);
        setProgressMessage(
          language === "ko"
            ? "진행 상황을 불러오는 중 오류가 발생했습니다"
            : "Error occurred while fetching progress"
        );
      }
    };

    checkStatus();
  }, [
    transcriptionsId,
    navigate,
    dots,
    ocrProgress,
    brailleProgress,
    language,
  ]);

  return (
    <ProgressOverlay progressMessage={progressMessage}>
      <ProgressStatus
        progress={ocrProgress}
        label={ocrProgress < 100 ? "OCR Processing..." : "OCR Done"}
      />
      <ProgressStatus
        progress={brailleProgress}
        label={
          ocrProgress === 100
            ? brailleProgress < 100
              ? "Braille Translation Processing..."
              : "Braille Translation Done"
            : "Braille Translation Waiting..."
        }
      />
    </ProgressOverlay>
  );
};
export default TranslationProgress;
