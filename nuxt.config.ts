// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    // Will be available in both server and client
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRES,
    clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
  },
});
