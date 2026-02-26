<template>
  <section class="py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Bienvenido al admin
      </h2>
      <div class="flex justify-center">
        <p>Este ruta esta protegida por roles</p>
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "dash",
  middleware: ["auth", "admin"],
});
</script>
<style scoped></style>
