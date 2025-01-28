// import { createContext,  useState, type ReactNode } from "react";
// import Cookies from "js-cookie"

// const UserContext = createContext(null);

// export const UserProvider = ({ Children }: { Children: ReactNode }) => {

//     const [token, setAuthState] = useState<string | null>(null)

//     const userToken = Cookies.get("auth_token")
//     const tokenFromCookie = ()=> setAuthState(userToken)

//     console.info(userToken)

//     return <UserContext.Provider value={}>{Children}</UserContext.Provider>
// };
