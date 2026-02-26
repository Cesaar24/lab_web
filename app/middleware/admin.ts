export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = userStore();
  let adminServer = true;
  try {
    const response = (await $fetch("/api/user_mysql/getRoleUser", {
      credentials: "include", // Asegura que las cookies se envíen con la solicitud
    })) as { success: boolean; role: string | null };

    if (response.success) {
      adminServer = response.role === "Admin";
    } else {
      adminServer = false;
    }

    const isAdmin = adminServer && user.isAdmin;

    if (!isAdmin) {
      return showError({
        statusCode: 403, // Código de estado para "Forbidden"
        statusMessage: "Insufficient permissions.",
      });
    }
  } catch (error) {
    console.error("Error al verificar el rol de usuario:", error);
    return showError({
      statusCode: 403,
      statusMessage: "Insufficient permissions",
    });
  }
});
