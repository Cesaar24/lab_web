export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp();
  // Forzamos al middleware a esperar la respuesta del servidor

  const dato = await $auth.ready;
  const user = userStore();
  const isAuthenticate = user.$state.user.credentials.logged;
  const token = user.$state.accessToken;

  if (!isAuthenticate && to.name !== "login") {
    if (to.name === "register") {
      return;
    }
    return navigateTo("/login");
  }
  if (
    isAuthenticate &&
    (to.name === "login" || to.name === "index" || to.name === "register")
  ) {
    return navigateTo("/dashboard");
  }
});
