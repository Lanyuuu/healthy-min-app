import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from '../views/Home.vue'
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

import UserEdit from "../views/UserEdit.vue";
import UserList from "../views/UserList.vue";

import RankEdit from "../views/RankEdit.vue";
import RankList from "../views/RankList.vue";

import FoodEdit from "../views/FoodEdit.vue";
import FoodList from "../views/FoodList.vue";

import SportEdit from "../views/SportEdit.vue";
import SportList from "../views/SportList.vue";

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
      { path: "/users/create", component: UserEdit },
      { path: "/users/list", component: UserList },
      {
        path: "/users/edit/:id",
        component: UserEdit,
        props: true,
      },

      { path: "/ranks/create", component: RankEdit },
      { path: "/ranks/list", component: RankList },
      { path: "/ranks/edit/:id", component: RankEdit, props: true },

      { path: "/foods/create", component: FoodEdit },
      { path: "/foods/list", component: FoodList },
      { path: "/foods/edit/:id", component: FoodEdit, props: true },

      { path: "/sports/create", component: SportEdit },
      { path: "/sports/list", component: SportList },
      { path: "/sports/edit/:id", component: SportEdit, props: true },

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

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
