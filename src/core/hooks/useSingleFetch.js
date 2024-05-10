import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useSingleFetch = (collectionName, id, subColName = null) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let fetchedData = docSnap.data();

          if (subColName) {
            const subColRef = collection(docRef, subColName);
            const subColSnap = await getDocs(subColRef);
            const subColData = subColSnap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            fetchedData[subColName] = subColData;
          }

          setData(fetchedData);
        } else {
          console.error("No document found");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [collectionName, id, subColName]);

  return { data, loading };
};

export default useSingleFetch;