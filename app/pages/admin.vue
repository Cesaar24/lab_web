<template>
  <div class="container mx-auto min-h-screen">
    <h1>Welcome to the admin</h1>
    <p>Esta es una ruta protegida solo para admin</p>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dash",
  middleware: ["auth", "admin"],
});
</script>
<style scoped></style>
