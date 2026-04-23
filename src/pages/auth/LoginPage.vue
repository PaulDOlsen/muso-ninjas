<template>
  <FormPageLayout>
    <q-form @submit.prevent="handleSubmit" class="form-flow app-stack app-stack--sm">
      <div class="app-stack app-stack--sm">
        <h3 class="app-form-heading">Login</h3>
        <p class="app-form-subheading">Sign in to access your playlists.</p>
      </div>

      <q-input v-model="email" label="Email" type="email" filled />
      <q-input v-model="password" label="Password" type="password" filled />

      <div v-if="error" class="app-feedback-error">{{ error }}</div>

      <div class="app-form-actions">
        <q-btn v-if="!isPending" type="submit" label="Login" class="q-btn--primary" />

        <q-btn v-if="isPending" label="Loading..." disable />
      </div>
    </q-form>

    <template #footer>
      <router-link to="/signup">Don’t have an account? Sign up</router-link>
    </template>
  </FormPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import FormPageLayout from 'src/layouts/FormPageLayout.vue'
import { useLogin } from 'src/composables/useLogin'
import { useRouter } from 'vue-router'

const { error, login, isPending } = useLogin()
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  await login(email.value, password.value)

  if (!error.value) {
    router.push({ name: 'user-playlists' })
  }
}
</script>
