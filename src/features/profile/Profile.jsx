import React from 'react'
import { Header } from '../../core/header/Header'
import './Profile.css';

export const Profile = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className='user-wrapper'>
        <div className="user-header">
          <div className='user-card'>
            <img src="/images/avatar.jpg" />
            <div class="user-data">
              <h3>Hugo Castrillon</h3>
              <p>System Engineer</p>
              <p>#541984 0 followers 0 following</p>
            </div>
          </div>
          <div class="edit-option">
            <button>Edit my profile</button>
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
