import React from 'react'
import '../tailwind.css';
import { Link, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage';


const NavBar = () => {
    return (
        <div className="w-full h-[75px] relative bg-stone-200">
            <div className="h-9 px-3 py-[7px] right-[-1050px] top-[24px] relative justify-center items-center gap-2.5 inline-flex">
                <div className="text-neutral-800 text-opacity-50 text-[15px] font-normal font-['Pretendard'] leading-[15px]">Skip Navigation</div>
            </div>
            <div className="w-auto h-9 px-3 py-2.5 right-[330px] top-[24px] absolute justify-center items-center inline-flex">
                <div className=" text-neutral-800 text-base font-normal font-['Pretendard'] leading-none">제품 소개</div>
            </div>
            <div className="w-auto h-9 px-3 py-2.5 right-[200px] top-[24px] absolute justify-center items-center inline-flex">
                <div className=" text-neutral-800 text-base font-medium font-['Pretendard'] leading-none">파일 변환하기</div>
            </div>
            <div className="w-auto h-9 px-3 py-2.5 right-[120px] top-[24px] absolute justify-center items-center inline-flex">
                <div className=" text-neutral-800 text-base font-medium font-['Pretendard'] leading-none">도움말</div>
            </div>

            <Link to='/'>
                <button className="w-auto h-[40px] left-[62px] top-[22px] absolute justify-center items-end gap-[6.45px] inline-flex">
                    <div className="w-[40px] h-10 relative">
                        <img className="w-[37px] h-[37px] object-fill" src="img/mainlogo.svg" alt='group' />
                    </div>
                    <div className="text-neutral-800 text-xl text-left font-bold font-['Univers'] leading-[20px]">SUNNY <br />BRAILLE</div>
                </button>
            </Link>

            <Routes>
                <Route path='/convert' element={<MainPage />} />
            </Routes>
            <div className="w-full h-[0px] left-0 top-[75px] absolute border border-neutral-800 border-opacity-70"></div>

            {/*<div className="w-[59px] h-0.5 left-[1098px] top-[73px] absolute bg-neutral-800" />*/}
        </div>
    )
}

export default NavBar