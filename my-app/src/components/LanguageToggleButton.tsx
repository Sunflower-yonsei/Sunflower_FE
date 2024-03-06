import React from "react";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";
import { useMediaQuery } from "react-responsive";


const LanguageToggleButton: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { language, toggleLanguage } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  const buttonText = language === "ko"
    ? isMobile ? "English" : "View in English"
    : isMobile ? "한국어" : "한국어로 보기";

  return (
    <button
      onClick={toggleLanguage}
      className={`${
        isHighContrast ? "bg-yellow-300 hover:bg-yellow-600" : "bg-stone-800 hover:bg-stone-600"
      } ${textClassName} font-bold py-2 px-4 rounded hover:bg-neutral-600 transition duration-300 ease-in-out ${
        isHighContrast ? "bg-black text-stone-800" : "text-white"
      }`}
    >
      {buttonText}
    </button>
  );
};

export default LanguageToggleButton;
