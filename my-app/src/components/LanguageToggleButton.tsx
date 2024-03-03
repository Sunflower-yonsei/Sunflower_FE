import React from "react";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  return (
    <button
      onClick={toggleLanguage}
      className={`${
        isHighContrast ? "bg-yellow-300 hover:bg-yellow-600" : "bg-stone-800 hover:bg-stone-600"
      } ${textClassName} font-bold py-2 px-4 rounded hover:bg-neutral-600 transition duration-300 ease-in-out ${
        isHighContrast ? "bg-black text-stone-800" : "text-white"
      }`}
    >
      {language === "ko" ? "View in English" : "한국어로 보기"}
    </button>
  );
};

export default LanguageToggleButton;
