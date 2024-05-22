import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { collection, onSnapshot, query } from "firebase/firestore";
import useFetch from '../core/hooks/useFetch';

const provider = new GoogleAuthProvider();
const AuthContext = createContext('auth');

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("data")));
    const [allUsers, setAllUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("data"));
    const [publish, setPublish] = useState(false);

    const login = async () => {
        await signInWithRedirect(auth, provider);
    }

    const dispatchLogin = async (data) => {
        setIsLoggedIn(true);
        setUserData(data);
        localStorage.setItem("data", JSON.stringify(data));
    }

    const logout = async () => {
        localStorage.removeItem("data");
        setIsLoggedIn(false);
        auth.signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    useEffect(() => {
        const getUsers = () => {
            const postRef = query(collection(db, "users"));
            onSnapshot(postRef, (snapshot) => {
                setAllUsers(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setUserLoading(false);
            });
        };
        getUsers();
    }, []);


    const { data: productData, loading: productLoading, moreLoading: moreProducts, loadedAll, handleLoadMore } = useFetch("products");

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn, login, logout, dispatchLogin, userData, publish, setPublish, productData, productLoading, moreProducts, loadedAll, handleLoadMore, allUsers,
                userLoading,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;