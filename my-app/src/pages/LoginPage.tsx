import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHighContrast } from "../components/HighContrastMode";
import { useLanguage } from "../LanguageContext";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";

axios.defaults.withCredentials = true;

const LoginPage: React.FC = () => {
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const [announcement, setAnnouncement] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const message =
      language === "ko"
        ? "Sunny Braille 로그인 페이지입니다"
        : "This is the Login page of Sunny Braille";
    setAnnouncement(message);

    const timer = setTimeout(() => {
      setAnnouncement("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <NavBar />
      <div
        className={`w-full h-auto ${
          isHighContrast ? "bg-black" : "bg-stone-200"
        } bottom-0 relative`}
      >
        <LoginForm />
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
          <button
            className={`mt-4  ${
              isHighContrast ? "text-stone-800" : "text-[#FF6A3F]"
            }  hover:underline`}
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
