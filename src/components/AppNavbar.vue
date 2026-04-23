<script setup>
import { useLogout } from 'src/composables/useLogout'
import { useUser } from 'src/composables/getUser'
import { useRouter } from 'vue-router'
const { logout } = useLogout()
const router = useRouter()
const { user } = useUser()
const handleLogout = async () => {
  await logout()
  router.push({ name: 'login' })
}

const props = defineProps({
  toggleLeftDrawer: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <q-header class="navbar">
    <q-toolbar class="navbar-inner">
      <img
        src="src/assets/ninja.png"
        class="navbar-logo"
        alt="Muso Ninjas Logo"
        @click="props.toggleLeftDrawer"
      />
      <h1 class="navbar-title">
        <router-link :to="{ name: 'home' }">Muso Ninjas</router-link>
      </h1>
      <div class="navbar-links">
        <div v-if="user" class="navbar-actions">
          <router-link :to="{ name: 'create-playlist' }">
            <q-btn label="Create Playlist" class="q-btn-ghost" />
          </router-link>
          <router-link :to="{ name: 'user-playlists' }">
            <q-btn label="My Playlists" class="q-btn-ghost" />
          </router-link>
          <span class="text-body2 inline-block q-ml-md q-pl-md border-left border-grey-3"
            >Hi there, {{ user.displayName }}</span
          >
          <q-btn label="Logout" class="q-btn-ghost" @click="handleLogout" />
        </div>
        <div v-else class="navbar-actions">
          <router-link :to="{ name: 'create-playlist' }">
            <q-btn label="Create Playlist" class="q-btn-ghost" />
          </router-link>

          <router-link :to="{ name: 'signup' }">
            <q-btn label="Signup" class="q-btn--primary" />
          </router-link>

          <router-link :to="{ name: 'login' }">
            <q-btn label="Login" class="q-btn-ghost" />
          </router-link>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>
