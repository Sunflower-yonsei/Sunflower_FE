import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "./HighContrastMode";

const AuthButtons: React.FC = () => {
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      logout();
      console.log("Logout success");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
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
        </>
      ) : (
        <div>
          <Link to="/login">
            <button className={`...`}>
              {language === "ko" ? "로그인하기" : "Login"}
            </button>
          </Link>
        </div>
      )}
      <button onClick={handleLogout} className={`...`}>
        {language === "ko" ? "로그아웃하기" : "Logout"}
      </button>
    </div>
  );
};

export default AuthButtons;
