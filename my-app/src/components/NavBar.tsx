import React, { useState } from "react";
import "../tailwind.css";
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { useMediaQuery } from "react-responsive";
import LanguageToggleButton from "./LanguageToggleButton";
import { useLanguage } from "../LanguageContext";
import ContrastToggleButton from "./ContrastToggleButton";
import { useHighContrast } from "./HighContrastMode";
import { MdMenu } from "react-icons/md";
import { useAuth } from "./AuthContext";
import AuthButtons from "./AuthButton";

const NavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 800 });
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <div
      className={`w-full h-[80px] relative ${
        isHighContrast ? "bg-black" : "bg-stone-200"
      }`}
    >
      {/* Computer Page */}
      {!isMobile && (
        <div>
          <div className="absolute right-10 top-[24px] flex items-center gap-4">
            <AuthButtons />
            <ContrastToggleButton />
            <LanguageToggleButton />
            <a
              href="#mainContent"
              className={`${
                isHighContrast
                  ? "text-yellow-300"
                  : "text-neutral-800  text-opacity-50"
              } text-sm font-normal font-eng leading-4 px-3 py-2.5 bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-200 focus:ring-white `}
            >
              Skip Navigation
            </a>

            <Link
              to="/product"
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              } text-base font-normal px-3 py-2.5 link-underline hover:font-bold`}
            >
              {language === "ko" ? "제품 소개" : "Introduction"}
            </Link>
            <Link
              to="/convert"
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              }  text-base font-normal px-3 py-2.5 link-underline hover:font-bold`}
            >
              {language === "ko" ? "파일 변환하기" : "Convert File"}
            </Link>
            <Link
              to="/help"
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              }  text-base font-normal px-3 py-2.5 link-underline hover:font-bold`}
            >
              {language === "ko" ? "도움말" : "Help"}
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
              <div
                className={`${
                  isHighContrast ? "text-yellow-300" : "text-neutral-800"
                }  text-xl text-left font-bold font-eng leading-[20px]`}
              >
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
          <div className="relative">
            <button
              onClick={toggleSidebar}
              className="absolute top-5 left-5 z-50 text-4xl"
            >
              <MdMenu />
            </button>

            {/*Side Bar*/}
            <div
              className={`fixed top-0 left-0 z-40 h-full w-64 bg-stone-200 transition-transform transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="absolute left-5 top-20 flex flex-col items-left gap-4 p-4">
                {isLoggedIn && <div>로그인되었습니다</div>}
                <Link
                  to="/product"
                  className={`${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  } text-base font-normal px-3 py-2.5`}
                >
                  {language === "ko" ? "제품 소개" : "Introduction"}
                </Link>
                <Link
                  to="/convert"
                  className={`${textClassName} ${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  }  text-base font-normal px-3 py-2.5 link-underline hover:font-bold`}
                >
                  {language === "ko" ? "파일 변환하기" : "Convert File"}
                </Link>
                <Link
                  to="/help"
                  className={`${textClassName} ${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  }  text-base font-normal px-3 py-2.5 link-underline hover:font-bold`}
                >
                  {language === "ko" ? "도움말" : "Help"}
                </Link>
              </div>
            </div>

            {/* 오버레이 (사이드바가 열릴 때 배경을 어둡게) */}
            {isOpen && (
              <div
                className="fixed inset-0 z-30 bg-black bg-opacity-50"
                onClick={toggleSidebar}
              ></div>
            )}
          </div>

          <div>
            <Link to="/">
              <button className="w-auto h-[40px] left-[70px] top-[22px] relative justify-center items-end gap-[6.45px] inline-flex">
                <div className="w-[40px] h-10 relative">
                  <img
                    className="w-[38px] h-[38px] object-fill"
                    src="img/mainlogo.svg"
                    alt="group"
                  />
                </div>
                <div
                  className={`${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  }  text-xl text-left font-bold font-['Univers'] leading-[20px]`}
                >
                  SUNNY <br />
                  BRAILLE
                </div>
              </button>
            </Link>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/convert" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default NavBar;
