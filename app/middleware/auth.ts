export default defineNuxtRouteMiddleware((to, from) => {
  /* console.log("auth middleware:",to.name) */
  const user = userStore();
  const isAuthenticate = user.$state.user.credentials.logged;
  /* console.log("user:", isAuthenticate); */

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
