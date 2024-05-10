import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const useSingleFetch = (collectionName, id) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());

          const allProductsRef = collection(db, collectionName);
          const allProductsSnap = await getDocs(allProductsRef);
          const products = [];
          allProductsSnap.forEach(doc => {
            products.push(doc.data());
          });
          const sortedProducts = products.sort((a, b) => b.votes.length - a.votes.length);
          const rankIndex = sortedProducts.findIndex(product => product.title === docSnap.data().title) + 1;
          setRank(rankIndex);
        } else {
          console.error("No document found");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, id]);

  return { data, loading, rank };
};

export default useSingleFetch;
