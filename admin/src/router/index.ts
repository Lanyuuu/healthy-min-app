import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from '../views/Home.vue'
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";

import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";

import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/list", component: CategoryList },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true,
      },

      { path: "/item/create", component: ItemEdit },
      { path: "/item/list", component: ItemList },
      { path: "/item/edit/:id", component: ItemEdit, props: true },

      { path: "/heroes/create", component: HeroEdit },
      { path: "/heroes/list", component: HeroList },
      { path: "/heroes/edit/:id", component: HeroEdit, props: true },

      { path: "/articles/create", component: ArticleEdit },
      { path: "/articles/list", component: ArticleList },
      { path: "/articles/edit/:id", component: ArticleEdit, props: true },

      { path: "/ads/create", component: AdEdit },
      { path: "/ads/list", component: AdList },
      { path: "/ads/edit/:id", component: AdEdit, props: true },

      { path: "/admin_users/create", component: AdminUserEdit },
      { path: "/admin_users/list", component: AdminUserList },
      { path: "/admin_users/edit/:id", component: AdminUserEdit, props: true },
    ],
  },
  { path: "/login", name: "Login", component: Login, meta: { isPublic: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
