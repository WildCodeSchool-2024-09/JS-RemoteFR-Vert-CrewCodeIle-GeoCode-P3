import Cookies from "js-cookie";
import {
  type ReactNode,
  createContext,
  useContext,
  // useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type userContextProps = {
  token: string | undefined;
  setToken: (s: string | undefined) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (s: boolean) => void;
  login: (s: string | undefined) => void;
  logout: () => void;
  authenticate: () => void;
};

export const AuthContext = createContext<userContextProps>({
  token: undefined,
  setToken: () => undefined,
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
  login: () => undefined,
  logout: () => undefined,
  authenticate: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/login`, {
  //     credentials: "include",
  //   });
  // .then((response) => response.json());

  // .then((data) => Cookies.set("authToken", data.token));
  // .then(() => setToken(Cookies.get("authToken")));

  // .then((data) => setToken(data.token));
  // }, []);

  // useEffect(() => {
  //   setToken(Cookies.get("authToken"));
  // }, []);

  const login = (jwtToken: string | undefined) => {
    if (jwtToken !== undefined) {
      setToken(jwtToken);
      setIsLoggedIn(true);
    }
  };
  const logout = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    setToken(undefined);
    navigate("/home");
  };

  const authenticate = () => {
    !isLoggedIn && navigate("/home/login");
  };

  // useEffect(() => {
  //   !isLoggedIn && navigate("/home/login");
  // }, [isLoggedIn, navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        logout,
        login,
        setIsLoggedIn,
        setToken,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
