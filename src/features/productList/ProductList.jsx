import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProductCard } from '../productCard/ProductCard';
import Loading from '../../core/loading/loading';
import './ProductList.css';

export const ProductList = ({ filterTopics = [], followings = [], searchQuery = '', onAverageVotes = () => { } }) => {
  const { productData, productLoading } = useAuth();

  const filteredProducts = productData?.filter(product => {
    const matchesTopics = filterTopics?.length === 0 || product.topics?.some(topic => filterTopics.includes(topic));
    const matchesFollowings = followings?.length === 0 || followings?.includes(product.userId);
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopics && matchesFollowings && matchesSearch;
  });

  useEffect(() => {
    if (filteredProducts && filteredProducts.length > 0 && onAverageVotes) {
      const totalVotes = filteredProducts.reduce((acc, product) => acc + product.votes.length, 0);
      const averageVotes = (totalVotes / filteredProducts.length).toFixed(2);
      onAverageVotes(averageVotes);
    }
  }, [filteredProducts, onAverageVotes]);

  return (
    <div className="product-list">
      {productLoading ? (
        <Loading />
      ) : (
        filteredProducts && filteredProducts
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((product, index) => (
            <ProductCard key={index} productKey={index} data={product} />
          ))
      )}
      {!filteredProducts.length && (productLoading || productData?.length) ? (
        <p>Not data found.</p>
      ) : null}
    </div>
  );
}

