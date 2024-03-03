import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HighContrastModeContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const defaultContextValue: HighContrastModeContextType = {
  isHighContrast: false,
  toggleHighContrast: () => {},
};

export const HighContrastModeContext = createContext<HighContrastModeContextType>(defaultContextValue);

interface HighContrastModeProviderProps {
  children: ReactNode;
}

export function HighContrastModeProvider({ children }: HighContrastModeProviderProps) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setIsHighContrast((prevIsHighContrast) => !prevIsHighContrast);
  };

  return (
    <HighContrastModeContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      {children}
    </HighContrastModeContext.Provider>
  );
}

export const useHighContrast = () => useContext(HighContrastModeContext);
