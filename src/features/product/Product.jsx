import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { Header } from '../../core/header/Header'
import './Product.css';

export const Product = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(data => {
                const foundProduct = data.products[parseInt(id)];
                setProduct(foundProduct);
            })
            .catch(err => console.log(err));
    }, [id]);

    const vote = () => {
        if (!voted) {
            const totalVotes = product.votes + 1;
            setProduct({ ...product, votes: totalVotes });
            setVoted(true);
        }
    }

    return (
        <div>
            <header>
                <Header />
            </header>
            {(product) ? (
                <div className='product-wrapper'>
                    <div className="logo-rank">
                        <img src={`https://picsum.photos/48/48?random=${Math.random()}`} alt={product.name} className="product-img" />
                        <div className='rank'>#<span className='number'>{parseInt(id) + 1}</span></div>
                    </div>
                    <div className="data-actions">
                        <div className="product-data">
                            <h2>{product.name}</h2>
                            <div>{product.description}</div>
                        </div>

                        <div className="product-actions">
                            <button className='visit-action'>Visit <IoIosArrowDown /></button>
                            <button className='vote-action' onClick={() => vote()}><BiSolidUpArrow /> UPVOTE {product.votes}</button>
                        </div>
                    </div>

                    <div className='description'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, cum rerum? Nihil fugit fuga iure cupiditate, voluptas dicta suscipit inventore illum obcaecati id rerum incidunt at dolore architecto repellat repellendus.
                    </div>

                    <div className='categories'>
                        Launched in
                        {product.categories.map((category, index) => (
                            <span className="product-tag">{category}</span>
                        ))}
                    </div>
                </div>) : (<div className="loading">Loading...</div>)}
        </div>
    )
}

