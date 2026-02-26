<script setup lang="ts">
const { authenticate } = useAuth();
const { csrf } = useCsrf();

definePageMeta({
  /* layout: "dash", */
  middleware: "auth",
});

const userState = userStore();
/* Data */
const registerF = ref({
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
});
const snackbarval = ref({
  show: false,
  success: false,
  message: "",
});

const submit = async () => {
  const { confirmPassword, ...dataSend } = registerF.value;
  /* Validaciones del lado del cliente */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerF.value.email)) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Por favor, ingresa un correo electrónico válido.",
    };
    return;
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (
    registerF.value.name.trim() === "" ||
    registerF.value.name.length < 3 ||
    !nameRegex.test(registerF.value.name)
  ) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Por favor, ingresa un nombre válido.",
    };
    return;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(registerF.value.password)) {
    snackbarval.value = {
      show: true,
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres. (min: 1 letra minúscula, min: 1 letra mayúscula , min:1 digito)",
    };
    return;
  }
  if (registerF.value.password !== registerF.value.confirmPassword) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Las contraseñas no coinciden.",
    };
    return;
  }
  /*  */

  try {
    const response = (await $fetch("/api/user_mysql/register", {
      method: "POST",
      body: dataSend,
      headers: {
        "csrf-token": csrf,
      },
    })) as { success: boolean; data: userProfileForm };
    if (response.success) {
      /* userState.setUser(response.data, response.accessToken); */
      await authenticate();
    }
    await navigateTo("/dashboard");
  } catch (err: any) {
    snackbarval.value = {
      show: true,
      success: false,
      message: err.statusMessage || "Error al registrar",
    };
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

        <button
          class="w-full px-4 py-2 text-white font-medium bg-[#0093DD] hover:bg-[#0093DD]/90 active:bg-[#0093DD] rounded-lg duration-150"
          type="submit"
        >
          Registrar
        </button>
      </form>
      <p class="text-center">
        Ya tienes cuenta
        <nuxt-link
          to="/login"
          class="font-medium text-[#0093DD] hover:text-[#0093DD]/90"
          >Iniciar sesion</nuxt-link
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

<style scoped></style>
