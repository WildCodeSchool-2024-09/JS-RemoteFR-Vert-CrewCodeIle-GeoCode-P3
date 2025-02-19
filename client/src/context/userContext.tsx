import { type ReactNode, createContext, useContext, useState } from "react";

type userContextProps = {
  userInfo: string | undefined;
  login: (s: string | undefined) => void;
  clearUser: (s: boolean) => void;
  connected: (s: boolean) => void;
  isConnected: boolean | undefined;
};

export const AuthContext = createContext<userContextProps>({
  userInfo: undefined,
  login: () => undefined,
  clearUser: () => undefined,
  connected: () => false,
  isConnected: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<string | undefined>();

  const login = (authentification: string | undefined) => {
    setUserInfo(authentification);
  };

  const clearUser = (authorisation: boolean) => {
    setIsConnected(authorisation);
    setUserInfo(undefined);
  };
  const connected = (authorisation: boolean) => {
    setIsConnected(authorisation);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        userInfo,
        clearUser,
        isConnected,
        connected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
