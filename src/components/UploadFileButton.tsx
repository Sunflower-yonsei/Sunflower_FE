import React, { ChangeEvent, Component, FormEvent, useState } from 'react';
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
  
    const navigate = useNavigate();
  
    const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      if (selectedFile) {
        setState({ ...state, pdf: selectedFile });
      }
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { title, content, pdf } = state;
  
      let form_data = new FormData();
  
      function isFile(value: any): value is File {
        return value instanceof File && typeof value.name === 'string';
      }
  
      if (isFile(pdf) && pdf.name) {
        form_data.append('pdf', pdf, pdf.name);
      }
  
      let url = 'http://localhost:8000/upload/posts/';
  
      axios
        .post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          navigate('/upload_completed');
        })
        .catch(err => console.log(err));
    };
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="m-auto flex justify-center itmes-center flex-row">
                        <label htmlFor="ex_file" className="cursor-pointer">
                            <div>
                                <div className='w-[170px] h-[50px] bg-[#FF6A3F] mr-4 flex justify-center items-center'>
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
                            className="hidden"
                        />
                        <button type='submit' className='w-[170px] h-[50px] bg-neutral-800 mr-4 flex justify-center items-center'>
                            <div>
                                <div className='w-[170px] h-[50px] mr-auto flex justify-center items-center'>
                                    <div className=" text-stone-200 text-base font-medium font-['Pretendard'] leading-none">2. 파일 업로드하기</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        );
    }


export default UploadFileButton;