import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLoginHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(
        `${process.env.REACT_APP_API_URL}/login/kakao/session?code=${code}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default KakaoLoginHandler;
