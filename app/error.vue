<template>
  <div>
    <div class="h-screen flex flex-column justify-center items-center">
      <div class="pa-4">
        <h2 class="text-h2">{{ error?.statusCode }}</h2>
        <p class="text-xl text-red-lighten-1">{{ error?.statusMessage }}</p>
        <button @click="handleError" class="mt-2">Volver al inicio</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";

// layouts/dash.vue
definePageMeta({
  layout: "dash",
});

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>
