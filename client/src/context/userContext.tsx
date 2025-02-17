import { type ReactNode, createContext, useContext, useState } from "react";

type UserInfoProps = {
  email: string;
  checkRole: Record<string, string>[];
  authentification: boolean;
};

type userContextProps = {
  userInfo: UserInfoProps | undefined;
  login: (s: UserInfoProps | undefined) => void;
  clearUser: (s: string | undefined) => void;
};

export const AuthContext = createContext<userContextProps>({
  userInfo: undefined,
  login: () => undefined,
  clearUser: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [userToken, setUserToken] = useState<boolean | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>();
  console.info(userInfo);

  const login = (authentification: UserInfoProps | undefined) => {
    setUserInfo(authentification);
  };

  const clearUser = () => {
    setUserInfo(undefined);
  };

  return (
    <AuthContext.Provider value={{ login, userInfo, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
