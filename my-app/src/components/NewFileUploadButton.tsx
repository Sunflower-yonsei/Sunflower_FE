import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ConvertPage from "../pages/ConvertPage";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

const NewFileUpload = () => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  return (
    <div>
      <Link to="/convert">
        <button>
          <div
            className={`w-[320px] h-[36px] ${
              isHighContrast
                ? "bg-yellow-300 hover:bg-yellow-600"
                : "bg-stone-800 hover:bg-stone-600"
            } ml-4 rounded justify-center items-center gap-2.5 inline-flex transition duration-300 ease-in-out`}
          >
            <div
              className={`${textClassName} ${
                isHighContrast ? "text-stone-800" : "text-white"
              } text-base font-medium  leading-none`}
            >
              {language === "ko"
                ? "다른 파일 변환하기"
                : "Convert Another File"}
            </div>
          </div>
        </button>
      </Link>

      <Routes>
        <Route path="/convert" element={<ConvertPage />} />
      </Routes>
    </div>
  );
};

export default NewFileUpload;
