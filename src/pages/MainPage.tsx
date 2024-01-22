import React from 'react'
import NavBar from '../components/NavBar'
import '../tailwind.css';

import BrailleDeco from '../components/BrailleDeco';
import GotoBrf from '../components/GotoBrf';


const MainPage = () => {
    return (
        <div>

            <div className='w-full h-screen bg-stone-200 bottom-0 relative'>
                <NavBar />
                <div className="w-full h-[450px] overflow-hidden bg-[#FF6A3F]">
                    <div className='w-auto h-[72px] top-[200px] left-[150px] absolute'>
                        <div className="SunnyBraille text-neutral-800 text-6xl font-bold font-['Pretendard'] leading-[72px] tracking-wide">SUNNY BRAILLE</div>
                    </div>
                    <div className='w-auto h-[72px] top-[290px] left-[150px] absolute'>
                        <div className="w-[926px] text-neutral-800 text-2xl font-semibold font-['Pretendard'] leading-[18.90px]">Sunny Braille은 해바라기팀이 개발한 교육용 웹 점역 소프트웨어 입니다. </div>
                    </div>
                    <div className='w-auto h-auto top-[350px] left-[150px] absolute'>
                        <div className="w-[926px] text-neutral-800 text-base font-normal font-['Pretendard'] leading-9">Sunny Braille은 텍스트 뿐만 수식도 점역해 낼 수 있는 수학에 특화된 점역 프로그램입니다.<br />해바라기 팀은 고객님이 쉽고 빠르게 원하는 교육 자료를 점역하고 <br />더 많은 교육 자료의 접근성을 높이려 노력하고 있습니다.</div>
                    </div>
                    <div className='w-[650px] h-[650px] top-[40px] left-[1060px] relative overflow-hidden'>
                        <img src='img/bannerlogo.png' />
                    </div>
                </div>


                <div className='w-auto h-auto top-[80px] flex flex-col justify-center relative'>
                    <GotoBrf />
                    <div className="text-center text-gray-700 text-base font-normal font-['Pretendard'] my-[20px] leading-[37px]">
                        원하는 교육 자료 파일을 Sunny Braille에 업로드해 점자로 변환해보세요.<br />
                        변환된 파일을 다운로드해 점자정보단말기에 읽힐 수 있습니다.<br />
                    </div>
                </div>
            </div>
            <BrailleDeco />
        </div>
    )
}

export default MainPage