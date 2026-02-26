import { defineStore } from "pinia";
export const userStore = defineStore("userStore", {
  state: () => ({
    user: {
      credentials: {
        logged: false,
        ip: null as String | null,
        infoConnection: {},
      },
      profile: {} as userProfileForm | {},
    },
    accessToken: null as string | null,
    blocked: false,
  }),
  actions: {
    setUser(userToken: userProfileForm, token: string) {
      this.user.profile = { ...userToken };
      this.user.credentials.logged = true;
      this.accessToken = token;
    },
    setCredentials(info: object) {
      if (typeof info === "object" && info !== null) {
        this.user.credentials.infoConnection = info;
        this.user.credentials.ip = (info as Record<string, any>).query;
      }
    },
    logout() {
      this.user.profile = {};
      this.user.credentials.logged = false;
      this.accessToken = null;
    },
  },
  getters: {
    getUserProfile(state) {
      return state.user.profile;
    },
    getUserConnection(state) {
      return state.user.credentials.infoConnection;
    },
    getIp(state) {
      return state.user.credentials.ip;
    },
    isAdmin(state) {
      return (state.user.profile as User).role === "Admin";
    },
  },
});
