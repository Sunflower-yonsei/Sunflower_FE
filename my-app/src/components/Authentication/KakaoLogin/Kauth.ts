import { useCookies } from "react-cookie";

export const setKakaoLoginStatus = (status: boolean) => {
  localStorage.setItem("isKakaoLoggedIn", JSON.stringify(status));
};

export const getKakaoLoginStatus = (): boolean => {
  const status = localStorage.getItem("isKakaoLoggedIn");
  return status ? JSON.parse(status) : false;
};

export const resetKakaoLoginStatus = () => {
  const [, , removeCookie] = useCookies(["sessionId"]);
  removeCookie("sessionId");
  localStorage.removeItem("isKakaoLoggedIn");
};
