import { collection, query, orderBy, where } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export function useGetCollection(collectionName, whereQuery = null) {
  const db = useFirestore()

  const collectionRef = collection(db, collectionName)
  const q =
    Array.isArray(whereQuery) && whereQuery.length === 3
      ? query(collectionRef, where(...whereQuery), orderBy('createdAt'))
      : query(collectionRef, orderBy('createdAt'))

  const {
    data: documents,
    error,
    pending,
  } = useCollection(q, {
    ssrKey: `collection:${collectionName}:orderBy(createdAt)`,
  })

  return { documents, error, pending }
}
