<template>
  <div class="app-stack app-stack--md">
    <router-link
      v-for="playlist in playlists"
      :key="playlist.id"
      :to="{ name: 'playlist-details', params: { id: playlist.id } }"
      class="block"
    >
      <q-card flat class="app-card app-card--interactive">
        <q-card-section class="app-card__content app-list-row row items-center no-wrap">
          <q-avatar rounded size="100px" class="app-media-thumb">
            <img :src="playlist.coverUrl" :alt="playlist.title" />
          </q-avatar>

          <div class="app-content-grow">
            <h3 class="app-item-title">{{ playlist.title }}</h3>
            <p class="app-item-meta">created by {{ playlist.userName }}</p>
          </div>

          <q-chip class="app-item-tail" outline color="primary">
            {{ playlist.songs?.length || 0 }} songs
          </q-chip>
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  playlists: {
    type: Array,
    default: () => [],
  },
})
</script>
