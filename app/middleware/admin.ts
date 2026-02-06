export default defineNuxtRouteMiddleware((to, from) => {
  const user = userStore();
  const isAdmin = user.isAdmin;
  /* console.log("admin middleware:",to.name,from)
   console.log("isAdmin:",isAdmin) */

  if (!isAdmin) {
    return showError({
      statusCode: 403, // Código de estado para "Forbidden"
      statusMessage: "Insufficient permissions.",
      fatal: true, // Indica que es un error que detiene la navegación
    });

    // return abortNavigation('Insufficient permissions.')
  }
});
