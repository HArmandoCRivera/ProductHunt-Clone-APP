import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { useAuth } from '../../../context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Vote = ({ id, votes }) => {
  const { isLoggedIn, userData } = useAuth();
  const votesRef = doc(db, "products", id);

  const handleVote = () => {
    if (isLoggedIn && votes?.includes(userData?.uid)) {
      updateDoc(votesRef, {
        votes: arrayRemove(userData?.uid),
      }).catch((e) => {
        console.log(e);
      });
    }
    else if(isLoggedIn) {
      updateDoc(votesRef, {
        votes: arrayUnion(userData?.uid)
      }).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <button className={`vote-action ${votes?.includes(userData?.uid) ? 'vote-action-active' : ''}`} onClick={handleVote}>
      <BiSolidUpArrow className={`${votes?.includes(userData?.uid) ? 'arrow-action-active' : ''}`} /><div className='total-votes'>{votes.length ?? 0}</div>
    </button>
  );
};

export default Vote;
