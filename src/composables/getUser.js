import { useCurrentUser } from 'vuefire'

export function useUser() {
  const user = useCurrentUser()
  return { user }
}
