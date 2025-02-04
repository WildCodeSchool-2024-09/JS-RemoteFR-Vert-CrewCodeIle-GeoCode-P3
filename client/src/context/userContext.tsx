import { jwtDecode } from "jwt-decode";
import { type ReactNode, createContext, useContext, useState } from "react";
import type { UserProps } from "../assets/definition/lib";

type userContextProps = {
  userToken: string | null;
  userInfo: UserProps | undefined;
  login: (s: string | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<userContextProps>({
  userToken: null,
  userInfo: undefined,
  login: () => undefined,
  logout: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserProps>();

  const login = (token: string | null) => {
    setUserToken(token);
    if (token) {
      setUserInfo(jwtDecode(token));
    }
  };

  const logout = () => {
    setUserToken(null);
    setUserInfo(undefined);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
