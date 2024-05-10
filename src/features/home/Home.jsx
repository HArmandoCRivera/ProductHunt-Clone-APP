import React, { useEffect, useState } from 'react'
import './Home.css';
import { FaRegComment } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { Header } from '../../core/header/Header'
import { auth } from '../../firebaseConfig';
import { getRedirectResult } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

export const Home = () => {
  const { dispatchLogin } = useAuth();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProductsData(data.products)
      })
      .catch(error => console.error('Error loading the products data:', error));
  }, []);

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
              {productsData.map((product, index) => (
                <ProductCard key={index} productKey={index} data={product} />
              ))}
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

export const ProductCard = (props) => {

  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('/product/' + props.productKey);
  }

  return (
    <div key={props.productKey} className="card-wrapper">
      <div className='product-data' onClick={() => goToProduct()}>
        <img src={`https://picsum.photos/48/48?random=${Math.random()}`} alt={props.data.name} className="product-img" />
        <div className="card-content">
          <div className="product-header">
            <span className="product-name">{props.data.name}</span>
            <span className="divider"> — </span>
            <span className="product-slogan">{props.data.description}</span>
          </div>
          <div className="product-desc">
            <span className="comments-count"><FaRegComment className="comment-icon" /> {props.data.comments}</span>•
            {props.data.categories.map((category, index) => (
              <span key={index}><span className="product-tag">{category}</span>•</span>
            ))}
          </div>
        </div>
      </div>
      <button className='vote-action'> <BiSolidUpArrow /><div className='total-votes'>{props.data.votes}</div></button>
    </div>
  )
}