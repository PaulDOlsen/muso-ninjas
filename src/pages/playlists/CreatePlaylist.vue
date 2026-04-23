<template>
  <q-page class="page-form-layout page-form-layout--raised">
    <q-card class="form-card">
      <q-form @submit.prevent="handleSubmit" class="form-flow">
        <h4>Create a New Playlist</h4>

        <q-input v-model="title" label="Playlist title" filled required />

        <q-input
          v-model="description"
          label="Playlist description"
          type="textarea"
          autogrow
          filled
          required
        />

        <q-file
          outlined
          v-model="file"
          @update:model-value="handleFile"
          label="Upload Playlist Cover Image"
          accept="image/png, image/jpg, image/jpeg"
          use-chips
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div v-if="fileError" class="error">{{ fileError }}</div>

        <q-btn v-if="!isPending" type="submit" label="Create" class="q-btn--primary" />
        <q-btn v-else label="Creating..." class="q-btn--primary" disabled />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useStorage from 'src/composables/useStorage'
import { useCollection } from 'src/composables/useCollection'
import { useUser } from 'src/composables/getUser'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user } = useUser()

const { filePath, url, uploadImage, error: storageError } = useStorage()
const { addDocument, error } = useCollection('playlists')

const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)

const types = ['image/png', 'image/jpg', 'image/jpeg']

const handleFile = (selected) => {
  const picked = Array.isArray(selected) ? selected[0] : selected
  if (picked && types.includes(picked.type)) {
    file.value = picked
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'Invalid file type. Only PNG, JPG, and JPEG are allowed.'
  }
}

const handleSubmit = async () => {
  if (!file.value) {
    fileError.value = 'Please select a valid cover image file.'
    return
  }

  fileError.value = null
  isPending.value = true

  try {
    await uploadImage(file.value)
  } catch (err) {
    fileError.value = storageError.value?.message || err?.message || 'Upload failed.'
    isPending.value = false
    return
  }

  if (!url.value || !filePath.value) {
    fileError.value = 'Cover upload failed. Playlist was not created.'
    isPending.value = false
    return
  }

  const docRef = await addDocument({
    title: title.value,
    description: description.value,
    coverUrl: url.value,
    coverPath: filePath.value,
    userId: user.value.uid,
    userName: user.value.displayName || null,
    songs: [],
    createdAt: new Date().toISOString(),
  })
  isPending.value = false

  if (error.value) {
    fileError.value = error.value.message || 'Upload failed.'
    return
  }

  if (!docRef?.id) {
    fileError.value = 'Could not create playlist document.'
    return
  }

  router.push({ name: 'playlist-details', params: { id: docRef.id } })
  console.log('Playlist created successfully with ID:', docRef.id)
}
</script>
