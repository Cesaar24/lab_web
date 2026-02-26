<script setup>
definePageMeta({
  layout: "dash",
  middleware: "auth",
});
const user = userStore();
</script>
<template>
  <section class="py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Bienvenido al usuario
      </h2>
      <div class="pt-16 pb-8 px-6 text-center">
        <h3 class="text-xl font-bold text-gray-800">
          {{ user.getUserProfile.name }}
        </h3>
        <p class="text-indigo-600 font-medium">
          Email:{{ user.getUserProfile.email }}
        </p>
        <p class="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          veritatis hic adipisci soluta dignissimos corrupti, excepturi maxime
          quos! Impedit mollitia quos minus eveniet, doloremque voluptatum illum
          voluptates rem consectetur inventore.
        </p>

        <!-- Stats -->
        <div class="flex justify-center space-x-6 mt-6">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">142</p>
            <p class="text-sm text-gray-500">Projects</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">24.5K</p>
            <p class="text-sm text-gray-500">Followers</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">562</p>
            <p class="text-sm text-gray-500">Following</p>
          </div>
        </div>

        <!-- Contact Buttons -->
        <div class="mt-8 flex justify-center space-x-3">
          <button
            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            Follow
          </button>
          <button
            class="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            Message
          </button>
        </div>

        <!-- Social Links -->
        <div class="mt-8 flex justify-center space-x-5">
          <a
            href="#"
            class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <i class="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <i class="fab fa-linkedin-in text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <i class="fab fa-dribbble text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <i class="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="px-6 pb-8 flex justify-center">
      <div class="gap-2">
        <span
          class="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
          >C++</span
        >
        <span
          class="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
          >Javascript</span
        >
        <span
          class="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
          >Python</span
        >
        <span
          class="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
          >Wireframing</span
        >
        <span
          class="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
          >Mysql</span
        >
      </div>
    </div>
  </section>
</template>

<style scoped></style>
