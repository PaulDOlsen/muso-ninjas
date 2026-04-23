<template>
  <q-page>
    <section class="app-page-section app-stack app-stack--md">
      <h1 class="app-page-title">My Playlists</h1>

      <div v-if="error" class="app-feedback-error">
        Could not load playlists: {{ error?.message || error }}
      </div>

      <div v-else-if="pending" class="app-page-subtitle">Loading your playlists...</div>

      <div v-else-if="playlists">
        <ListView :playlists="playlists" />
      </div>

      <div>
        <router-link :to="{ name: 'create-playlist' }" class="inline-block">
          <q-btn label="Create a New Playlist" class="q-btn--primary" no-caps />
        </router-link>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import ListView from 'src/components/ListView.vue'
import { useGetCollection } from 'src/composables/getCollection'
import { useUser } from 'src/composables/getUser'

const { user } = useUser()

const {
  documents: playlists,
  error,
  pending,
} = useGetCollection('playlists', ['userId', '==', user.value?.uid || null])
</script>
