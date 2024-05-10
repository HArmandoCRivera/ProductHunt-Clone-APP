import React, { useEffect } from 'react'
import { auth } from '../../firebaseConfig';
import { getRedirectResult } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { ProductCard } from '../productCard/ProductCard';
import './ProductList.css';
import Loading from '../../core/loading/loading';

export const ProductList = () => {
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
    <div className="product-list">
      {productLoading ? (<Loading />) : (productData && productData?.sort((a, b) => b.votes.length - a.votes.length).map((product, index) => (
        <ProductCard key={index} productKey={index} data={product} />
      )))}
    </div>
  )
}

