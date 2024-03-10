import React, { useState } from "react";
import axios from "axios";

const SignUpPage: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/join", {
        loginId,
        password,
      });
      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error during sign up:", error);
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;
