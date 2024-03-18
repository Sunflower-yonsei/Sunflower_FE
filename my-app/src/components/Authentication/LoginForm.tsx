import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../../LanguageContext";
import { useHighContrast } from "../Accessibility/HighContrastMode";
import KakaoLoginButton from "./KakaoLogin/KakaoLoginButton";

const LoginForm: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await login(loginId, password);
      console.log("Login Success");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
      <form className="p-8 bg-white shadow-md rounded-lg">
        <h2
          className={`${textClassName} text-2xl font-semibold mb-6 text-center`}
        >
          Login
        </h2>
        <input
          className={`${textClassName} w-full p-2 mb-4 border`}
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="ID"
          autoComplete="on"
        />
        <input
          className={`${textClassName} w-full p-2 mb-4 border`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="on"
        />
        <button
          className={`${textClassName} ${
            isHighContrast
              ? "bg-yellow-300 hover:bg-yellow-600"
              : "bg-[#FF6A3F] hover:bg-[#E6552F]"
          } w-full p-2`}
          onClick={handleLogin}
        >
          Login
        </button>
        <br />
        <KakaoLoginButton />
      </form>

      <button
        className={`mt-4 ${
          isHighContrast ? "text-stone-800" : "text-[#FF6A3F]"
        }  hover:underline`}
        onClick={() => navigate("/signup")}
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
};

export default LoginForm;
