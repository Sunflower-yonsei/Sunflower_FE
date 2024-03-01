import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="bg-neutral-800 text-white font-bold py-2 px-4 rounded hover:bg-neutral-600 transition duration-300 ease-in-out"
    >
      {language === 'ko' ? 'View in English' : '한국어로 보기'}
    </button>
  );
};

export default LanguageToggleButton;
