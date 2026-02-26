// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-security",
    "nuxt-csurf",
  ],

  devServer: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },

  security: {
    headers: false,
  },
  csurf: {
    https: process.env.NODE_ENV === "production", // Cambiar a true si usas HTTPS en LAN
    cookieKey: "csrf_token",
    methodsToProtect: ["POST", "PUT", "PATCH", "DELETE"], // Métodos que requieren el token
  },

  runtimeConfig: {
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRES,
    clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
    databaseHost: process.env.DATABASE_HOST,
  },

  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        "access-control-allow-origin": "localhost:3000",
        "access-control-allow-credentials": "true",
        "access-control-allow-methods": "GET,POST,PUT,DELETE",
        "access-control-allow-headers": "Content-Type, Authorization",
      },
    },
  },
});
