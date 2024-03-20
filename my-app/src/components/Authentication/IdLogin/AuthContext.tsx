import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (loginId: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const usePersistentState = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(["sessionId"]);
  const [, , removeCookie] = useCookies(["sessionId"]);
  const [isLoggedIn, setIsLoggedIn] = usePersistentState<boolean>(
    "isLoggedIn",
    false
  );

  useEffect(() => {
    const sessionExists = !!cookies.sessionId;
    setIsLoggedIn(sessionExists);
  }, [cookies.sessionId, setIsLoggedIn]);

  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (session === "true") {
      setIsLoggedIn(true);
    }
  });

  const login = async (loginId: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { loginId, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        console.error("Session Login not found");
        alert("Session Login not found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    removeCookie("sessionId", { path: "/" });
    alert("Logout success");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
