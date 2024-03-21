import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../LanguageContext";
import { useKakaoAuth } from "./KAuthContext";

const KakaoLoginButton: React.FC = () => {
  const { setKakaoLoginStatus, getKakaoLoginStatus } = useKakaoAuth(); // Use functions from context
  const navigate = useNavigate();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const handleFocus = () => {
      if (getKakaoLoginStatus()) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [navigate, getKakaoLoginStatus]);

  const handleLogin = () => {
    const loginWindow = window.open(`${apiUrl}/login/kakao`);

    const checkLoginStatus = setInterval(() => {
      if (getKakaoLoginStatus()) {
        clearInterval(checkLoginStatus);
        loginWindow?.close();
        setKakaoLoginStatus(true);
        navigate("/", { replace: true });
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex w-[400px] h-[50px] justify-center items-center bg-transparent font-bold py-2 px-4 mb-4 rounded overflow-hidden relative ${textClassName}`}
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
