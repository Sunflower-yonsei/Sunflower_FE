import { CookieSetOptions } from "universal-cookie";

export const setKakaoLoginStatus = (status: boolean) => {
  localStorage.setItem("isKakaoLoggedIn", JSON.stringify(status));
};

export const getKakaoLoginStatus = (): boolean => {
  const status = localStorage.getItem("isKakaoLoggedIn");
  return status ? JSON.parse(status) : false;
};

export const resetKakaoLoginStatus = (
  removeCookieFunction: (name: string, options?: CookieSetOptions) => void
) => {
  removeCookieFunction("sessionId", { path: "/" });
  localStorage.removeItem("isKakaoLoggedIn");
};
