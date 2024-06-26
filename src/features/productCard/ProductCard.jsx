import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import Vote from './actions/Vote';

export const ProductCard = (props) => {

    const navigate = useNavigate();

    const goToProduct = (id) => {
        navigate('/product/' + id);
    }

    return (
        <div key={props?.productKey ?? 0} className="card-wrapper">
            <div className='product-data' onClick={() => goToProduct(props?.data?.id)}>
                <img src={props?.data?.productImg ?? ''} alt={props?.data?.title ?? ''} className="product-img" />
                <div className="card-content">
                    <div className="product-header">
                        <span className="product-name">{props?.data?.title ?? ''}</span>
                        <span className="divider"> — </span>
                        <span className="product-slogan">{props?.data?.tagline ?? ''}</span>
                    </div>
                    <div className="product-desc">
                        <span className="comments-count"><FaRegComment className="comment-icon" /> {props?.data?.comments?.length ?? 0}</span>
                        {!Array.isArray(props.data.topics) ? (<span className="product-tag">Nothing</span>) : (props.data.topics.map((category, index) => (
                            <span key={index}>•<span className="product-tag">{category}</span></span>
                        )))}
                    </div>
                </div>
            </div>
            <Vote votes={props.data.votes} id={props.data.id} />
        </div>
    )
}