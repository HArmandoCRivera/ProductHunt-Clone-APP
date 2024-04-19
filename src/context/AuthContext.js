import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = () => {
        const token = "hugocastrillon";
        localStorage.setItem("token", token)
        setIsLoggedIn(true);
    }

    const logout = async () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;