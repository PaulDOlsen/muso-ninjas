<template>
  <q-page>
    <section class="app-page-section app-stack app-stack--md">
      <div v-if="error" class="app-feedback-error">
        Could not load playlist: {{ error?.message || error }}
      </div>

      <div v-else-if="pending" class="app-stack app-stack--md">
        <q-card flat class="app-card">
          <q-card-section class="app-card__content">
            <q-skeleton type="rect" height="280px" />
          </q-card-section>
        </q-card>
      </div>

      <div v-else-if="playlist" class="row q-col-gutter-xl items-start">
        <article class="col-12 col-md-4 text-left q-gutter-y-md">
          <q-img
            :src="playlist.coverUrl"
            :alt="playlist.title"
            ratio="1"
            class="rounded-borders q-mb-md"
          />

          <h1 class="app-page-title">{{ playlist.title }}</h1>
          <p class="app-item-meta">Created by {{ playlist.userName }}</p>
          <p class="text-left text-body1 text-weight-regular">{{ playlist.description }}</p>
          <q-btn
            v-if="user?.uid === playlist.userId"
            color="negative"
            label="Delete Playlist"
            @click="handleDelete"
            class="q-mt-md"
            :loading="isDeleting"
            :disable="isDeleting"
          />
          <div v-if="actionError" class="app-feedback-error">{{ actionError }}</div>
        </article>

        <q-card flat class="app-card col-12 col-md-8">
          <q-card-section class="app-card__content app-stack app-stack--md">
            <div v-if="!playlist.songs.length" class="app-page-subtitle">
              No songs have been added to this playlist yet.
            </div>
            <div
              v-for="song in playlist.songs"
              :key="song.id"
              class="song-row flex items-center justify-between"
            >
              <div class="app-content-grow">
                <h3 class="app-item-title">{{ song.title }}</h3>
                <p class="app-item-meta">{{ song.artist }}</p>
              </div>
              <q-btn
                v-if="user?.uid === playlist.userId"
                color="negative"
                label="Delete"
                @click="handleClick(song.id)"
                :loading="isDeleting"
                :disable="isDeleting"
                class="q-ml-md"
              />
            </div>
            <AddSong v-if="user?.uid === playlist.userId" :playlist="playlist" />
          </q-card-section>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useGetDocument } from 'src/composables/getDocument'
import { useUser } from 'src/composables/getUser'
import useDocument from 'src/composables/useDocument'
import { deleteImage } from 'src/composables/useStorage'
import AddSong from 'src/components/AddSong.vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { document: playlist, error, pending } = useGetDocument('playlists', props.id)
const { user } = useUser()
const {
  deleteDoc,
  updateDoc,
  error: deleteError,
  isPending: isDeleting,
} = useDocument('playlists', props.id)
const router = useRouter()
const actionError = ref('')

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this playlist?')) return

  actionError.value = ''
  const coverPath = playlist.value?.coverPath

  if (coverPath) {
    try {
      await deleteImage(coverPath)
    } catch (err) {
      console.error('Failed to delete playlist cover image:', err)
      actionError.value = 'Could not delete cover image. Playlist was not deleted.'
      return
    }
  }

  await deleteDoc()

  if (deleteError.value) {
    console.error('Failed to delete playlist:', deleteError.value)
    actionError.value = 'Could not delete playlist document.'
    return
  }

  // Navigate away after successful deletion
  router.push({ name: 'home' })
}

const handleClick = async (songId) => {
  if (!confirm('Are you sure you want to delete this song?')) return

  actionError.value = ''
  const updatedSongs = playlist.value.songs.filter((song) => song.id !== songId)

  await updateDoc({
    songs: updatedSongs,
  })

  if (deleteError.value) {
    console.error('Failed to delete song:', deleteError.value)
    actionError.value = 'Could not delete song.'
    return
  }
}
</script>

<style scoped>
.song-row {
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--q-color-gray-3);
}

.song-row:last-child {
  border-bottom: none;
}
</style>
