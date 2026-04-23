<template>
  <q-page>
    <section class="app-page-section app-stack app-stack--md">
      <h1 class="app-page-title">Playlists</h1>
      <p class="app-page-subtitle">Browse community playlists and discover new tracks.</p>

      <div v-if="error" class="app-feedback-error">
        Could not load playlists: {{ error?.message }}
      </div>

      <div v-if="documents">
        <list-view :playlists="documents" />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import ListView from 'src/components/ListView.vue'
import { useGetCollection } from 'src/composables/getCollection'
const { documents, error } = useGetCollection('playlists')
</script>
