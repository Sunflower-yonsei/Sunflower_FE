import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";

interface KakaoAuthContextType {
  isKakaoLoggedIn: boolean;
  setKakaoLoginStatus: (status: boolean) => void;
  getKakaoLoginStatus: () => boolean;
  resetKakaoLoginStatus: () => void;
}

const KakaoAuthContext = createContext<KakaoAuthContextType | undefined>(
  undefined
);

export const useKakaoAuth = () => {
  const context = useContext(KakaoAuthContext);
  if (!context)
    throw new Error("useKakaoAuth must be used within a KakaoAuthProvider");
  return context;
};

export const KakaoAuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, , removeCookie] = useCookies(["sessionId"]);
  const [isKakaoLoggedIn, setIsKakaoLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const sessionExists = !!cookies.sessionId;
    setIsKakaoLoggedIn(sessionExists);
  }, [cookies.sessionId]);

  const setKakaoLoginStatus = () => {
    setIsKakaoLoggedIn(true);
    sessionStorage.setItem("isKakaoLoggedIn", "true");
  };

  const getKakaoLoginStatus = (): boolean => {
    return isKakaoLoggedIn;
  };

  const resetKakaoLoginStatus = () => {
    removeCookie("sessionId", { path: "/" });
    sessionStorage.removeItem("isKakaoLoggedIn");
    setIsKakaoLoggedIn(false);
  };

  return (
    <KakaoAuthContext.Provider
      value={{
        isKakaoLoggedIn,
        setKakaoLoginStatus,
        getKakaoLoginStatus,
        resetKakaoLoginStatus,
      }}
    >
      {children}
    </KakaoAuthContext.Provider>
  );
};
