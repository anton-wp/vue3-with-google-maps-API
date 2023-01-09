import { createApp } from "vue";
import { createPinia } from "pinia";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "./router";

import setupInterceptors from "@/services/setupInterceptors.js";
import vClickOutside from "click-outside-vue3";

import "./index.css";

const app = createApp(App);

setupInterceptors();
app.use(vClickOutside);
app.use(createPinia());
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["visualization", "places", "drawing", "geometry"],
  },
});

app.mount("#app");
