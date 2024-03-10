import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHighContrast } from "./HighContrastMode";
import { useLanguage } from "../LanguageContext";
import NavBar from "./NavBar";

const SignUpPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const [announcement, setAnnouncement] = useState("");

  const validateForm = () => {
    return loginId.trim() && password.trim();
  };

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
        alert(
          language === "ko"
            ? "회원가입이 완료되었습니다.\n지금 바로 로그인하세요!"
            : "Sign up successful.\nPlease log in now!"
        );
        navigate("/login");
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
          <form
            className="p-8 bg-white shadow-md rounded-lg"
            onSubmit={handleSignUp}
          >
            <h2
              className={`${textClassName} text-2xl font-semibold mb-6 text-center`}
            >
              Sign Up
            </h2>

            <input
              className={`${textClassName} w-full p-2 mb-4 border ${
                isSubmitted && !loginId.trim() ? "border-red-500" : "rounded"
              }`}
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="ID"
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
          <button
            className={`mt-4  ${
              isHighContrast ? "text-stone-800" : "text-[#FF6A3F]"
            }  hover:underline`}
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
