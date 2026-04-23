<template>
  <div>
    <q-btn
      v-if="!showForm"
      label="Add Songs"
      class="q-btn--primary"
      @click="showForm = true"
      no-caps
    />

    <q-form v-else @submit.prevent="handleSubmit" class="add-song-form app-stack app-stack--sm">
      <h3 class="app-form-heading add-song-heading">Add a New Song</h3>

      <q-input v-model="title" label="Song title" filled required />

      <q-input v-model="artist" label="Artist" filled required />

      <div class="app-form-actions">
        <q-btn
          type="submit"
          label="Add"
          class="q-btn--primary"
          :loading="isPending"
          :disable="isPending"
          no-caps
        />
        <q-btn
          type="button"
          flat
          label="Cancel"
          @click="handleCancel"
          :disable="isPending"
          no-caps
        />
      </div>

      <div v-if="error" class="app-feedback-error">{{ error }}</div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useDocument from 'src/composables/useDocument'

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
})

const title = ref('')
const artist = ref('')
const showForm = ref(false)

const { updateDoc, isPending, error } = useDocument('playlists', props.playlist.id)

const resetForm = () => {
  title.value = ''
  artist.value = ''
}

const handleCancel = () => {
  resetForm()
  showForm.value = false
}

const handleSubmit = async () => {
  const newSong = {
    title: title.value.trim(),
    artist: artist.value.trim(),
    id: Date.now(),
  }

  const existingSongs = Array.isArray(props.playlist.songs) ? props.playlist.songs : []

  await updateDoc({
    songs: [...existingSongs, newSong],
  })

  if (error.value) return

  resetForm()
}
</script>

<style scoped>
.add-song-form {
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  padding: var(--space-4);
}

.add-song-heading {
  margin-bottom: var(--space-2);
}
</style>
