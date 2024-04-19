import React, { useState } from 'react'
import { TfiSearch } from "react-icons/tfi";
import { BsBell } from "react-icons/bs";
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../modal/Modal';
import { DropDownMenu } from '../dropdown/DropdownMenu'
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Link } from 'react-router-dom'

export const Header = (props) => {
    const { isLoggedIn, login } = useAuth();
    const [isOpenLogin, setOpenLogin] = useState(false);

    const handleSignIn = () => {
        login();
        setDropdownVisible(false);
        setOpenLogin(false);
    }
    const showLogin = e => {
        setOpenLogin(!isOpenLogin);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleUserMenu = () => {
      setDropdownVisible(!isDropdownVisible);
    };
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
                        />
                    </div>
                </div>
                <div className="nav-user-flex">
                    <div className="nav-links-sec">
                        <NavLinks url="##" name="Launches" />
                        <NavLinks url="##" name="Products" />
                        <NavLinks url="##" name="News" />
                        <NavLinks url="##" name="Community" />
                        <NavLinks url="##" name="Advertise" />
                    </div>
                    {isLoggedIn ? (
                        <div className="user-login-display">
                            <button className="call-action">Submit</button>
                            <BsBell className="notification-icon" />
                            <div className='user-menu'>
                                <img
                                    src="/images/avatar.jpg"
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

            <Modal show={isOpenLogin} onClose={showLogin} onLogin={handleSignIn} />
        </>
    )
}

const NavLinks = (props) => {
    return (
        <a href={props.url} onClick={props.onclick} className='nav-link'>
            {props.name}
        </a>
    );
};