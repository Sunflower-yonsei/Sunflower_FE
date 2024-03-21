import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKakaoAuth } from "./KAuthContext";

const KakaoLoginHandler: React.FC = () => {
  const navigate = useNavigate();
  const { setKakaoLoginStatus } = useKakaoAuth();
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
        .then((response) => {
          if (response.ok) {
            setKakaoLoginStatus(true);
            navigate("/");
          } else {
            console.error("Session login failed");
            alert("Session login failed");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Login failed");
        });
    }
  }, [navigate, setKakaoLoginStatus]);
  return <div>Loading...</div>;
};

export default KakaoLoginHandler;
