import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
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
      <input
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="Login ID"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
