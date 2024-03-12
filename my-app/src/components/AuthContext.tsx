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

export const fetchWithSession = async (
  url: string,
  options: RequestInit = {}
) => {
  const sessionId = localStorage.getItem("sessionId");

  const headers = {
    ...options.headers,
    Authorization: sessionId ? `Bearer ${sessionId}` : "",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

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

  const setLoginStatus = (
    loggedIn: boolean,
    userId: string | null,
    sessionId?: string
  ) => {
    localStorage.setItem("isLoggedIn", loggedIn.toString());
    if (loggedIn) {
      localStorage.setItem("userId", userId || "");
      if (sessionId) {
        localStorage.setItem("sessionId", sessionId);
      }
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("sessionId");
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
