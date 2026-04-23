import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'

export function useLogout() {
  const auth = useFirebaseAuth()
  const error = ref(null)
  const isPending = ref(false)

  const logout = async () => {
    error.value = null
    isPending.value = true
    try {
      await signOut(auth)
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, isPending, logout }
}
