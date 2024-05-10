import React from 'react'
import { Header } from '../../core/header/Header'
import './ProductPage.css';
import { ProductList } from '../productList/ProductList';

export const ProductPage = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className='landing'>
        <div className="home-wrapper">
          <div className="welcome-banner">
            <h1>The best products in 2024</h1>
            <p>Tried, tested, and reviewed by the community</p>
          </div>

          <div className="top-products">
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
};