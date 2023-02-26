import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/fontLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/indexView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/productsView.vue"),
        },
        {
          path: "carts",
          component: () => import("../views/cartsView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/loginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/admin/adminLayout.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/productsView.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/ordersView.vue"),
        }
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: {
        name: "home",
      },
    },
  ],
});

export default router;
