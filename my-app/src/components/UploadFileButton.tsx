import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface UploadFileButtonState {
  title: string;
  content: string;
  pdf: File | null;
}

const UploadFileButton: React.FC = () => {
  const [state, setState] = useState<UploadFileButtonState>({
    title: '',
    content: '',
    pdf: null
  });
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setState(prevState => ({ ...prevState, pdf: selectedFile }));
    }
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { pdf } = state;

    if (!pdf) {
      alert("파일을 선택해주세요.");
      return;
    }

    let form_data = new FormData();
    form_data.append('file', pdf, pdf.name);

    let apiUrl = process.env.REACT_APP_API_URL;
    let url = `${apiUrl}/translations`;

    try {
      const response = await axios.post(url, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        const locationHeader = response.headers['location'];
        const translationsId = locationHeader.split('/').pop();

        const confirmConversion = window.confirm(`파일 업로드가 완료되었습니다. 변환을 시작하시겠습니까?`);
        if (confirmConversion && translationsId) {
          startConversion(translationsId);
        }
      }
    } catch (error) {
      alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const startConversion = (translationsId: string) => {
    let apiUrl = process.env.REACT_APP_API_URL;
    let url = `${apiUrl}/translations/${translationsId}`;

    // 변환 작업 시작
    axios.get(url)
      .then(res => {
        monitorConversionProgress(translationsId);
      })
      .catch(err => {
        alert("변환 시작 중 문제가 발생했습니다.");
      });
  };

  const monitorConversionProgress = (translationsId: string) => {
    let apiUrl = process.env.REACT_APP_API_URL;
    let statusUrl = `${apiUrl}/translations/${translationsId}/status`;

    // 변환 진행 상태 체크
    const checkStatus = () => {
      axios.get(statusUrl)
        .then(res => {
          const { status, progress } = res.data;
          setProgress(progress);
          if (status === 'completed') {
            navigate(`/download/${translationsId}`);
          } else if (status === 'failed') {
            alert("변환에 실패했습니다.");
          } else {
            setTimeout(checkStatus, 500);
          }
        })
        .catch(err => {
          alert("진행 상태 확인 중 오류가 발생했습니다.");
        });
    };
    checkStatus(); 
  }

  return (
    <div>
      <div className="m-auto flex justify-center itmes-center flex-row">
        <label htmlFor="ex_file" className="cursor-pointer" aria-labelledby="fileLabel">
          <span id="fileLabel" className="sr-only">파일 선택하기</span>
          <div>
            <div className='w-[170px] h-[50px] bg-[#FF6A3F] mr-4 flex justify-center items-center'>
              <div className="text-stone-200 text-base font-medium font-['Pretendard'] leading-none">1. 파일 선택하기</div>
            </div>
          </div>
        </label>
        <input
          type="file"
          id='ex_file'
          name="pdf_file"
          accept=".pdf"
          onChange={handlePdfChange}
          aria-describedby="fileLabel"
          className="hidden"
        />
        <form onSubmit={handleFileUpload}>
          <button type='submit' className='w-[170px] h-[50px] bg-neutral-800 mr-4 flex justify-center items-center'>
            <div>
              <div className='w-[170px] h-[50px] mr-auto flex justify-center items-center'>
                <div className=" text-stone-200 text-base font-medium font-['Pretendard'] leading-none">2. 파일 업로드하기</div>
              </div>
            </div>
          </button>
        </form>
        {progress > 0 && <div>변환 진행률: {progress}%</div>}
      </div>


    </div >
  );
}


export default UploadFileButton;