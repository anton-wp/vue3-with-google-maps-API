import axios from "axios";
import { useAuthStore } from "@/stores";
import router from "@/router/index.js";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const setup = () => {
  axios.interceptors.request.use(
    (config) => {
      const user = useAuthStore().user;
      if (user && user.access_token) {
        config.headers["Authorization"] = "Bearer " + user.access_token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.response.status === 401) {
        useAuthStore().deleteUser();
      }
      if ([403, 404, 500].includes(error.response.status)) {
        router.push({ name: "404" });
      }
      return Promise.reject(error);
    }
  );
};
export default setup;
