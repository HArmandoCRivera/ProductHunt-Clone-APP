import React, { useState, useContext, useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../core/header/Header'
import { useNavigate } from "react-router-dom";
import './EditProfile.css';

export const EditProfile = () => {
  const { userData, dispatchLogin } = useAuth();
  const [name, setName] = useState(userData.displayName || '');
  const [photo, setPhoto] = useState(userData.photoURL || '');
  const [previewPhoto, setPreviewPhoto] = useState(userData.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });

      dispatchLogin({
        ...userData,
        displayName: name,
        photoURL: photo
      });

      navigate("/profile");
    } catch (error) {
      setError(error.message);
      console.error('Error al actualizar el perfil:', error);
    }

    setLoading(false);
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPhoto(imageUrl);
      setPhoto(imageUrl);
    }
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <h2>My details</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='formfield-photo'>
          <img
            src={previewPhoto || "/images/avatar.jpg"}
            className="user-avatar"
            alt="user-avatar"
          />
          <div className="upload">
            <label>Upload new avatar</label>
            <input type="file" name="thumb" required onChange={handleChangePhoto} ref={imageRef} />
            <div className="hint">Recommended size: 400x400px</div>
          </div>
        </div>
        <div className='formfield-name'>
          <label>Display name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button onClick={handleSave} disabled={loading} className='save-button'>
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </main>
    </div>
  );
};