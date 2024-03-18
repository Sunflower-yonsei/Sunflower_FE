import React from "react";
import { useLanguage } from "../LanguageContext";

const KakaoLoginButton: React.FC = () => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleLogin = () => {
    window.open(`${apiUrl}/login/kakao`);
  };

  return (
    <button
      onClick={handleLogin}
      className="flex w-full h-[50px] justify-center items-center bg-transparent font-bold py-2 px-4 mb-4 rounded overflow-hidden relative"
    >
      {textClassName ? (
        <img
          src="/kakao_login/ko/kakao_login_large_wide.png"
          alt="Kakao Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src="/kakao_login/en/kakao_login_large_wide.png"
          alt="Kakao Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </button>
  );
};

export default KakaoLoginButton;
