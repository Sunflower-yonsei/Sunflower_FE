import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useHighContrast } from "./HighContrastMode";

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isHighContrast } = useHighContrast();

  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200">
      <div className="p-8">
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="Login ID"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={`${
            isHighContrast
              ? "bg-yellow-300 hover:bg-yellow-600"
              : "bg-[#FF6A3F] hover:bg-[#E6552F]"
          } w-full p-2`}
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
