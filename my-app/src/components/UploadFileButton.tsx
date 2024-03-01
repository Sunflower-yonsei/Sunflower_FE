import React, { useState } from "react";
import axios from "axios";
import TranslationProgress from "./TranslationProgress";
import { useLanguage } from "../LanguageContext";
import messages from "./Messages"; // 메시지 설정 파일의 실제 경로에 맞게 조정

interface UploadFileButtonState {
  title: string;
  content: string;
  pdf: File | null;
}

const UploadFileButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { fileSelectAlert, uploadSuccess, uploadFail } = messages[language];
  const [state, setState] = useState<UploadFileButtonState>({
    title: "",
    content: "",
    pdf: null,
  });
  const [translationsId, setTranslationsId] = useState<string | null>(null);

  {
    /* Getting PDF Info. */
  }
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setState((prevState) => ({ ...prevState, pdf: selectedFile }));
    }
  };

  {
    /* File Upload Alert */
  }
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
        const locationHeader = response.headers["location"];
        const translationsId = locationHeader.split("/").pop();

        const confirmConversion = window.confirm(uploadSuccess(translationsId));
        if (confirmConversion && translationsId) {
          startConversion(translationsId);
        }
      }
    } catch (error) {
      alert(uploadFail);
    }
  };

  {
    /* Store the ID to trigger rendering the progress component */
  }
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
            <div className="w-[170px] h-[50px] bg-[#FF6A3F] mr-4 flex justify-center items-center">
              <div
                className={`${textClassName} text-stone-200 text-base font-medium  leading-none`}
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
            className="w-[170px] h-[50px] bg-neutral-800 mr-4 flex justify-center items-center"
          >
            <div>
              <div className="w-[170px] h-[50px] mr-auto flex justify-center items-center">
                <div
                  className={`${textClassName} text-stone-200 text-base font-medium  leading-none`}
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
