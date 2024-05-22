import React, { useState, useEffect } from 'react'
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { Header } from '../../core/header/Header'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { Follows } from './Follows';
import { db } from "../../firebaseConfig";
import Loading from '../../core/loading/loading';
import './Profile.css';

export const Profile = () => {
  const { id } = useParams();
  const { userData } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isOpenFollows, setOpenFollows] = useState(false);

  const userRef = doc(db, "users", id);

  const toggleFollows = e => {
    setOpenFollows(!isOpenFollows);
  };

  useEffect(() => {
    const docRef = doc(db, "users", id);
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.data()) {
        setProfile(snapshot.data());
      }
    });
  }, [id]);

  const handleFollow = () => {
    if (userData && profile?.followers?.includes(userData?.uid)) {
      updateDoc(userRef, {
        followers: arrayRemove(userData?.uid),
      }).catch((e) => {
        console.log(e);
      });
      updateDoc(doc(db, "users", userData.uid), {
        follows: arrayRemove(userData?.uid)
      }).catch((e) => {
        console.log(e);
      });
    }
    else {
      updateDoc(userRef, {
        followers: arrayUnion(userData?.uid)
      }).catch((e) => {
        console.log(e);
      });
      updateDoc(doc(db, "users", userData.uid), {
        follows: arrayUnion(userData?.uid),
      }).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      {!profile ? (<Loading />) : (profile &&
        <div className='user-wrapper'>
          <div className="user-header">
            <div className='user-card'>
              <img src={profile.photoURL ?? "/images/avatar.jpg"} alt="avatar" />
              <div className="user-data">
                <h3>{profile.displayName}</h3>
                <p>{profile.email}</p>
                <div>#541984
                  <div onClick={() => { setOpenFollows(true); console.log({ profile }) }} className="follows-modal-open">
                    {profile.followers.length} followers {profile.follows?.length} following
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-option">
              {(userData.uid !== id) ? (
                <button onClick={handleFollow}
                  className={profile?.followers?.includes(userData?.uid) ? '' : 'active'}>
                  {profile?.followers?.includes(userData?.uid) ? 'Unfollow' : 'Follow'}
                </button>) : (
                <Link to="/profile/edit"><button>Edit my profile</button></Link>
              )}
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
          <Follows show={isOpenFollows} onClose={toggleFollows} followers={profile.followers} following={profile.follows} />
        </div>
      )
      }
    </div >
  )
}
