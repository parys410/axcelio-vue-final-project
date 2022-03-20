import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { store } from "./store/store";
import "./assets/css/index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};

const app = createApp(App);
app.use(router, axios, VueAxios, store);
app.use(Toast, options);
app.mount("#app");
