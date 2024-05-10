import React, { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuth } from '../../../context/AuthContext';
import { MdDelete } from "react-icons/md";
import { db } from "../../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import './Comment.css';

const Comment = ({ postId }) => {
    const { userData } = useAuth();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const commentRef = doc(db, "products", postId);

    useEffect(() => {
        const docRef = doc(db, "products", postId);
        onSnapshot(docRef, (snapshot) => {
            setComments(snapshot.data().comments);
        });
    }, []);

    const handleChangeComment = () => {
        updateDoc(commentRef, {
            comments: arrayUnion({
                user: userData.uid,
                userName: userData.displayName,
                comment: comment,
                createdAt: new Date(),
                commentId: uuidv4(),
            }),
        }).then(() => {
            setComment("");
        });
    };

    const handleDeleteComment = (comment) => {
        console.log(comment);
        updateDoc(commentRef, {
            comments: arrayRemove(comment),
        })
            .then((e) => {
                console.log(e);
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <>
            {comments !== null &&
                comments.map(({ commentId, user, comment, userName, createdAt }, index) => (
                    <div key={index} className="comment-wrap">
                        <div className="unique-comment">
                            <div className={`badge ${user === userData.uid ? "bg-success" : "bg-primary"}`} >
                                {userName}
                            </div>
                            <div className="comment-content">
                                {comment}
                            </div>
                        </div>
                        <div className="delete-comment">
                            {user === userData.uid && (
                                <MdDelete className="delete-icon"
                                    onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                                />
                            )}
                        </div>
                    </div>
                ))}
            {(comments == null || !comments.length) && (<div className="no-content">Sin comentarios</div>)}
            <hr />
            {userData && (
                <div className="comment-box">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What do you thing?"
                        className="comment-input" required></textarea>
                    <div className="comment-actions">
                        <button
                            onClick={handleChangeComment}
                            className="comment-response">
                            Comment
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Comment;
