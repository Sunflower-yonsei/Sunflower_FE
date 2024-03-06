import React from "react";
import { useHighContrast } from "./HighContrastMode";
import { useLanguage } from "../LanguageContext";
import { useMediaQuery } from "react-responsive";


const ContrastToggleButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  const normalMode = isMobile && language === "ko" ? "일반 모드" : language === "ko" ? "일반 모드로 변경" : "Normal Mode";
  const highContrastMode = isMobile && language === "ko" ? "고대비 모드" : language === "ko" ? "고대비 모드로 변경" : "Contrast Mode";


  return (
    <button
      onClick={toggleHighContrast}
      className={`${
        isHighContrast
          ? "bg-yellow-300 hover:bg-yellow-600"
          : "bg-stone-800 hover:bg-stone-600"
      } ${textClassName} font-bold py-2 px-4 rounded hover:bg-neutral-600 transition duration-300 ease-in-out ${
        isHighContrast ? "bg-black text-stone-800" : "text-white"
      }`}
    >
      {isHighContrast ? normalMode : highContrastMode}
    </button>
  );
};

export default ContrastToggleButton;
