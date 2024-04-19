import React from 'react'
import './Modal.css';


export const Modal = (props) => {
    const onClose = e => {
        props.onClose && props.onClose(e);
        e.preventDefault();
    };

    const onLogin = e => {
        props.onClose && props.onLogin(e);
    };

    return (
        <>
            {(!props.show) ? "" :
                (<>
                    <div className="modal-wrapper">
                        <div className="modal-backdrop" onClick={onClose}></div>
                        <div className="modal-content">
                            <img
                                src="/images/kitty.png"
                                className="kitty"
                                alt="kitty"
                            />
                            <h3 className='title'>Sign up on Product Hunt</h3>
                            <p className='description'>Join our community of friendly folks discovering and sharing the latest products in tech.</p>
                            <button className='google-login' onClick={onLogin}>Sign in with Google</button>
                            <p className='caption'>We'll never post to any of your accounts without your permission.</p>
                        </div>
                    </div>
                </>
                )}
        </>
    )
}