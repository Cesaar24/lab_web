<template>
  <div class="container mx-auto min-h-screen">
    <h1>Welcome to the admin</h1>
    <p>Esta es una ruta para todos</p>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dash",
  middleware: "auth",
});
</script>
<style scoped></style>
