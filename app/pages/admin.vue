<template>
  <div class="admin">
    <h1>Welcome to the admin</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
      consequatur quidem quasi quaerat inventore non doloribus quia temporibus
      exercitationem deserunt. Eos est animi reiciendis eligendi, quis deserunt
      aliquid consequatur minima. Lorem
    </p>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dash",
  middleware: ["auth", "admin"],
});
</script>
<style scoped>
.admin {
  min-height: 100%;
}
</style>
