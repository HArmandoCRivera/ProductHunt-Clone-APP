import React, { useState, useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../core/header/Header'
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import './EditProfile.css';

export const EditProfile = () => {
  const { userData, dispatchLogin } = useAuth();
  const [name, setName] = useState(userData.displayName || '');
  const [previewPhoto, setPreviewPhoto] = useState(userData.photoURL || '');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      let url;
      console.log({photo })
      if (photo) {
        const storageRef = ref(storage, `avatars/${userData.uid}/${photo.name}`);
        await uploadBytes(storageRef, photo);
        url = await getDownloadURL(storageRef);
        console.log("Thumb uploaded: ", url);
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: url ?? userData.photoURL
      });

      await updateDoc(doc(db, "users", userData.uid), {
        displayName: name,
        photoURL: url ?? userData.photoURL
      }).catch((e) => {
        console.log(e);
      });

      await dispatchLogin({
        ...userData,
        displayName: name,
        photoURL: url ?? userData.photoURL
      });

      navigate('/profile/' + userData?.uid);
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
      setPhoto(file);
      console.log({ photo });
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