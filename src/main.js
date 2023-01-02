import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "./assets/john.css";

const app = createApp(App);

app.use(router);
axios.defaults.baseURL = import.meta.env.VITE_CAT_API_URL;
axios.defaults.headers.common["x-api-key"] = import.meta.env.VITE_CAT_API_KEY;
app.use(VueAxios, axios);
app.use(Antd);
app.mount("#app");
