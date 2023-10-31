import { createRouter, createWebHistory } from 'vue-router';
const modules = import.meta.glob('./modules/**/*.js', { eager: true });

export const routes = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routes.push(...modList);
});
const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  // window.scrollTo(0, 0);
  // if (to.path === "/login" || to.path === "/register") {
  next();
  // } else {
  //     const token = localStorage.getItem("access_token") || localStorage.getItem("refresh_token");
  //     if (token === null || token === undefined || token === "") {
  //         next("login");
  //     } else {
  //         next();
  //     }
  // }
});
export default router;
