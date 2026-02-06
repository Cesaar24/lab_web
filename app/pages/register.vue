<script setup lang="ts">
/*   import { GoogleSignInButton, type CredentialResponse, } from "vue3-google-signin"; */
definePageMeta({
  /* layout: "dash", */
  middleware: "auth",
});
const { register, registerGoogle } = useAuth();
const textError = ref("");
const snackbar = ref(false);

/* Data */
const formu = ref();
const registerF = ref({
  name: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  isAdmin: false,
});

/*  const handleLoginSuccess = async (response: CredentialResponse ) => {
    const { credential } = response;
    console.log("Access Token", credential);
    try{
      await registerGoogle({token:credential})
    }catch(err){
      console.log("Register err",err)
      return
    }

  }; */
// handle an error event
/* const handleLoginError = () => {
  console.error("Login failed");
}; */

const submit = async () => {
  /* const isValid = await formu.value.validate();
  if (!isValid.valid) return; */
  const { confirmPassword, ...dataSend } = registerF.value;

  try {
    await register(dataSend);
    /* navigateTo('/dashboard') */
  } catch (err: any) {
    textError.value = err.statusMessage;
    snackbar.value = true;
    console.error("Register err", err);
    return;
  }
};
</script>
<template>
  <div class="w-full h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-5 max-h-screen">
      <div class="text-center pb-8">
        <img
          src="https://ossimg.cmdgametransit.com/OK.Win/other/h5setting_20240313155706n3d7.png"
          width="150"
          class="mx-auto"
        />
        <div class="mt-5">
          <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Registro</h3>
        </div>
      </div>
      <form class="space-y-5" @submit.prevent @submit="submit">
        <div>
          <label class="font-medium"> Name </label>
          <input
            type="text"
            v-model="registerF.name"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Last name </label>
          <input
            type="text"
            v-model="registerF.lastName"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Username </label>
          <input
            type="text"
            v-model="registerF.username"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Email </label>
          <input
            type="Email"
            v-model="registerF.email"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
            type="text"
            v-model="registerF.password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Confirm Password </label>
          <input
            type="text"
            v-model="registerF.confirmPassword"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="text-start mt-5 pa-3">
          <input type="checkbox" v-model="registerF.isAdmin" />
          <span class="ml-2">Admin ?</span>
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
              class="relative flex w-5 h-5 bg-white peer-checked:bg-red-600 rounded-md border ring-offset-2 ring-red-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
            ></label>
            <span>Remember me</span>
          </div>
        </div>
        <button
          class="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
          type="submit"
        >
          Registrar
        </button>
      </form>
      <button
        class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
      >
        <!-- SVG for Google Sign In -->
        <img
          src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <!-- Comment: Google Icon SVG here -->
        Continue with Google
      </button>
      <p class="text-center">
        Ya tienes cuenta
        <nuxt-link
          to="/login"
          class="font-medium text-red-600 hover:text-red-500"
          >Iniciar sesion</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
  /*  background: aqua; */
  align-content: center;
}
.card {
  margin-top: 44px;
  width: 600px;
  margin: auto;
  border-radius: 12px;
  transition: all 0.5s;
}

.content {
  /*  background: white; */
  height: calc(100% - 48px);
  position: relative;
  min-height: 400px;
}
.login {
  width: 100%;
  /* background: #222; */
}
.register {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
