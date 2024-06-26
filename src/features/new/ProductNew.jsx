import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
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
    const [topicsList, setTopicsList] = useState([]);
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

    useEffect(() => {
        const fetchTopics = async () => {
            const topicsSnapshot = await getDocs(collection(db, "topics"));
            const topics = topicsSnapshot.docs.map(doc => doc.data().name);
            setTopicsList(topics);
        };

        fetchTopics();
    }, []);

    const validateForm = () => {
        const requiredFields = [preview.title, preview.tagline, preview.link, imageUrl, preview.desc, preview.topics];
        if (requiredFields.some(field => !field)) {
            alert("Please fill out all required fields.");
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
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
                tagline: preview.tagline,
                desc: preview.desc,
                link: preview.link,
                topics: preview.topics,
                productImg: url || "",
                votes: [],
                comments: [],
                created: Date.now()
            });
            console.log("Document written with ID: ", docRef.id);

            navigate("/product/" + docRef.id);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTopicChange = (e) => {
        const selectedTopic = e.target.value;
        if (selectedTopic && !preview.topics.includes(selectedTopic)) {
            setPreview({ ...preview, topics: [...preview.topics, selectedTopic] });
        }
    };

    const removeTopic = (index) => {
        const newTopics = preview.topics.filter((_, i) => i !== index);
        setPreview({ ...preview, topics: newTopics });
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
                        <div className="topics-input-container">
                            <div className="topics-input">
                                {preview.topics && preview.topics.map((topic, index) => (
                                    <div key={index} className="topic-chip">
                                        {topic}
                                        <div className="remove-topic" type="button" onClick={(e) => { e.stopPropagation(); removeTopic(index); }}>x</div>
                                    </div>
                                ))}
                                <select onChange={handleTopicChange} value="">
                                    <option value="" disabled>Select a topic</option>
                                    {topicsList.filter(topic => !preview.topics.includes(topic)).map((topic, index) => (
                                        <option key={index} value={topic}>{topic}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
                </div >
            </div >
        </>
    )
}

