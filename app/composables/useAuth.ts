export const useAuth = () => {
  const login = async (user: UserInput) => {
    try {
      const data = await $fetch("/api/user/login", {
        method: "POST",
        body: user,
      });

      const userState = userStore();
      userState.setUser(data);
      navigateTo("/dashboard");
      /*  return data */
    } catch (err: any) {
      console.log("err:", err.message);
      throw err;
    }
  };
  const logout = async () => {
    try {
      await $fetch("/api/user/logout");
      const userState = userStore();
      userState.logout();
      return navigateTo("/login");
      /*  return data */
    } catch (err: any) {
      throw err;
    }
  };
  const register = async (user: UserRegisterForm) => {
    try {
      const data = await $fetch("/api/user/register", {
        method: "POST",
        body: user,
      });
      const userState = userStore();
      userState.setUser(data.user);
      navigateTo("/dashboard");
      /*  return data */
    } catch (err: any) {
      throw err;
    }
  };

  const registerGoogle = async (token: any) => {
    try {
      const data = (await $fetch("/api/user/registergoogle", {
        method: "POST",
        body: token,
      })) as any;
      /* console.log("Data:",data) */
      if (data) {
        const userState = userStore();
        userState.setUser(data.user);
        navigateTo("/dashboard");
      }

      /*  return data */
    } catch (err: any) {
      throw err;
    }
  };
  const authenticate = async () => {
    const userState = userStore();
    if (!userState.$state.user.credentials.logged) {
      const data = await $fetch("/api/user/token", {
        headers: useRequestHeaders(["cookie"]),
      });

      if (data.user) {
        userState.setUser(data.user);
      }
    }
  };
  //update user
  const updateUser = async (user: userProfileForm) => {
    try {
      const data = await $fetch("/api/user/update", {
        method: "POST",
        body: user,
      });
      // console.log("data:", data);
      const userState = userStore();
      userState.setUser(data.user);

      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    register,
    authenticate,
    logout,
    registerGoogle,
    updateUser,
  };
};
