import { ref } from 'vue'
import { useUser } from './getUser'

const { user } = useUser()

const getAuthHeaders = async () => {
  if (!user.value) return {}

  const token = await user.value.getIdToken()
  return {
    Authorization: `Bearer ${token}`,
  }
}

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    error.value = null
    url.value = null

    if (!user.value) {
      const authErr = new Error('You must be signed in to upload images.')
      error.value = authErr
      throw authErr
    }

    filePath.value = `covers/${user.value.uid}/${file.name}`

    const formData = new FormData()
    formData.append('file', file)
    formData.append('filePath', filePath.value)

    try {
      const headers = await getAuthHeaders()

      const res = await fetch(
        'https://worker-hidden-snowflake-50eb.pauldolsen.workers.dev/upload',
        {
          method: 'POST',
          headers,
          body: formData,
        },
      )

      if (!res.ok) throw new Error('Failed to upload file')

      const data = await res.json()
      url.value = data.url
    } catch (err) {
      error.value = err
      console.log(err.message)
      throw err
    }
  }

  return { error, url, filePath, uploadImage }
}

export const deleteImage = async (path) => {
  try {
    const headers = await getAuthHeaders()

    const formData = new FormData()
    formData.append('filePath', path)

    const res = await fetch('https://worker-hidden-snowflake-50eb.pauldolsen.workers.dev/delete', {
      method: 'POST',
      headers,
      body: formData,
    })

    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')

    if (!res.ok) {
      const bodyText = await res.text()
      throw new Error(bodyText || 'Failed to delete image')
    }

    if (!isJson) {
      const bodyText = await res.text()

      if (bodyText.includes('Worker is running')) {
        return { skipped: true, reason: 'Delete endpoint not implemented on worker' }
      }

      return { ok: true, raw: bodyText }
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.log('Failed to delete image:', err.message)
    throw err
  }
}

export default useStorage
