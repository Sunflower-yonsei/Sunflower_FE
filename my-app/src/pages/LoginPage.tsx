import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHighContrast } from "../components/Accessibility/HighContrastMode";
import { useLanguage } from "../LanguageContext";
import NavBar from "../components/NavBar";
import LoginForm from "../components/Authentication/LoginForm";

axios.defaults.withCredentials = true;

const LoginPage: React.FC = () => {
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const [announcement, setAnnouncement] = useState("");

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
        className={`w-full h-200 ${
          isHighContrast ? "bg-black" : "bg-stone-200"
        } bottom-0 relative`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
