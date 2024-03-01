// LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<string>('ko');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ko' ? 'en' : 'ko'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
