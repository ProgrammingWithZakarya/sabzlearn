import { createContext } from "react";

const AuthContext = createContext({
    inLoggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { }
})
export default AuthContext