import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHighContrast } from "./HighContrastMode";
import { useLanguage } from "../LanguageContext";

const SignUpPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";

  const validateForm = () => {
    return loginId.trim() && password.trim();
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      setError(
        language === "ko"
          ? "필수 항목을 입력하지 않았습니다."
          : "Please fill in all required fields."
      );
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${apiUrl}/join`, {
        loginId,
        password,
      });
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          setError("A server error occurred. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
      <form className="p-8" onSubmit={handleSignUp}>
        <input
          className={`${textClassName} w-full p-2 mb-4 border ${
            isSubmitted && !loginId.trim() ? "border-red-500" : "rounded"
          }`}
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="Login ID"
          autoComplete="username"
          required
        />
        <input
          className={`w-full p-2 mb-4 border ${textClassName} ${
            isSubmitted && !password.trim() ? "border-red-500" : "rounded"
          }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className={`${textClassName} ${
            isHighContrast
              ? "bg-yellow-300 hover:bg-yellow-600"
              : "bg-[#FF6A3F] hover:bg-[#E6552F]"
          } w-full p-2`}
        >
          Sign Up
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
