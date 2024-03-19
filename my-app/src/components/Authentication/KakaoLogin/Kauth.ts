export const setKakaoLoginStatus = (status: boolean) => {
  localStorage.setItem("isKakaoLoggedIn", JSON.stringify(status));
};

export const getKakaoLoginStatus = (): boolean => {
  const status = localStorage.getItem("isKakaoLoggedIn");
  return status ? JSON.parse(status) : false;
};

export const resetKakaoLoginStatus = () => {
  localStorage.removeItem("isKakaoLoggedIn");
};
