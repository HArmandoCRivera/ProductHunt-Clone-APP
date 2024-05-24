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

  useEffect(() => {
    const docRef = doc(db, "users", id);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.data()) {
        console.log({ validateUser: snapshot.data().userId === id });
        console.log({ validateParamId: id });
        console.log({ validateUserId: snapshot.data().userId });
        setProfile(snapshot.data());
        setOpenFollows(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const toggleFollows = () => {
    setOpenFollows(!isOpenFollows);
  };

  const handleFollow = () => {
    if (userData && profile?.followers?.includes(userData?.uid)) {
      unFollowUser();
    } else if (userData && !profile?.followers?.includes(userData?.uid)) {
      followUser();
    }
  };

  const followUser = () => {
    updateDoc(doc(db, "users", id), {
      followers: arrayUnion(userData?.uid)
    }).catch((e) => {
      console.log(e);
    });
    updateDoc(doc(db, "users", userData.uid), {
      follows: arrayUnion(id),
    }).catch((e) => {
      console.log(e);
    });
  }

  const unFollowUser = () => {
    updateDoc(doc(db, "users", id), {
      followers: arrayRemove(userData?.uid),
    }).catch((e) => {
      console.log(e);
    });
    updateDoc(doc(db, "users", userData.uid), {
      follows: arrayRemove(id)
    }).catch((e) => {
      console.log(e);
    });
  }

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
                <div>
                  <div onClick={() => { setOpenFollows(true); }} className="follows-modal-open">
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
                <Link to="/edit"><button>Edit my profile</button></Link>
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
