import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function useLogin() {
  const auth = useFirebaseAuth()
  const error = ref(null)
  const isPending = ref(false)

  const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'Incorrect login credentials'
      isPending.value = false
    }
  }

  return { error, isPending, login }
}
