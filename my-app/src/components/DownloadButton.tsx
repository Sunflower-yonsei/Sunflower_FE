import React from 'react';
import { useLocation } from 'react-router-dom';


const DownloadButton = () => {
    const location = useLocation();

    const getFileIdFromURL = () => {
        const params = new URLSearchParams(location.search);
        return params.get('fileId'); // Extracts 'fileId' from the URL query parameters
      };
    
    const downloadFile = async (fileId: string) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL
            const response = await fetch(`${apiUrl}/translations/${fileId}`); // 파일 ID를 경로에 포함
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
                <div className="text-stone-200 text-base font-medium font-['Pretendard'] leading-none">BRF 파일 다운로드</div>
            </button>
        </div>
    );
};

export default DownloadButton;
