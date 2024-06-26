import { useCallback, useEffect, useState } from 'react'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from 'firebase/firestore'
import { db } from "../../firebaseConfig";

const useFetch = (collectionName = 'products', LIMIT = 10) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [last, setLast] = useState(null)
  const [moreLoading, setMoreLoading] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const fetchData = useCallback(async () => {
    const limitNumber = LIMIT + 1

    const first = query(
      collection(db, collectionName),
      orderBy('created', 'desc'),
      limit(limitNumber)
    )

    onSnapshot(first, (querySnapshot) => {
      const docs = querySnapshot.docs.slice(0, LIMIT)
      const data = docs.map((docSnapshot) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }
      })
      setData(data)

      const lastVisible = docs[docs.length - 1]
      setLast(lastVisible)

      const size = querySnapshot.size
      setLoadedAll(size < limitNumber)
    })
  }, [collectionName, LIMIT])


  const fetchMoreData = useCallback(async () => {
    const limitNumber = LIMIT + 1

    const next = query(
      collection(db, collectionName),
      orderBy('created', 'desc'),
      limit(limitNumber),
      startAfter(last)
    )

    onSnapshot(next, (querySnapshot) => {
      const docs = querySnapshot.docs.slice(0, LIMIT)
      const data = docs.map((docSnapshot) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }
      })
      setData((prevState) => [...prevState, ...data])

      const lastVisible = docs[docs.length - 1]
      setLast(lastVisible)

      const size = querySnapshot.size
      setLoadedAll(size < limitNumber)
    })
  }, [last, collectionName, LIMIT])

  const handleLoadMore = useCallback(() => {
    setMoreLoading(true)
    fetchMoreData().finally(() => {
      setMoreLoading(false)
    })
  }, [fetchMoreData])

  useEffect(() => {
    setLoading(true)
    fetchData().finally(() => {
      setLoading(false)
    })
  }, [fetchData])

  return {
    loading,
    data,
    moreLoading,
    loadedAll,
    handleLoadMore
  }
}

export default useFetch;