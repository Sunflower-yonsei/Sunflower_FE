import React from 'react'

const DownloadButton = () => {
    // URL에서 파일 이름 추출
    const getFileNameFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        let fileName = params.get('fileName');
        if (!fileName) {
            return null;
        }
        // 파일 확장자 제거
        fileName = fileName.split('.')[0];
        return fileName;
    };

    const downloadFile = async (filename: string) => {
        try {
            // 장고 서버 URL 업데이트
            const response = await fetch(`http://localhost:8000/media/brf_files/${filename}.brf`);
            if (!response.ok) {
                throw new Error('File not found on server');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.brf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleDownload = () => {
        const fileName = getFileNameFromURL();
        if (fileName) {
            downloadFile(fileName);
        } else {
            console.error('No file name found in URL');
        }
    };
    return (
        <div>
            <button onClick={handleDownload}>
                <div className='w-[320px] h-[50px] bg-neutral-800 ml-4 mb-2 flex justify-center items-center'>
                    <div className="text-stone-200 text-base font-medium font-['Pretendard'] leading-none">BRF 파일 다운로드</div>
                </div>
            </button>
        </div>
    )
}

export default DownloadButton