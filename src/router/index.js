import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomePage.vue";
import SingleCatPage from "../views/SingleCatPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:image_id ",
      name: "details",
      component: SingleCatPage,
    },
  ],
});

export default router;
