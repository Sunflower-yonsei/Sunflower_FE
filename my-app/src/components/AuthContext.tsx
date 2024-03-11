import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  setLoginStatus: (loggedIn: boolean, userId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(loggedIn);
      setUserId(userId);
    };

    checkLoginStatus();
  }, []);

  const setLoginStatus = (loggedIn: boolean, userId: string | null) => {
    localStorage.setItem("isLoggedIn", loggedIn.toString());
    if (loggedIn && userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
    setIsLoggedIn(loggedIn);
    setUserId(userId);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
