import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginForm: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(loginId, password);
      console.log("Login Success");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="ID"
          autoComplete="on"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="on"
        />
      </form>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
