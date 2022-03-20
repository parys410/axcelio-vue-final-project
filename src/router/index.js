import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import BootcampPage from "../pages/BootcampPage.vue";
import Page404 from "../pages/Page404.vue";
import BlogPage from "../pages/BlogPage.vue";
import DetailBootcamp from "../pages/DetailBootcamp.vue";
import DetailProgram from "../pages/DetailProgram.vue";
import DetailBlog from "../pages/DetailBlogPage.vue";

const routes = [
  {
    path: "/main",
    name: "Main",
    component: () => import("../layouts/MainLayout.vue"),
    redirect: { name: "Homepage" },
    children: [
      {
        path: "/",
        name: "Homepage",
        component: HomePage,
      },
      {
        path: "/bootcamp",
        name: "BootcampPage",
        component: BootcampPage,
      },
      {
        path: "/blog",
        name: "BlogPage",
        component: BlogPage,
      },
      {
        path: "/bootcamp/:slug",
        name: "DetailBootcamp",
        component: DetailBootcamp,
      },
      {
        path: "/program/:slug",
        name: "DetailProgram",
        component: DetailProgram,
      },
      {
        path: "/blog/:slug",
        name: "DetailBlog",
        component: DetailBlog,
      },
      { path: "/:pathMatch(.*)*", name: "Page404", component: Page404 },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
});

export default router;
