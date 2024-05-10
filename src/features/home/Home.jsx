import React from 'react'
import { Header } from '../../core/header/Header'
import './Home.css';
import { ProductList } from '../productList/ProductList';
export const Home = () => {


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
            <ProductList />
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

