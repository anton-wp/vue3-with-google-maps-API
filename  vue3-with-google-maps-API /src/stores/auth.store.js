import { defineStore } from "pinia";
import router from "@/router/index.js";
import { logout } from "@/services/api/login.js";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const useAuthStore = defineStore({
  id: "auth",
  state: function () {
    return {
      user: cookies.get("user") || JSON.parse(localStorage.getItem("user")),
      returnUrl: null,
      isLoaderVerification: false,
    };
  },
  getters: {
    userInfo: (state) => (state.user ? state.user.user : null),
  },
  actions: {
    login(user, isRemember) {
      this.user = user;
      if (isRemember) {
        cookies.set("user", JSON.stringify(user));
      }
      localStorage.setItem("user", JSON.stringify(user));
      if (!user.user.email_verified_at) {
        router.push({ name: "Profile" });
        return;
      }
      router.push(this.returnUrl || "/");
    },
    async logout() {
      await logout();
      this.deleteUser();
    },
    deleteUser() {
      this.user = null;
      localStorage.removeItem("user");
      cookies.remove("user");
      router.push("/login");
    },
    toggleLoaderVerification(val) {
      this.isLoaderVerification = val;
    },
    updateUser(user) {
      const newUser = { ...this.user, user };
      this.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
      if (cookies.get("user")) {
        cookies.set("user", JSON.stringify(newUser));
      }
    },
  },
});
