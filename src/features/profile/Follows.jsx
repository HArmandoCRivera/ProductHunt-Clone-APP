import React from 'react'
import { FollowCard } from './FollowCard';
import './Follows.css';

export const Follows = (props) => {
    const onClose = e => {
        props.onClose && props.onClose(e);
        e.preventDefault();
    };

    return (
        <>
            {(!props.show) ? "" :
                (<>
                    <div className="modal-wrapper">
                        <div className="modal-backdrop" onClick={onClose}></div>
                        <div className="modal-content">
                            <div className='follows-wrapper'>
                                <div className="followers">
                                    <h4>Followers</h4>
                                    {props.followers?.map((followUserId, index) => (
                                        <div className="" key={index}>
                                            <FollowCard userId={followUserId} />
                                        </div>
                                    ))}
                                    {!props.followers?.length ? (<span>No data.</span>) : null}
                                </div>
                                <div className="followers">
                                    <h4>Followings</h4>
                                    {props.following && props.following?.map((followUserId, index) => (
                                        <div className="" key={index}>
                                            <FollowCard userId={followUserId} />
                                        </div>
                                    ))}
                                    {!props.following?.length ? (<span>No data.</span>) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )}
        </>
    )
}