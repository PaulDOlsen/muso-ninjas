<template>
  <FormPageLayout>
    <q-form @submit.prevent="handleSubmit" class="form-flow app-stack app-stack--sm">
      <div class="app-stack app-stack--sm">
        <h3 class="app-form-heading">Signup</h3>
        <p class="app-form-subheading">Create your account to start sharing playlists.</p>
      </div>

      <q-input v-model="displayName" label="Display Name" filled />
      <q-input v-model="email" label="Email" filled />
      <q-input v-model="password" label="Password" type="password" filled />

      <div v-if="error" class="app-feedback-error">{{ error }}</div>

      <div class="app-form-actions">
        <q-btn v-if="!isPending" type="submit" label="Sign Up" class="q-btn--primary" />

        <q-btn v-if="isPending" label="Loading..." disable />
      </div>
    </q-form>

    <template #footer>
      <router-link to="/login">Already have an account? Log in</router-link>
    </template>
  </FormPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import FormPageLayout from 'src/layouts/FormPageLayout.vue'
import { useSignup } from 'src/composables/useSignup'
import { useRouter } from 'vue-router'

const { error, signup, isPending } = useSignup()
const email = ref('')
const password = ref('')
const displayName = ref('')
const router = useRouter()

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value)

  if (!error.value) {
    router.push({ name: 'user-playlists' })
  }
}
</script>
