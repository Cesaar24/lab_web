<script setup>
definePageMeta({
  layout: "dash",
  middleware: "auth",
});
/* const userState = userStore();
const user = computed(() => {
  return userStore().getUserProfile;
}); */
onMounted(() => {});
</script>
<style scoped>
.dashboard {
  min-height: 100%;
}
</style>

<template>
  <!-- <v-container class="dashboard">
    <v-alert border="start" close-label="Close Alert">
      <div class="pa-4">
        <h1>User data</h1>
      </div>
      <v-divider></v-divider>
      <div class="px-4">
        <v-list bg-color="transparent" lines="two">
          <v-list-item
            transparent
            title="Name"
            :subtitle="user.name"
          ></v-list-item>
          <v-list-item
            title="Last name"
            :subtitle="user.lastName"
          ></v-list-item>
          <v-list-item
            title="User name"
            :subtitle="user.username"
          ></v-list-item>
          <v-list-item title="Email" :subtitle="user.email"></v-list-item>
          <v-list-item
            title="Role"
            :subtitle="userState.isAdmin ? 'Admin' : 'User'"
          ></v-list-item>
        </v-list>
      </div>
      <div class="pa-4">
        <h1>Info conection</h1>
      </div>
      <v-divider></v-divider>
      <div class="px-4">
        <v-list bg-color="transparent" lines="two">
          <v-list-item
            v-for="(con, key, i) in infoConnection"
            :key="i"
            transparent
            :title="key"
            :subtitle="con"
          ></v-list-item>
        </v-list>
      </div>
    </v-alert>
  </v-container> -->
</template>
