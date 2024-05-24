import React, { useState, useEffect } from 'react';
import { Header } from '../../core/header/Header'
import './Home.css';
import { ProductList } from '../productList/ProductList';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from '../../context/AuthContext';

export const Home = () => {
  const { userData, isLoggedIn } = useAuth();
  const [followings, setFollowings] = useState([]);
  const [averageVotes, setAverageVotes] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      const docRef = doc(db, "users", userData.uid);

      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setFollowings(snapshot.data().follows || []);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userData, isLoggedIn]);

  const handleAverageVotes = (average) => {
    setAverageVotes(average)
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className='landing'>
        <div className="home-wrapper">
          <div className="welcome-banner">
            <h2>Welcome to Product Hunt! 👋</h2>
            <p>The place to launch and discover new tech products.</p>
          </div>

          <div className="top-products">
            <div className='top-header'>
              <h2>Top Products Launching Today</h2>
              <div className="prom"><b>Average:</b> {averageVotes}</div>
            </div>
            <hr />
            <ProductList onAverageVotes={handleAverageVotes} />
          </div>
          <br />
          {followings && followings.length ? (
            <div className="promoted-products">
              <h3>Followed Products</h3>
              <hr />
              <ProductList followings={followings} />
            </div>
          ) : null}
        </div>

        <div className='extra-info'>
          <span className='quick-link'>Blog • Newsletter • Questions • Categories •
            Apps • About • FAQ • Terms • Privacy and Cookies • Twitter • Facebook •
            Instagram • LinkedIn • YouTube • Advertise</span>
          <div className='brand-register'>© 2024 PRODUCT HUNT</div>
        </div>
      </div >
    </div >
  )
}

