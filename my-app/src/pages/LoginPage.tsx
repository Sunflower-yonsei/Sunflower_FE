import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useHighContrast } from "../components/HighContrastMode";
import { useLanguage } from "../LanguageContext";
import NavBar from "../components/NavBar";

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const [announcement, setAnnouncement] = useState("");

  const navigate = useNavigate();
  const { setLoginStatus } = useAuth();

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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/login`,
        { loginId, password },
        { withCredentials: true }
      );
      const sessionId = response.headers["sessionid"] as string | undefined;
      if (sessionId) {
        localStorage.setItem("sessionid", sessionId);
        setLoginStatus(true, loginId);
        navigate("/");
      } else {
        alert("sessionId not found in response");
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage =
              "Authentication failed. Please check your login ID and password.";
            break;
        }
      }
      alert("Error during login: " + errorMessage);
    }
  };

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
          <form
            className="p-8 bg-white shadow-md rounded-lg"
            onSubmit={handleLogin}
          >
            <h2
              className={`${textClassName} text-2xl font-semibold mb-6 text-center`}
            >
              Login
            </h2>
            <input
              className={`${textClassName} w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#FF6A3F] focus:outline-none`}
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="ID"
              autoComplete="username"
              required
            />
            <input
              className={`${textClassName} w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#FF6A3F] focus:outline-none`}
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
