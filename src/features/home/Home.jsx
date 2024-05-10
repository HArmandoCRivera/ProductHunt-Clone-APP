import React, { useEffect } from 'react'
import { Header } from '../../core/header/Header'
import { auth } from '../../firebaseConfig';
import { getRedirectResult } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { ProductCard } from '../productCard/ProductCard';
import './Home.css';
import Loading from '../../core/loading/loading';

export const Home = () => {
  const { dispatchLogin, productData, productLoading } = useAuth();

  useEffect(() => {
    getRedirectResult(auth)
      .then(function (result) {
        console.log(result);
        if (result?.user) {
          dispatchLogin(result.user);
        }
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, [dispatchLogin]);

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
            <h2>Top Products Launching Today</h2>
            <hr />
            <div className="product-list">
              {productLoading ? (<Loading />) : (productData && productData?.map((product, index) => (
                <ProductCard key={index} productKey={index} data={product} />
              )))}
            </div>
          </div>
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

