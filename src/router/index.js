import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import layout from "../components/Layout";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: layout,
    redirect: "/home/homeIndex",
    children: [
      {
        path: "homeIndex",
        name: "homeIndex",
        component: () => import("@/views/home/index"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
