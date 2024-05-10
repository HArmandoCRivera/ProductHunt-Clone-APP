import React, { useState, useRef } from 'react';
import { collection, addDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../core/header/Header';
import { useNavigate } from "react-router-dom";
import './ProductNew.css';

export const ProductNew = (props) => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const initialForm = {
        title: "",
        tagline: "",
        topics: "",
        link: "",
        thumb: "",
        price: "",
        desc: ""
    };
    const [preview, setPreview] = useState(initialForm);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const collections = collection(db, "products");

            let url;
            if (imageUrl) {
                const storageRef = ref(storage, `image/${preview.thumb.name}`);
                await uploadBytes(storageRef, preview?.thumb);
                url = await getDownloadURL(storageRef);
                console.log("Thumb uploaded: ", url);
            }

            const docRef = await addDoc(collections, {
                userId: userData?.uid,
                title: preview.title,
                desc: preview.desc,
                topics: preview.topics,
                productImg: url || "",
                created: Date.now()
            });
            console.log("Document written with ID: ", docRef.id);

            navigate("/");
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <div className='product-wrapper'>
                <h1>👋 Tell us more about this product!</h1>

                <div className="product-form-card">
                    <label>Name of the product <span className="hint">- Required</span>
                        <input type="text" name="title" placeholder="Simply the name of the product" max="60" required value={preview.title}
                            onChange={(e) =>
                                setPreview({ ...preview, title: e.target.value })
                            } />
                    </label>

                    <label>Tagline <span className="hint">- Required</span>
                        <input type="text" name="tagline" placeholder="Concise and descriptive tagline for the product" required value={preview.tagline}
                            onChange={(e) =>
                                setPreview({ ...preview, tagline: e.target.value })
                            } />
                    </label>

                    <label>Topics
                        <input type="text" name="topics" placeholder="Add a topic" value={preview.topics}
                            onChange={(e) =>
                                setPreview({ ...preview, topics: e.target.value })
                            } />
                    </label>

                    <label>Download link <span className="hint">- App Store, Google Play...</span>
                        <input type="text" name="link" placeholder="https://" max="60" required value={preview.link}
                            onChange={(e) =>
                                setPreview({ ...preview, link: e.target.value })
                            } />
                    </label>

                    <label>Thumbnail <span className="hint">- Required</span>
                        <input type="file" name="thumb" required onChange={(e) => {
                            setImageUrl(URL.createObjectURL(e.target.files[0]));
                            setPreview({ ...preview, thumb: e.target.files[0] });
                        }}
                            ref={imageRef} />
                    </label>

                    <div className='pricing'>This product is...
                        <div className="group-price">
                            <label> <input type="radio" name="price" value="Free" /> Free</label>
                            <label> <input type="radio" name="price" value="Free" /> Paid</label>
                            <label> <input type="radio" name="price" value="Free" /> Paid (with a free trial or plan)</label>
                        </div>
                    </div>

                    <label>Description <span className="hint">- Required</span>
                        <textarea name="desc" rows={4} placeholder='Short description of the product' required value={preview.desc}
                            onChange={(e) =>
                                setPreview({ ...preview, desc: e.target.value })
                            }></textarea>
                    </label>

                    <div className="actions">
                        <button className="new-post" onClick={handleSubmit}>
                            {loading ? "Submitting..." : "Launch now"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

