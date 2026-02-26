<script setup lang="ts">
const isLoaded = ref(false);
onMounted(() => {
  // Simular carga de módulos o esperar a un evento
  isLoaded.value = true;
});
</script>
<template>
  <clientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </clientOnly>
</template>
