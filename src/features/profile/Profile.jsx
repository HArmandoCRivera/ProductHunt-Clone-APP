import React from 'react'
import { Header } from '../../core/header/Header'
import './Profile.css';
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export const Profile = () => {
  const { userData } = useAuth();
  

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className='user-wrapper'>
        <div className="user-header">
          <div className='user-card'>
            <img src={userData.photoURL ?? "/images/avatar.jpg"} alt="avatar" />
            <div className="user-data">
              <h3>{userData.displayName}</h3>
              <p>{userData.email}</p>
              <p>#541984 0 followers 0 following</p>
            </div>
          </div>
          <div className="edit-option">
            <Link to="edit"><button>Edit my profile</button></Link>
          </div>
        </div>


        <div className='chip-menu'>
          <div className='chip-item'>About</div>
          <div className='chip-item'>Activity</div>
          <div className='chip-item'>Upvotes</div>
          <div className='chip-item'>Collections</div>
          <div className='chip-item'>Stacks</div>
          <div className='chip-item'>Reviews</div>
        </div>

        <div className='about-user'>
          <div className='title-section'>ABOUT</div>
          <div className='info'>Add a bio to help people get a better idea of you, your skills, history, and talents.</div>
        </div>
      </div>
    </div>
  )
}
