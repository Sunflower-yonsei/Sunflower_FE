import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface TranslationProgressProps {
  translationsId: string;
}

const TranslationProgress: React.FC<TranslationProgressProps> = ({ translationsId }) => {
    const [ocrProgress, setOcrProgress] = useState<number>(0);
    const [brailleProgress, setBrailleProgress] = useState<number>(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkStatus = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const url = `${apiUrl}/translations/${translationsId}/status`;
          const response = await axios.get(url);
          const data = response.data;
  
          setOcrProgress(data.ocrPercentDone);
          setBrailleProgress(data.brailleTranslationPercentDone);
  
          // Navigate to download page if both processes are completed
          // if (data.ocrStatus === "COMPLETED" && data.brailleTranslationsStatus === "COMPLETED") {
            if (data.ocrStatus === "COMPLETED") {
            navigate(`/download?fileId=${translationsId}`);
          } else {
            // Re-check status after a delay if either process is not completed
            setTimeout(checkStatus, 1000);
          }
        } catch (error) {
          console.error("Error checking the translation status:", error);
        }
      };
  
      checkStatus();
    }, [translationsId, navigate]);
  
    return (
      <div>
        <ProgressBar progress={ocrProgress} label="OCR Progress" />
        <ProgressBar progress={brailleProgress} label="Braille Translation Progress" />
      </div>
    );
  };
export default TranslationProgress;
