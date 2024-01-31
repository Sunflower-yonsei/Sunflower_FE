import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const ConvertButton = () => {

  const navigate = useNavigate();

  const handleClick = async () => {

    try {
      const response = await axios.post('http://54.180.106.239:8000/convert/', {
        // 필요한 경우 데이터를 전송할 수 있음
      });
      
      // Django에서 받은 응답에 대한 처리
      console.log(response.data); // 받은 데이터를 콘솔에 출력하는 등의 처리
      // 페이지 전환 또는 추가 작업 수행
    } catch (error) {
      // 오류 처리
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