import React, { useState } from "react";
import axios from "axios";
import TranslationProgress from "./TranslationProgress";
import { useLanguage } from "../LanguageContext";
import messages from "./Messages";
import { useHighContrast } from "../components/HighContrastMode";
import { useNavigate } from "react-router-dom";

interface UploadFileButtonState {
  title: string;
  content: string;
  pdf: File | null;
}

interface FileUploadInfo {
  originalFileName: string | null;
}

const UploadFileButton: React.FC = () => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();
  const navigate = useNavigate();

  const { fileSelectAlert, uploadSuccess, uploadFail, AuthFail } =
    messages[language];
  const [state, setState] = useState<UploadFileButtonState>({
    title: "",
    content: "",
    pdf: null,
  });

  const [uploadInfo, setUploadInfo] = useState<FileUploadInfo>({
    originalFileName: null,
  });

  const [translationsId, setTranslationsId] = useState<string | null>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setState((prevState) => ({ ...prevState, pdf: selectedFile }));
    }
  };

  // File Upload Alert
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { pdf } = state;

    if (!pdf) {
      alert(fileSelectAlert);
      return;
    }

    let form_data = new FormData();
    form_data.append("file", pdf, pdf.name);

    let apiUrl = process.env.REACT_APP_API_URL;
    let url = `${apiUrl}/translations`;

    try {
      const response = await axios.post(url, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        const originalFileNameFromResponse = response.data.originalFileName;
        const locationHeader = response.headers["location"];
        const translationsId = locationHeader.split("/").pop();

        if (originalFileNameFromResponse) {
          setUploadInfo({ originalFileName: originalFileNameFromResponse });
        } else {
          console.error(uploadInfo);
        }
        const confirmConversion = window.confirm(
          uploadSuccess(originalFileNameFromResponse)
        );
        if (confirmConversion && translationsId) {
          startConversion(translationsId);
        }
      }
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 401) {
        alert(AuthFail);
        navigate("/login");
      } else {
        alert(uploadFail);
      }
    }
  };

  // Store the ID to trigger rendering the progress component
  const startConversion = (translationsId: string) => {
    setTranslationsId(translationsId);
  };

  return (
    <div>
      <div className="m-auto flex justify-center itmes-center flex-row">
        <label
          htmlFor="ex_file"
          className="cursor-pointer"
          aria-labelledby="fileLabel"
        >
          <span id="fileLabel" className="sr-only">
            파일 선택하기
          </span>
          <div>
            <div
              className={`w-[170px] h-[50px] ${
                isHighContrast
                  ? "bg-yellow-300 hover:bg-yellow-600"
                  : "bg-[#FF6A3F] hover:bg-[#E6552F]"
              } rounded mr-4 flex justify-center items-center transition duration-300 ease-in-out`}
            >
              <div
                className={`${textClassName} ${
                  isHighContrast ? "text-neutral-800" : "text-white"
                } text-base font-medium  leading-none`}
              >
                {language === "ko" ? "1. 파일 선택하기" : "1. Select File"}
              </div>
            </div>
          </div>
        </label>
        <input
          type="file"
          id="ex_file"
          name="pdf_file"
          accept=".pdf"
          onChange={handlePdfChange}
          aria-describedby="fileLabel"
          className="hidden"
        />
        <form onSubmit={handleFileUpload}>
          <button
            type="submit"
            className={`w-[170px] h-[50px] ${
              isHighContrast
                ? "bg-yellow-300 hover:bg-yellow-600"
                : "bg-stone-800 hover:bg-stone-600"
            } rounded mr-4 flex justify-center items-center hover:bg-neutral-600 transition duration-300 ease-in-out`}
          >
            <div>
              <div className="w-[170px] h-[50px] mr-auto flex justify-center items-center">
                <div
                  className={`${textClassName} ${
                    isHighContrast ? "text-stone-800" : "text-white"
                  } text-base font-medium  leading-none`}
                >
                  {language === "ko" ? "2. 파일 업로드하기" : "2. Upload File"}
                </div>
              </div>
            </div>
          </button>
        </form>
      </div>

      <div>
        {translationsId && (
          <TranslationProgress translationsId={translationsId} />
        )}
      </div>
    </div>
  );
};

export default UploadFileButton;
