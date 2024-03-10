import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

const AuthButtons: React.FC = () => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isLoggedIn, setLoggedIn } = useAuth();
  const { isHighContrast } = useHighContrast();

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="flex justify-center space-x-4">
      {isLoggedIn ? (
        <>
          <span
            className={`${textClassName} ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            }`}
          >
            {language === "ko" ? "로그인이 완료되었습니다" : "Login Success"}
          </span>
          <button
            onClick={handleLogout}
            className={`${textClassName} ${
              isHighContrast ? "text-stone-800" : "text-white"
            } `}
          >
            {language === "ko" ? "로그아웃하기" : "Logout"}
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              }`}
            >
              {language === "ko" ? "로그인하기" : "Login"}
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={`${textClassName} ${
                isHighContrast ? "text-yellow-300" : "text-neutral-800"
              }`}
            >
              {language === "ko" ? "회원가입" : "Sign Up"}
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
