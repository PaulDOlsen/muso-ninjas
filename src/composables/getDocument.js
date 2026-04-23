import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'

export function useGetDocument(collectionName, id) {
  const db = useFirestore()

  const documentRef = doc(db, collectionName, id)

  const {
    data: document,
    error,
    pending,
  } = useDocument(documentRef, {
    ssrKey: `document:${collectionName}:${id}`,
  })

  return { document, error, pending }
}
