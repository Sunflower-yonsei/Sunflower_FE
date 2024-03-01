import React from "react";
import "../tailwind.css";
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { useMediaQuery } from "react-responsive";

const NavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="w-full h-[75px] relative bg-stone-200">
      {/* Computer Page */}
      {!isMobile && (
        <div>
          <div className="absolute right-10 top-[24px] flex items-center gap-4">
            <a
              href="#mainContent"
              className="text-neutral-800 text-opacity-50 text-sm font-normal font-eng leading-4 px-3 py-2.5 bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-200 focus:ring-white"
            >
              Skip Navigation
            </a>

            <Link
              to="/product"
              className="text-neutral-800 text-base font-kor font-normal px-3 py-2.5"
            >
              제품 소개
            </Link>
            <Link
              to="/convert"
              className="text-neutral-800 text-base font-kor font-medium px-3 py-2.5"
            >
              파일 변환하기
            </Link>
            <Link
              to="/help"
              className="text-neutral-800 text-base font-kor font-medium px-3 py-2.5"
            >
              도움말
            </Link>
          </div>
          <Link to="/">
            <button className="w-auto h-[40px] left-[62px] top-[22px] absolute justify-center items-end gap-[6.45px] inline-flex">
              <div className="w-[40px] h-10 relative">
                <img
                  className="w-[38px] h-[38px] object-fill"
                  src="img/mainlogo.svg"
                  alt="group"
                />
              </div>
              <div className="text-neutral-800 text-xl text-left font-bold font-eng leading-[20px]">
                SUNNY <br />
                BRAILLE
              </div>
            </button>
          </Link>
        </div>
      )}

      {/* Mobile Page */}
      {isMobile && (
        <div>
          <Link to="/">
            <button className="w-auto h-[40px] left-[45px] top-[22px] absolute justify-center items-end gap-[6.45px] inline-flex">
              <div className="w-[40px] h-10 relative">
                <img
                  className="w-[38px] h-[38px] object-fill"
                  src="img/mainlogo.svg"
                  alt="group"
                />
              </div>
              <div className="text-neutral-800 text-xl text-left font-bold font-['Univers'] leading-[20px]">
                SUNNY <br />
                BRAILLE
              </div>
            </button>
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/convert" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default NavBar;
