<script setup>
definePageMeta({
  layout: "dash",
  middleware: "auth",
});

onMounted(() => {});
</script>
<style scoped>
.dashboard {
  min-height: 100%;
}
</style>

<template>
  <section class="py-16 bg-gray-100 min-h-screen">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Bienvenido al dashboard
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Elementary -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <div class="text-blue-600 mb-4">
            <i class="fas fa-pencil-alt text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">Elementary School</h3>
          <p class="text-gray-600 mb-4">
            Our elementary program focuses on foundational skills in reading,
            writing, and mathematics while fostering curiosity and creativity.
          </p>
          <a href="#" class="text-blue-600 font-semibold hover:underline"
            >Learn More →</a
          >
        </div>

        <!-- Middle School -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <div class="text-blue-600 mb-4">
            <i class="fas fa-book text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">Middle School</h3>
          <p class="text-gray-600 mb-4">
            Our middle school curriculum challenges students academically while
            providing strong support systems during these transitional years.
          </p>
          <a href="#" class="text-blue-600 font-semibold hover:underline"
            >Learn More →</a
          >
        </div>

        <!-- High School -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <div class="text-blue-600 mb-4">
            <i class="fas fa-graduation-cap text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">High School</h3>
          <p class="text-gray-600 mb-4">
            Our comprehensive high school program includes AP courses, career
            pathways, and college preparation to ensure student success.
          </p>
          <a href="#" class="text-blue-600 font-semibold hover:underline"
            >Learn More →</a
          >
        </div>
      </div>
    </div>
  </section>
</template>
