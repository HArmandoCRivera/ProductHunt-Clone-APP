import React from 'react';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { Header } from '../../core/header/Header'
import useSingleFetch from '../../core/hooks/useSingleFetch';
import Loading from '../../core/loading/loading';
import './Product.css';
import Comment from './actions/Comment';

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
                        <div className='rank'>#<span className='number'>{parseInt(id) + 1}</span></div>
                    </div>
                    <div className="data-actions">
                        <div className="product-data">
                            <h2>{product?.title}</h2>
                            <div>{product?.tagline}</div>
                        </div>

                        <div className="product-actions">
                            <a href={product?.link} target="_blank" rel="noreferrer"><button className='visit-action'>Visit <IoIosArrowDown /></button></a>
                            <button className='vote-action' onClick={() => { }}><BiSolidUpArrow /> UPVOTE {product?.votes}</button>
                        </div>
                    </div>

                    <div className='description'>
                        {product?.desc}
                    </div>

                    <div className='categories'>
                        Launched in
                        {!Array.isArray(product.topics) ? (<span className="product-tag">Nothing</span>) : product.topics?.map((category, index) => (
                            <span className="product-tag">{category}</span>
                        ))}
                    </div>

                    <Comment postId={id} />
                </div>
            )}
        </div>
    )
}

