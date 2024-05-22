import React, { useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { useAuth } from '../../../context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Vote = ({ id, votes }) => {
  const { userData } = useAuth();
  const [voted, setVoted] = useState(votes?.includes(userData?.uid));
  const votesRef = doc(db, "products", id);

  const handleVote = () => {
    if (userData && voted) {
      updateDoc(votesRef, {
        votes: arrayRemove(userData?.uid),
      }).then(() => {
        setVoted(false);
      }).catch((e) => {
        console.log(e);
      });
    }
    else {
      updateDoc(votesRef, {
        votes: arrayUnion(userData?.uid)
      }).then(() => {
        setVoted(true);
      }).catch((e) => {
        console.log(e);
      });
    }
  };

  const getVotes = () => {
    if (votes?.includes(userData?.uid) && !voted) {
      return votes.length - 1;
    } else if (!votes?.includes(userData?.uid) && voted) {
      return votes.length + 1;
    } else {
      return votes.length;
    }
  }

  return (
    <button className={`vote-action ${voted ? 'vote-action-active' : ''}`} onClick={handleVote}>
      <BiSolidUpArrow /> {voted ? 'UPVOTED' : 'UPVOTE'} {getVotes()}
    </button>
  );
};

export default Vote;
