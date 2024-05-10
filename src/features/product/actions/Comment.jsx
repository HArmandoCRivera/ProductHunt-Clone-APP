import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import useSingleFetch from '../../../core/hooks/useSingleFetch';
import { useAuth } from '../../../context/AuthContext';
import { db } from "../../../firebaseConfig";
import Loading from "../../../core/loading/loading"

const Comment = ({ postId }) => {
    const { userData } = useAuth();
    const [comment, setComment] = useState("");
    const { data, loading } = useSingleFetch("products", postId, "comments");

    const writeComment = async () => {
        if (!comment.trim()) {
            console.warn("El comentario no puede estar vacío.");
            return;
        }
        if (!userData || !userData.uid) {
            console.warn("No se puede añadir el comentario. Usuario no autenticado.");
            return;
        }
        try {
            const commentsRef = collection(db, "products", postId, "comments");

            await addDoc(commentsRef, {
                commentText: comment,
                created: Date.now(),
                userId: userData.uid
            });
            console.success("Comment has been added");
            setComment("");
        } catch (error) {
            console.error(error.message);
        }
    };

    console.log({ commentdata: data });
    return (
        <>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full outline-none resize-none text-sm border px-2 pt-4" required></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
                <button onClick={() => setComment("")} className="text-sm">
                    Cancel
                </button>
                <button
                    onClick={writeComment}
                    className="btn !text-xs !bg-green-700 !text-white !rounded-full">
                    Response
                </button>
            </div>

            {data && data.length === 0 ? (
                <p>This post has no comments</p>
            ) : (
                <div className="border-t py-4 mt-8 flex flex-col gap-8">
                    {data &&
                        data.map((item, i) =>
                            loading ? (
                                <Loading />
                            ) : (
                                <>Si hay comentarios</>
                                // <Comment item={item} postId={postId} key={i} />
                            )
                        )}
                </div>
            )}
        </>
    );
};

export default Comment;
