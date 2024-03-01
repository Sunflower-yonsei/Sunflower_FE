import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const ConvertButton = () => {

  const navigate = useNavigate();

  const handleClick = async () => {

    try {
      const response = await axios.post('convert/', {
      });
      
      console.log(response.data); 
    } catch (error) {

      console.error('Error:', error);
      navigate('/download');
    }
  };

  return (
    <div>
            <button onClick={handleClick}>
                <div className='w-[320px] h-[50px] bg-neutral-800 ml-4 mb-2 flex justify-center items-center'>
                    <div className="text-stone-200 text-base font-medium font-['Pretendard'] leading-none">파일 변환하기</div>
                </div>
            </button>

    </div>
  )
}

export default ConvertButton