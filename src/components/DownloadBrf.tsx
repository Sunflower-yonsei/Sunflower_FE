import React from 'react';

const DownloadBrf = () => {
  const downloadFile = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:8000/download/${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownload = () => {
    downloadFile('ttbrl.brf');
  };

  return (
    <div>
      <button onClick={handleDownload}>
        <div className='w-[320px] h-[50px] bg-neutral-800 ml-4 mb-2 flex justify-center items-center'>
          <div className="text-stone-200 text-base font-medium font-['Pretendard'] leading-none">BRF 파일 다운로드</div>
        </div>
      </button>
    </div>
  );
};

export default DownloadBrf;
