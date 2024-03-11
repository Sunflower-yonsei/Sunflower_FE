import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_TIMEOUT = 10 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedInState] = useState<boolean>(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const lastLoginTime = localStorage.getItem("lastLoginTime");
    const isSessionExpired =
      lastLoginTime &&
      new Date().getTime() - Number(lastLoginTime) > SESSION_TIMEOUT;
    return isUserLoggedIn && !isSessionExpired;
  });

  const setLoggedIn = (loggedIn: boolean) => {
    localStorage.setItem("isLoggedIn", loggedIn.toString());
    if (loggedIn) {
      localStorage.setItem("lastLoginTime", new Date().getTime().toString());
    } else {
      localStorage.removeItem("lastLoginTime");
    }
    setLoggedInState(loggedIn);
  };

  useEffect(() => {
    const updateLastLoginTime = () => {
      if (isLoggedIn) {
        localStorage.setItem("lastLoginTime", new Date().getTime().toString());
      }
    };

    window.addEventListener("click", updateLastLoginTime);
    window.addEventListener("keypress", updateLastLoginTime);

    return () => {
      window.removeEventListener("click", updateLastLoginTime);
      window.removeEventListener("keypress", updateLastLoginTime);
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
