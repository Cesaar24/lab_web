<script setup lang="ts">
definePageMeta({
  layout: "dash",
  middleware: "auth",
});
const userState = userStore();
const { csrf } = useCsrf();

const userForm = ref<userProfileForm>();
const passwordVerification = ref("");
const snackbarval = ref({
  show: false,
  success: false,
  message: "",
});

// mounted
onMounted(() => {
  if (userState.user.credentials.logged) {
    const { password, ..._user } = userState.getUserProfile as User;
    //@ts-ignore
    userForm.value = _user;
  }
});

// update user profile
const updateUserProfile = async () => {
  // Validaciones del lado del cliente  userForm.value
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (
    !userForm.value ||
    !userForm.value.name ||
    userForm.value.name.length < 3 ||
    !nameRegex.test(userForm.value.name)
  ) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Ingrese un nombre valido.",
    };
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userForm.value || !emailRegex.test(userForm.value.email)) {
    snackbarval.value = {
      show: true,
      success: false,
      message: "Por favor, ingresa un correo electrónico válido.",
    };
    return;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(passwordVerification.value)) {
    snackbarval.value = {
      show: true,
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres. (min: 1 letra minúscula, min: 1 letra mayúscula , min:1 digito)",
    };
    return;
  }
  /*  */
  //@ts-ignore
  const _user: userProfileForm = userForm.value as userProfileForm;
  const newData = {
    id: _user.id,
    name: _user.name,
    email: _user.email,
    role: _user.role || "User",
    passwordVerification: passwordVerification.value,
  };
  try {
    const response = (await $fetch("/api/user_mysql/update", {
      method: "POST",
      body: newData,
      headers: {
        "csrf-token": csrf,
      },
    })) as { success: boolean; data: userProfileForm; accessToken: string };

    if (response.success) {
      userState.setUser(response.data as userProfileForm, response.accessToken);
    }
    snackbarval.value = {
      show: true,
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Error updating user profile:", error);

    snackbarval.value = {
      show: true,
      success: false,
      message:
        (error as any)?.statusMessage || "Update failed. Please try again.",
    };
  } finally {
    passwordVerification.value = "";
  }
};

const roles: Array<Role> = ["User", "Admin"];
</script>
<template>
  <!-- profile -->
  <div class="container mx-auto min-h-screen">
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px] bg-white">
        <form v-if="userForm" @submit.prevent="updateUserProfile">
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-full">
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  v-model="(userForm as userProfileForm).name"
                  name="name"
                  required
                  placeholder="First Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0093DD] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div class="-mx-3 flex flex-wrap mb-5">
            <div class="w-full px-3 sm:w-full">
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  type="email"
                  v-model="(userForm as userProfileForm).email"
                  name="email"
                  placeholder="email"
                  required
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0093DD] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-x-3 pb-8">
            <span class="w-1/4 font-semibold">Select Rol:</span>
            <select
              id="select-role"
              v-model="(userForm as userProfileForm).role"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0093DD] focus:shadow-md"
            >
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>
          <!-- divider line -->
          <div class="mb-5 border-t border-[#e0e0e0]"></div>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-full">
              <div class="mb-5">
                <label
                  for="password verification"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Ingrese su contraseña
                </label>
                <input
                  type="password"
                  required
                  v-model="passwordVerification"
                  name="password verification"
                  placeholder="password verification"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0093DD] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="hover:shadow-form rounded-md bg-[#0093DD] hover:bg-[#0093DD]/90 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Actualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- <script>alert("hello world")</script> -->
    <!--  -->
    <snackbar
      :show="snackbarval.show"
      :success="snackbarval.success"
      :messagge="snackbarval.message"
    ></snackbar>
  </div>
</template>
