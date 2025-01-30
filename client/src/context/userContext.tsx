import { type ReactNode, createContext, useContext, useState } from "react";

import type { UserProps } from "../assets/definition/lib";

type userContextProps = {
  user: UserProps | null;
  login: (s: UserProps) => void;
  logout: () => void;
};

export const AuthContext = createContext<userContextProps>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (userData: UserProps) => {
    setUser(userData);
  };
  console.info(user);
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
