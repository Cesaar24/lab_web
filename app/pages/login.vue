<script setup lang="ts">
const { authenticate } = useAuth();
const { csrf } = useCsrf();
definePageMeta({
  /* layout: "dash", */
  middleware: "auth",
});
const loginF = ref({
  email: "",
  password: "",
});
const snackbarval = ref({
  show: false,
  success: false,
  message: "",
});
const userState = userStore();

const handleLogin = async () => {
  /* Validaciones del lado del cliente  */
  // 1. Validación básica de formato de Email (Regex simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(loginF.value.email)) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Por favor, ingresa un correo electrónico válido.",
    };
    return;
  }
  // 2. Validación básica de longitud de contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(loginF.value.password)) {
    snackbarval.value = {
      show: true,
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres. (min: 1 letra minúscula, min: 1 letra mayúscula , min:1 digito)",
    };
    return;
  }
  /*End validaciones */

  try {
    const response = (await $fetch("/api/user_mysql/login", {
      method: "POST",
      body: loginF.value,
      headers: {
        "csrf-token": csrf,
      },
    })) as { success: boolean; data: userProfileForm };

    if (response.success) {
      /* userState.setUser(response.data, response.accessToken); */
      await authenticate();
    }
    await navigateTo({ path: "/dashboard" });
  } catch (error) {
    snackbarval.value = {
      show: true,
      success: false,
      message:
        (error as any)?.statusMessage || "Login failed. Please try again.",
    };
  }
};
</script>
<template>
  <div class="text-center mt-8 pb-8">
    <img src="/facyt.png" width="150" class="mx-auto" />
    <div class="mt-5">
      <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Login</h3>
    </div>
  </div>
  <div class="w-full flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-5">
      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="font-medium"> Email </label>
          <input
            type="email"
            v-model="loginF.email"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
            type="password"
            v-model="loginF.password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div class="flex items-center justify-between text-sm">
          <!-- <div class="flex items-center gap-x-3">
            <input
              type="checkbox"
              id="remember-me-checkbox"
              class="checkbox-item peer hidden"
            />
            <label
              for="remember-me-checkbox"
              class="relative flex w-5 h-5 bg-white peer-checked:bg-[#0093DD] rounded-md border ring-offset-2 ring-[#0093DD] duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
            ></label>
            <span>Remember me</span>
          </div> -->
          <a
            href="javascript:void(0)"
            class="text-center text-[#0093DD] hover:text-[#0093DD]/90"
            >Forgot password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white font-medium bg-[#0093DD] hover:bg-[#0093DD]/90 rounded-lg duration-150"
        >
          Sign in
        </button>
      </form>

      <p class="text-center">
        No tienes cuenta ?
        <nuxt-link
          to="/register"
          class="font-medium text-[#0093DD] hover:text-[#0093DD]/90"
          >Registrate</nuxt-link
        >
      </p>
    </div>
    <snackbar
      :show="snackbarval.show"
      :success="snackbarval.success"
      :messagge="snackbarval.message"
    ></snackbar>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
  align-content: center;
}
</style>
