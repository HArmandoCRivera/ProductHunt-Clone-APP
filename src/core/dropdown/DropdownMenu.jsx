import React from 'react';
import './DropdownMenu.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const DropDownMenu = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login, logout, userData } = useAuth();

    const navigateProfile = () => {
        navigate('/profile/' + userData?.uid);
    }
    const handleLogout = () => {
        logout()
        navigate('/');
    }

    return (
        <div className="dropdown-menu">
            <ul>
                <li key='profile' onClick={() => navigateProfile()}>Profile</li>
                <hr />
                <li key='logout' onClick={() => handleLogout()}>Logout</li>
            </ul>
        </div>
    );
};