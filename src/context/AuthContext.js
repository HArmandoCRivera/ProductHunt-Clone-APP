import { createContext, useContext, useState } from 'react';
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebaseConfig';
import useFetch from '../core/hooks/useFetch';

const provider = new GoogleAuthProvider();
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("data")));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("data"));
    const [publish, setPublish] = useState(false);

    const login = async () => {
        await signInWithRedirect(auth, provider);
    }

    const dispatchLogin = (data) => {
        setIsLoggedIn(true);
        setUserData(data);
        localStorage.setItem("data", JSON.stringify(data));
    }

    const logout = async () => {
        localStorage.removeItem("data");
        setIsLoggedIn(false);
    }

    // loading,
    // data,
    // moreLoading,
    // loadedAll,
    // handleLoadMore


    const { data: productData, loading: productLoading, moreLoading: moreProducts, loadedAll, handleLoadMore } = useFetch("products");

    return (
        <AuthContext.Provider value={{
            isLoggedIn, login, logout, dispatchLogin, userData, publish, setPublish, productData, productLoading, moreProducts, loadedAll, handleLoadMore
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;