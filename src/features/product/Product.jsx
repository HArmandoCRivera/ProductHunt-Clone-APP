import React from 'react';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { Header } from '../../core/header/Header'
import useSingleFetch from '../../core/hooks/useSingleFetch';
import Loading from '../../core/loading/loading';
import './Product.css';
import Comment from './actions/Comment';
import Vote from './actions/Vote';

export const Product = (props) => {
    const { id } = useParams();
    const { data: product, loading } = useSingleFetch("products", id);

    return (
        <div>
            <header>
                <Header />
            </header>
            {(loading) ? (<Loading />) : (
                <div className='product-wrapper'>
                    <div className="logo-rank">
                        <img src={product?.productImg} alt={product?.title} className="product-img" />
                        <div className='rank'>#<span className='number'>{parseInt(product?.votes.length) + 1}</span></div>
                    </div>
                    <div className="data-actions">
                        <div className="product-data">
                            <h2>{product?.title}</h2>
                            <div>{product?.tagline}</div>
                        </div>

                        <div className="product-actions">
                            <a href={product?.link} target="_blank" rel="noreferrer"><button className='visit-action'>Visit <IoIosArrowDown /></button></a>
                            <Vote id={id} votes={product?.votes} />
                        </div>
                    </div>

                    <div className='description'>
                        {product?.desc}
                    </div>

                    <div className='categories'>
                        Launched in
                        {!Array.isArray(product.topics) ? (<span className="product-tag">Nothing</span>) : product.topics?.map((category, index) => (
                            <span key={index} className="product-tag">{category}</span>
                        ))}
                    </div>

                    <br /><hr />
                    <Comment postId={id} />
                </div>
            )}
        </div>
    )
}

