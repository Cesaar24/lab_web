<script setup lang="ts">
definePageMeta({
  /* layout: "dash", */
  middleware: "auth",
});
const textError = ref("");
const snackbar = ref(false);
const userState = userStore();
/* Data */
const formu = ref();
const registerF = ref({
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
  isAdmin: false,
});

const submit = async () => {
  const { confirmPassword, isAdmin, ...dataSend } = registerF.value;
  try {
    const response = await $fetch("/api/user_mysql/register", {
      method: "POST",
      body: dataSend,
    });
    if (response.success) {
      userState.setUser(response.data);
    }
  } catch (err: any) {
    textError.value = err.statusMessage;
    snackbar.value = true;
    console.error("Register err", err);
    return;
  } finally {
    await navigateTo("/dashboard");
  }
};
</script>
<template>
  <div class="text-center mt-8 pb-8">
    <img src="/facyt.png" width="150" class="mx-auto" />
    <div class="mt-5">
      <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Registro</h3>
    </div>
  </div>
  <div class="w-full flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-5 max-h-screen">
      <form class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="font-medium"> Name </label>
          <input
            type="text"
            v-model="registerF.name"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Email </label>
          <input
            type="Email"
            v-model="registerF.email"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
            type="password"
            v-model="registerF.password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Confirm Password </label>
          <input
            type="password"
            v-model="registerF.confirmPassword"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#0093DD] shadow-sm rounded-lg"
          />
        </div>
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-x-3">
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
          </div>
        </div>
        <button
          class="w-full px-4 py-2 text-white font-medium bg-[#0093DD] hover:bg-[#0093DD]/90 active:bg-[#0093DD] rounded-lg duration-150"
          type="submit"
        >
          Registrar
        </button>
      </form>
      <!-- <button
        class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
      >
        <img
          src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
          alt="Google"
          class="w-5 h-5"
        />
        Continue with Google
      </button> -->
      <p class="text-center">
        Ya tienes cuenta
        <nuxt-link
          to="/login"
          class="font-medium text-[#0093DD] hover:text-[#0093DD]/90"
          >Iniciar sesion</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
