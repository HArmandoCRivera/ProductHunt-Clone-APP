import React, { useState, useEffect } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { db } from "../../firebaseConfig";
import Loading from '../../core/loading/loading';
import './Profile.css';

export const FollowCard = (props) => {
    const [profile, setProfile] = useState(null);
    const userRef = doc(db, "users", props.userId);

    useEffect(() => {
        onSnapshot(userRef, (snapshot) => {
            if (snapshot.data()) {
                setProfile(snapshot.data());
            }
        });
    }, [userRef]);

    return (
        <div>
            {!profile ? (<Loading />) : (profile &&
                <div className='user-wrapper'>
                    <div className="user-header">
                        <div className='user-card'>
                            <img src={profile.photoURL ?? "/images/avatar.jpg"} alt="avatar" />
                            <div className="user-data">
                                <h3>{profile.displayName}</h3>
                            </div>
                        </div>
                        <div className="edit-option">
                            <Link to={"/profile/" + profile.userId}><button>Visit profile</button></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
