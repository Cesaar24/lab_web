// plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  const auth = userStore();

  // Configuramos el comportamiento global de las peticiones
  globalThis.$fetch = $fetch.create({
    onResponseError({ response }) {
      if (response.status === 401) {
        // Si el servidor dice que el token ya no sirve (usuario borrado/modificado)
        console.warn("Sesión inválida detectada. Cerrando sesión...");
        auth.logout();
      }
    },
  });
});
