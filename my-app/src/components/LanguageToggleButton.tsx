import React from 'react';
import { useLanguage } from '../LanguageContext'; // 경로는 실제 구조에 맞게 조정하세요.

const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage}>
      {language === 'ko' ? 'English' : '한국어'}
    </button>
  );
};

export default LanguageToggleButton;
