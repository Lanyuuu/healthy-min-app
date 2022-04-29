import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueAxios from "vue-axios";
import axios from "axios";

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(VueAxios, axios)
  .use(router)
  .mount("#app");
