import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useHighContrast } from "./HighContrastMode";
import { useLanguage } from "../LanguageContext";
import NavBar from "./NavBar";

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const [announcement, setAnnouncement] = useState("");

  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

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

  const handleLogin = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/login`, {
        loginId,
        password,
      });
      if (response.status === 200) {
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 401:
            setError(
              "Authentication failed. Please check your login ID and password."
            );
            break;
          default:
            setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error during login:", error);
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
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#FF6A3F] focus:outline-none"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Login ID"
              autoComplete="username"
              required
            />
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#FF6A3F] focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="username"
              required
            />
            <button
              className={`${textClassName} ${
                isHighContrast
                  ? "bg-yellow-300 hover:bg-yellow-600"
                  : "bg-[#FF6A3F] hover:bg-[#E6552F]"
              } w-full p-2`}
            >
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
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
