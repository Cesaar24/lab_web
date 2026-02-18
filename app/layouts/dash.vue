<script setup lang="ts">
const visible = ref(false);
const userState = computed(() => userStore().getUserProfile as User);
const { logout } = useAuth();
const links = ref([
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Admin",
    path: "/",
  },
  {
    title: "Users",
    path: "/",
  },
  {
    title: "Guests",
    path: "/",
  },
]);

const container = ref(null);
const handleClickOutside = (event: any) => {
  /* @ts-ignore */
  if (container.value && !container.value.contains(event.target)) {
    visible.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="dash">
    <!-- Header -->
    <header
      class="relative bg-white/80 backdrop-blur-lg border-b border-gray-200/50 top-0 z-50 shadow-lg shadow-black/5"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
      ></div>

      <nav class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3 group">
            <div
              class="w-10 h-10 bg-gradient-to-br from-[#0093DD] to-[#0093DD]/50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            >
              <span class="text-white font-bold text-lg">F</span>
            </div>

            <span
              class="text-2xl font-bold bg-gradient-to-r from-[#0093DD] to-[#0093DD]/50 bg-clip-text text-transparent"
            >
              Facyt
            </span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <nuxt-link
              to="/dashboard"
              class="text-gray-700 hover:text-[#0093DD] font-medium transition-colors duration-200 relative group"
              >dashboard
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0093DD] transition-all duration-300 group-hover:w-full"
              ></span
            ></nuxt-link>

            <nuxt-link
              to="/admin"
              class="text-gray-700 hover:text-[#0093DD] font-medium transition-colors duration-200 relative group"
              >Admin
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0093DD] transition-all duration-300 group-hover:w-full"
              ></span
            ></nuxt-link>
            <nuxt-link
              to="/guest"
              class="text-gray-700 hover:text-[#0093DD] font-medium transition-colors duration-200 relative group"
              >Guest
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0093DD] transition-all duration-300 group-hover:w-full"
              ></span
            ></nuxt-link>
          </div>

          <!-- CTA Button & Mobile Menu -->
          <div class="flex items-center space-x-4">
            <div ref="container" class="dropdown relative">
              <button
                class="flex items-center space-x-2 focus:outline-none group"
                @mouseout="visible = true"
              >
                <div class="relative">
                  <div
                    class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0093DD] overflow-hidden avatar-ring"
                  >
                    <!-- <img
                      src="../../public/user.png"
                      alt="User"
                      class="h-full w-full object-cover"
                    /> -->
                  </div>
                  <span
                    class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"
                  ></span>
                </div>
                <div class="hidden lg:flex flex-col items-start">
                  <span
                    class="text-sm font-medium text-gray-700 group-hover:text-[#0093DD] transition-colors duration-200"
                    >{{ userState.name }}</span
                  >
                  <span class="text-xs text-gray-500">{{
                    userState.isAdmin ? "Admin" : "Guest"
                  }}</span>
                </div>
              </button>
              <div
                :class="visible ? 'visible opacity-100' : 'invisible opacity-0'"
                class="dropdown-menu absolute group-hover:bg-red-400! right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-50 transition-all duration-300 transform -translate-y-2 border border-gray-100"
              >
                <div class="px-4 py-3 border-b border-gray-100">
                  <div class="flex items-center">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0093DD] overflow-hidden mr-3"
                    >
                      <!-- <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="User"
                        class="h-full w-full object-cover"
                      /> -->
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ userState.name }}
                      </p>
                      <p class="text-sm text-gray-500">{{ userState.email }}</p>
                    </div>
                  </div>
                </div>
                <nuxt-link
                  to="/profile"
                  class="px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0093DD] flex items-center transition-colors duration-200"
                >
                  Mi Perfil
                </nuxt-link>

                <div class="border-t border-gray-100 my-1"></div>
                <span
                  @click="logout"
                  class="px-4 py-2.5 cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-[#0093DD] flex items-center transition-colors duration-200"
                >
                  Sign out
                </span>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button
              id="mobile-menu-btn"
              class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
    <slot />
    <!-- <AppFooter /> -->
    <footer class="w-100"><span>@2026</span></footer>
  </div>
</template>

<style scoped>
header {
  height: 75px;
  position: relative;
}
.dash {
  /* overflow-y: scroll; */
  height: calc(100% - 100px);
  /* height: 100%; */
  position: relative;
}
.icon {
  top: 30%;
}
a {
  text-decoration: none;
  color: currentcolor;
  padding: 16px;
}
li {
  float: left;
  /* background: blue; */
  text-align: center;
  padding: 16px;
  list-style: none;
  transition: all 0.3s;
}
li:hover {
  scale: 1.2;
  /* background: rgb(33, 134, 33); */
}
li:hover a {
  color: rgb(46, 177, 46);
}
.menu-bar {
  display: none;
}
.menu-bar-link {
  transition: all 0.3s;
}
.menu-bar-link:hover {
  scale: 1.2;
  color: rgb(46, 177, 46);
}
@media (max-width: 900px) {
  .menu {
    display: none;
  }
  .menu-bar {
    display: block;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
