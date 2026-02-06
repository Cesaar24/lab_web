import { defineStore } from "pinia";
export const userStore = defineStore("userStore", {
  state: () => ({
    user: {
      credentials: {
        logged: false,
        ip: null as String | null,
        infoConnection: {},
      },
      profile: {} as User | {},
    },
  }),
  actions: {
    setUser(userToken: User) {
      this.user.profile = { ...userToken };
      this.user.credentials.logged = true;
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
