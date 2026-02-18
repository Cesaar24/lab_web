<script setup lang="ts">
definePageMeta({
  layout: "dash",
  middleware: "auth",
});
const userState = userStore();

const userForm = <userProfileForm | {}>ref({});
const snackbarval = ref({
  show: false,
  success: false,
});
const state = ref({
  ...userForm,
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
  //@ts-ignore
  const _user: userProfileForm = userForm.value as userProfileForm;

  const newData: userProfileForm = {
    id: _user.id,
    name: _user.name,
    email: _user.email,
    isAdmin: _user.isAdmin,
  };
  try {
    const response = await $fetch("/api/user_mysql/update", {
      method: "POST",
      body: newData,
    });
    if (response.success) {
      userState.setUser(response.data as User);
    }
  } catch (err) {
    console.error(err);
  } finally {
    snackbarval.value = {
      show: true,
      success: true,
    };
  }
};

const roles = ["User", "Admin"];
const subscriptions = ["Free", "Basic", "Standard", "Premium"];
</script>
<template>
  <!-- profile -->
  <div class="container mx-auto min-h-screen">
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px] bg-white">
        <form @submit.prevent="updateUserProfile">
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-full">
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  v-model="(userForm as userProfileForm).name"
                  name="name"
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
            <span class="text-[#07074D]"> is Admin ?</span>

            <input
              type="checkbox"
              v-model="(userForm as userProfileForm).isAdmin"
              id="remember-me-checkbox"
              class="checkbox-item peer hidden"
            />
            <label
              for="remember-me-checkbox"
              class="relative flex w-5 h-5 bg-white peer-checked:bg-[#0093DD] rounded-md border ring-offset-2 ring-[#0093DD] duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
            ></label>
          </div>

          <div>
            <button
              class="hover:shadow-form rounded-md bg-[#0093DD] hover:bg-[#0093DD]/90 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <!--  -->
    <snackbar
      :show="snackbarval.show"
      :success="snackbarval.success"
      @update="snackbarval.show = false"
    ></snackbar>
  </div>
</template>
