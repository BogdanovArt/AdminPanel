import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/pages/Home/index.vue";
import { guards } from "./guards";

import { RouteNames, Routes } from "@/router/enums";

Vue.use(VueRouter);

const routes = [
  {
    path: Routes.HOME,
    name: RouteNames.HOME,
    component: Home
  },
  {
    path: Routes.LOGIN,
    name: RouteNames.LOGIN,
    meta: { layout: "no-layout" },
    component: () => import(
      /* webpackChunkName: "login" */
      "@/components/pages/Auth.vue"
    ),
  },
  {
    path: "*",
    name: RouteNames.CONTENT_DYN,    
    component: () => import(
      /* webpackChunkName: "Dynamic" */
      "@/components/pages/DynamicPage.vue"
    ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(guards);

export default router;
