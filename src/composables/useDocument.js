import { ref } from 'vue'
import { doc, deleteDoc as removeDoc, updateDoc as patchDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useDocument(collectionName, id) {
  const db = useFirestore()
  const error = ref(null)
  const isPending = ref(false)

  const deleteDoc = async () => {
    error.value = null
    isPending.value = true

    try {
      const documentRef = doc(db, collectionName, id)
      const result = await removeDoc(documentRef)
      isPending.value = false
      return result
    } catch (err) {
      console.log(err.message)
      error.value = 'could not delete the document'
      isPending.value = false
    }
  }

  const updateDoc = async (updates) => {
    error.value = null
    isPending.value = true

    try {
      const documentRef = doc(db, collectionName, id)
      const result = await patchDoc(documentRef, updates)
      isPending.value = false
      return result
    } catch (err) {
      console.log(err.message)
      error.value = 'could not update the document'
      isPending.value = false
    }
  }

  return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
