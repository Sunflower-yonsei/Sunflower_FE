import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../LanguageContext";



const DownloadButton = () => {
    const location = useLocation();
    const { language, toggleLanguage } = useLanguage();
    const textClassName = language === 'ko' ? 'font-kor' : 'font-eng';

    const getFileIdFromURL = () => {
        const params = new URLSearchParams(location.search);
        return params.get('fileId'); // Extracts 'fileId' from the URL query parameters
      };
    
    const downloadFile = async (fileId: string) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL
            const response = await fetch(`${apiUrl}/translations/${fileId}`); 
            if (!response.ok) {
                throw new Error('File not found on server');
            }
            const blob = await response.blob();
            // Blob으로 파일 다운로드 생성
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = `${fileId}.brf`;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleDownload = () => {
        const fileId = getFileIdFromURL();
        if (fileId) {
            downloadFile(fileId);
        } else {
            console.error('No file ID found in URL');
        }
    };

    return (
        <div>
            <button onClick={handleDownload} className='w-[320px] h-[50px] bg-neutral-800 ml-4 mb-2 flex justify-center items-center'>
                <div className={`${textClassName} text-stone-200 text-base font-medium  leading-none`}>{language === "ko"
                    ? "BRF 파일 다운로드"
                    : "Download Brf"}</div>
            </button>
        </div>
    );
};

export default DownloadButton;
