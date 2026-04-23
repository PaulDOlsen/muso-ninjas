<template>
  <q-page class="page-form-layout page-form-layout--top">
    <div class="page-form-stack">
      <header v-if="$slots.header" class="page-form-header">
        <slot name="header" />
      </header>

      <div class="form-card">
        <slot />
      </div>

      <footer v-if="$slots.footer" class="page-form-footer">
        <slot name="footer" />
      </footer>
    </div>
  </q-page>
</template>
