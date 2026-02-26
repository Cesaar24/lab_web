/* export default defineNuxtPlugin(async (nuxtApp) => {
  const { authenticate } = useAuth();
  nuxtApp.hook("app:mounted", async () => {
    console.log("modulos cargados");
    try {
      const response = await authenticate();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });
}); */

// app/plugins/auth.ts
export default defineNuxtPlugin((nuxtApp) => {
  const { authenticate } = useAuth();
  const userState = userStore();
  const { csrf } = useCsrf();

  const authPromise = (async () => {
    if (!csrf) {
      // Pequeña espera para asegurar que el módulo csurf se hidrató
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    try {
      await authenticate();
      /* const data = (await $fetch("/api/user_mysql/getUserToken", {
        method: "POST",
        headers: {
          "csrf-token": csrf,
        },
      })) as { success: boolean; user: userProfileForm; token: string };
      if (data.success) {
        userState.setUser(data.user, data.token);
      } */
      return true;
    } catch (err) {
      console.error("Error en authenticate:", err);
      return false;
    }
  })();

  return {
    provide: {
      auth: {
        ready: authPromise, // Esto es lo que el middleware esperará
      },
    },
  };
});
