import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { ProductCard } from '../productCard/ProductCard';
import Loading from '../../core/loading/loading';
import './ProductList.css';

export const ProductList = () => {
  const { productData, productLoading } = useAuth();

  return (
    <div className="product-list">
      {productLoading ? (<Loading />) : (productData && productData?.sort((a, b) => b.votes.length - a.votes.length).map((product, index) => (
        <ProductCard key={index} productKey={index} data={product} />
      )))}
    </div>
  )
}

