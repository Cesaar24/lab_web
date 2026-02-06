<script setup lang="ts">
const { updateUser } = useAuth();

definePageMeta({
  layout: "dash",
  /* middleware: "auth", */
});
const userState = userStore();
const snackbar = ref(false);
const text = ref("");

// user profile form <User>
const userForm = <userProfileForm | {}>ref({});

const state = ref({
  ...userForm,
});

// mounted
onMounted(() => {
  /* console.log(userState); */

  if (userState.user.credentials.logged) {
    const { password, ..._user } = userState.getUserProfile as User;
    //@ts-ignore
    userForm.value = _user;
    /* userForm = _user as userProfileForm;

    // add subscription if not exist
    if (!(userForm as userProfileForm).subscription) {
      (userForm as userProfileForm).subscription = "Free";
    } */
  }
});

// update user profile
const updateUserProfile = async () => {
  //@ts-ignore
  const _user: userProfileForm = userForm.value as userProfileForm;

  const newData: userProfileForm = {
    id: _user.id,
    name: _user.name,
    lastName: _user.lastName,
    username: _user.username,
    email: _user.email,
    role: _user.role,
    subscription: _user.subscription,
  };
  await updateUser(newData)
    .then((response) => {
      // console.log(response);
      snackbar.value = true;
      text.value = "User updated successfully";
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      text.value = error.statusMessage;
    });
};

const roles = ["User", "Admin"];
const subscriptions = ["Free", "Basic", "Standard", "Premium"];
</script>
<template>
  <!-- profile -->

  <div class="flex items-center justify-center p-12">
    <!-- Author: FormBold Team -->
    <div class="mx-auto w-full max-w-[550px] bg-white">
      <form>
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="fName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                First Name
              </label>
              <input
                type="text"
                v-model="(userForm as userProfileForm).name"
                name="fName"
                id="fName"
                placeholder="First Name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="lName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Last Name
              </label>
              <input
                type="text"
                v-model="(userForm as userProfileForm).lastName"
                name="lName"
                id="lName"
                placeholder="Last Name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div class="mb-5">
          <label
            for="guest"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Role
          </label>
          <input
            type="text"
            v-model="(userForm as userProfileForm).role"
            name="guest"
            id="guest"
            min="0"
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="date"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="time"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div class="mb-5">
          <label class="mb-3 block text-base font-medium text-[#07074D]">
            Are you coming to the event?
          </label>
          <div class="flex items-center space-x-6">
            <div class="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton1"
                class="h-5 w-5"
              />
              <label
                for="radioButton1"
                class="pl-3 text-base font-medium text-[#07074D]"
              >
                Yes
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton2"
                class="h-5 w-5"
              />
              <label
                for="radioButton2"
                class="pl-3 text-base font-medium text-[#07074D]"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            @click="updateUserProfile"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- <v-container class="profile h-screen mt-4">
    <v-form>
      <v-text-field
        v-model="(userForm as userProfileForm).name"
        :counter="10"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="(userForm as userProfileForm).lastName"
        label="lastName"
        required
      ></v-text-field>
      <v-text-field
        v-model="(userForm as userProfileForm).username"
        label="username"
        required
      ></v-text-field>
      <v-text-field
        v-model="(userForm as userProfileForm).email"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="(userForm as userProfileForm).role"
        :items="roles"
        label="Role"
        required
      ></v-select>
      <v-select
        v-model="(userForm as userProfileForm).subscription"
        :items="subscriptions"
        label="Subscriptions"
        required
      ></v-select>

      <v-btn
        class="me-4"
        variant="elevated"
        color="primary"
        @click="updateUserProfile"
      >
        submit
      </v-btn>
      <v-btn> clear </v-btn>
    </v-form>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar> -->
</template>
