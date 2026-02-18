export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = userStore();
  const isAuthenticate = user.$state.user.credentials.logged;

  /* Verificar estado del token/bd */
  if (isAuthenticate) {
    try {
      // Llamamos a un endpoint de tu backend que consulte MySQL
      await $fetch("/api/user_mysql/me");
    } catch (error) {
      // Si falla (usuario borrado/bloqueado)
      // ya se encargará del logout, pero aquí podemos reforzarlo:
      return navigateTo("/login");
    }
  }

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
