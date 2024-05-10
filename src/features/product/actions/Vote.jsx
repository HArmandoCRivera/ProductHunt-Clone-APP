import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Blog } from "../../../../Context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";
import { formatNum } from "../../../../utils/helper";

const Vote = ({ postId }) => {
  const [isVoted, setIsVoted] = useState(false);
  const { currentUser, setAuthModel } = Blog();

  const { data } = useSingleFetch("posts", postId, "votes");

  useEffect(() => {
    setIsVoted(
      data && data.findIndex((item) => item.id === currentUser?.uid) !== -1
    );
  }, [data]);

  const handleVote = async () => {
    try {
      if (currentUser) {
        const voteRef = doc(db, "posts", postId, "votes", currentUser?.uid);
        if (isVoted) {
          await deleteDoc(voteRef);
        } else {
          await setDoc(voteRef, {
            userId: currentUser?.uid,
          });
        }
      } else {
        setAuthModel(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button onClick={handleVote} className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone
        className={`text-xl ${isVoted ? "text-black" : "text-gray-500"}`}
      />
      <span>{formatNum(data?.length)}</span>
    </button>
  );
};

export default Vote;
