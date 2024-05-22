import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Header } from '../../core/header/Header'
import useSingleFetch from '../../core/hooks/useSingleFetch';
import Loading from '../../core/loading/loading';
import './Product.css';
import Comment from './actions/Comment';
import Vote from './actions/Vote';
import { db } from "../../firebaseConfig";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Product = (props) => {
    const { id } = useParams();
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { data: product, loading, rank } = useSingleFetch("products", id);

    const productRef = doc(db, "products", id);

    const handleDeleteProduct = (product) => {
        const confirmation = window.confirm("Are you sure to delete this product?");
        if (product.userId === userData?.uid && confirmation) {
            deleteDoc(productRef)
                .then((e) => {
                    navigate('/');
                    console.log(e);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };

    return (
        <div>
            <header>
                <Header />
            </header>
            {(loading) ? (<Loading />) : (
                <div className='product-wrapper'>
                    <div className="logo-rank">
                        <img src={product?.productImg} alt={product?.title} className="product-img" />
                        <div className='rank'>#<span className='number'>{rank}</span></div>
                    </div>
                    <div className="data-actions">
                        <div className="product-data">
                            <h2>{product?.title}</h2>
                            <div>{product?.tagline}</div>
                        </div>

                        <div className="product-actions">
                            <a href={product?.link} target="_blank" rel="noreferrer" className='visit-link'><button className='visit-action'>Visit <FaExternalLinkAlt /></button></a>
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

                    {(product.userId === userData?.uid) ? (
                        <div className='delete-action'>
                            <button onClick={() => handleDeleteProduct(product)}>
                                <MdDeleteForever />
                                <span>Borrar producto</span>
                            </button>
                        </div>
                    ) : ''}

                    <hr />
                    <Comment postId={id} />
                </div>
            )}
        </div>
    )
}

