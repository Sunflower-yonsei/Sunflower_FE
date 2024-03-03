import React from "react";
import { useHighContrast } from "./HighContrastMode";
import { useLanguage } from "../LanguageContext";

const ContrastToggleButton = () => {
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  const normalMode = language === "ko" ? "일반 모드로 변경" : "To Normal Mode";

  const highContrastMode =
    language === "ko" ? "고대비 모드로 변경" : "To High Contrast Mode";

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
