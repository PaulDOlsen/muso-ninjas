import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useCollection(collectionName) {
  const db = useFirestore()
  const error = ref(null)
  const isPending = ref(false)

  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true
    try {
      const colRef = collection(db, collectionName)
      const docRef = await addDoc(colRef, doc)
      isPending.value = false
      return docRef
    } catch (err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  return { error, isPending, addDocument }
}
