import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export function useSignup() {
  const auth = useFirebaseAuth()
  const error = ref(null)
  const isPending = ref(false)

  const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      await updateProfile(res.user, { displayName })
      isPending.value = false

      return res
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, signup, isPending }
}
