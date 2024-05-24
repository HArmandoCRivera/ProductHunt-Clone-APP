import React, { useState, useEffect } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Loading from '../../core/loading/loading';
import { Link } from 'react-router-dom';
import './FollowCard.css';

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
                <Link to={'/profile/' + profile.userId} className='link-tofollow'>
                    <div className='follow-card-wrapper'>
                        <div className="follow-card-header">
                            <div className='follow-card-card'>
                                <img src={profile.photoURL ?? "/images/avatar.jpg"} alt="avatar" />
                                <div className="follow-card-data">{profile.displayName}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}
