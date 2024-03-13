import React, { useState, useRef } from "react";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";
import { useNavigate } from "react-router-dom";
import TranslationProgress from "./TranslationProgress";
import axios from "axios";
import messages from "./Messages";

interface UploadFileButtonState {
  title: string;
  content: string;
  pdf: File | null;
}

interface FileUploadInfo {
  originalFileName: string | null;
}

const FileUploadDragDrop: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const [transcriptionsId, setTranscriptionsId] = useState<string | null>(null);

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

  const startConversion = (transcriptionsId: string) => {
    setTranscriptionsId(transcriptionsId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setState({ ...state, pdf: e.target.files[0] });
    }
  };

  const handleUploadClick = async () => {
    const url = process.env.REACT_APP_API_URL + "/transcriptions";

    const { pdf } = state;

    if (!pdf) {
      alert(fileSelectAlert);
      return;
    }

    let form_data = new FormData();
    form_data.append("file", pdf, pdf.name);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.post(url, form_data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          const originalFileNameFromResponse = response.data.originalFileName;
          const locationHeader = response.headers["location"];
          const transcriptionsId = locationHeader.split("/").pop();

          if (originalFileNameFromResponse) {
            setUploadInfo({ originalFileName: originalFileNameFromResponse });
          } else {
            console.error(uploadInfo);
          }
          const confirmConversion = window.confirm(
            uploadSuccess(originalFileNameFromResponse)
          );
          if (confirmConversion && transcriptionsId) {
            startConversion(transcriptionsId);
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
    }
  };

  return (
    <div>
      <div className="m-auto flex justify-center items-center flex-col">
        <label
          htmlFor="input_file"
          className="cursor-pointer"
          aria-labelledby="fileLabel"
        >
          <span id="fileLabel" className={`${textClassName} sr-only`}>
            {language === "ko" ? "파일 선택하기" : "Select File"}{" "}
          </span>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            } border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer`}
          >
            {language === "ko"
              ? "파일을 끌어오거나"
              : "Drag & Drop files here or"}{" "}
            <span className={`${textClassName} text-blue-600 underline`}>
              {language === "ko" ? "선택하기" : "Select File"}
            </span>
          </div>
          {selectedFile && (
            <div className={`${textClassName} mt-4`}>
              {language === "ko" ? "선택된 파일:" : "Selected File:"}{" "}
              {selectedFile.name}
            </div>
          )}
          <input
            type="file"
            id="input_file"
            name="pdf_file"
            accept=".pdf"
            onChange={handlePdfChange}
            aria-describedby="fileLabel"
            className="hidden"
            ref={fileInputRef}
          />
        </label>
        <button
          type="submit"
          onClick={handleUploadClick}
          disabled={!selectedFile}
          className={`w-[170px] h-[50px] ${
            !selectedFile ? "bg-gray-500" : "bg-stone-800 hover:bg-stone-600"
          } rounded mr-4 flex justify-center items-center transition duration-300 ease-in-out`}
        >
          <div
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-stone-200"
            } text-base font-medium leading-none`}
          >
            {language === "ko" ? "파일 변환하기" : "Convert File"}
          </div>
        </button>
      </div>
      <div>
        {transcriptionsId && (
          <TranslationProgress transcriptionsId={transcriptionsId} />
        )}
      </div>
    </div>
  );
};
export default FileUploadDragDrop;
