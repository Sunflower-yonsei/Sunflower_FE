import React, { ChangeEvent, Component, FormEvent, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import UploadComplete from '../pages/UploadComplete';


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

  const navigate = useNavigate();

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setState(prevState => ({ ...prevState, pdf: selectedFile }));
    }
  };

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (window.confirm("변환 하시겠습니까?\n변환할 경우 시간은 약 10초 소요됩니다.")) {
      handleConversion();
    }
  };

  const handleConversion = () => {
    const { title, content, pdf } = state;

    let form_data = new FormData();

    function isFile(value: any): value is File {
      return value instanceof File && typeof value.name === 'string';
    }

    if (isFile(pdf) && pdf.name) {
      form_data.append('pdf_file', pdf, pdf.name);
    }

    let url = 'http://54.180.106.239:8000/upload/posts/';

    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log('Successful', res.data);
        var ID = res.data.pdf_file
        ID = ID.replace('/media/pdf_files/', '')
        navigate(`/download?fileName=${ID}`);
      })
      .catch(err => {
        alert("문제 변환이 완료되지 않았습니다.\n다시 업로드하거나 다른 파일을 사용해주세요.")});
    };
  return (
    <div>
      <div className="m-auto flex justify-center itmes-center flex-row">
        <label htmlFor="ex_file" className="cursor-pointer">
          <div>
            <div className='w-[170px] h-[50px] bg-[#FF6A3F] mr-4 flex justify-center items-center' aria-labelledby="fileLabel">
              <div className=" text-stone-200 text-base font-medium font-['Pretendard'] leading-none">1. 파일 선택하기</div>
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
      </div>


    </div >
  );
}


export default UploadFileButton;