import React, { useState, useEffect } from 'react';
import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import { getRedirectResult } from 'firebase/auth';
import { TfiSearch } from "react-icons/tfi";
import { BsBell } from "react-icons/bs";
import { useAuth } from '../../context/AuthContext';
import { Login } from '../login/Login';
import { DropDownMenu } from '../dropdown/DropdownMenu';
import { Link, useNavigate } from 'react-router-dom';
import paths from '../../routes/paths';
import './Header.css';

export const Header = (props) => {
    const { isLoggedIn, login, userData, dispatchLogin } = useAuth();
    const [isOpenLogin, setOpenLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        await login();
    }
    const showLogin = e => {
        setOpenLogin(!isOpenLogin);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleUserMenu = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if(searchQuery.length){
                navigate(`/${paths.PRODUCTS}/search/${searchQuery}`);
            }else{
                navigate(`/${paths.PRODUCTS}`);
            }
        }
    };

    useEffect(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (result?.user) {
                    await dispatchLogin(result.user);
                }
            })
            .catch(function (error) {
                console.log({ error });
            });
    }, [dispatchLogin]);

    useEffect(() => {
        async function verifyUser() {
            const ref = doc(db, "users", userData?.uid);
            const userDoc = await getDoc(ref);

            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: userData?.uid,
                    displayName: userData?.displayName,
                    email: userData?.email,
                    photoURL: userData?.photoURL,
                    bio: "",
                    follows: [],
                    followers: [],
                    created: Date.now(),
                }).then((value) => {
                });
            }
        }
        if(isLoggedIn){
            verifyUser();
        }
    }, [userData, isLoggedIn]);

    return (
        <>
            <div className="header">
                <div className='branding-search'>
                    <Link to="/" className='logo-link'>
                        <img className="logo" src="/images/logo.png" alt="logo" />
                    </Link>
                    <div className="search-bar">
                        <TfiSearch className="search-icon" />
                        <input className='search-input'
                            type="text"
                            placeholder="Search ( ctrl + k )"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
                <div className="nav-user-flex">
                    <div className="nav-links-sec">
                        <NavLinks url={'/'} name="Launches  " />
                        <NavLinks url={'/' + paths.PRODUCTS} name="Products" />
                        <NavLinks url="##" name="News" />
                        <NavLinks url="##" name="Community" />
                        <NavLinks url="##" name="Advertise" />
                    </div>
                    {isLoggedIn ? (
                        <div className="user-login-display">
                            <Link to="/new">
                                <button className="call-action">Submit</button>
                            </Link>
                            <BsBell className="notification-icon" />
                            <div className='user-menu'>
                                <img
                                    src={userData?.photoURL ?? "/images/avatar.jpg"}
                                    className="user-avatar"
                                    alt="user-avatar"
                                    onClick={() => handleUserMenu()}
                                />
                                {isDropdownVisible && <DropDownMenu />}
                            </div>
                        </div>
                    ) : (
                        <div className="user-out-display">
                            <NavLinks url="##" name="How to Post?" />
                            <button className="call-action" onClick={() => showLogin()}>Sign In</button>
                        </div>
                    )}

                </div>
            </div>

            <Login show={isOpenLogin} onClose={showLogin} onLogin={handleSignIn} />
        </>
    )
}

const NavLinks = (props) => {
    return (
        <Link to={props.url} onClick={props.onclick} className='nav-link'>
            {props.name}
        </Link>
    );
};