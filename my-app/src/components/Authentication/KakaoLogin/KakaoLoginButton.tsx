import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../LanguageContext";
import { getKakaoLoginStatus } from "./Kauth";

const KakaoLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = () => {
    const loginWindow = window.open(`${apiUrl}/login/kakao`);

    const checkLoginStatus = setInterval(() => {
      if (getKakaoLoginStatus()) {
        clearInterval(checkLoginStatus);
        navigate("/");
        if (loginWindow) {
          loginWindow.close();
        }
      }
    }, 1000);

    window.onfocus = () => {
      clearInterval(checkLoginStatus);
      if (getKakaoLoginStatus()) {
        navigate("/");
      }
    };
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex w-full h-[50px] justify-center items-center bg-transparent font-bold py-2 px-4 mb-4 rounded overflow-hidden relative ${textClassName}`}
    >
      <img
        src={`/kakao_login/${
          language === "ko" ? "ko" : "en"
        }/kakao_login_large_wide.png`}
        alt="Kakao Login"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </button>
  );
};

export default KakaoLoginButton;
