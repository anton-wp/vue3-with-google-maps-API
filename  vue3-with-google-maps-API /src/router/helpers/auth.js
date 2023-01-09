import { useAuthStore } from "@/stores";
import { verifyEmail, loginByIdAndHash } from "@/services/api/login.js";
// import { getRequest } from "@/helpers/wrapsForRequests.js";

export const routeVerifyEmail = (router) => {
  router.beforeEach(async (to, from, next) => {
    if (to.path === "/" && to.query.hash && to.query.id) {
      const auth = useAuthStore();
      auth.deleteUser();
      auth.toggleLoaderVerification(true);
      const res = await verifyEmail(to.query.hash, to.query.id);
      if (
        !!res.data.message &&
        res.data.message === "Your email is already verified"
      ) {
        auth.toggleLoaderVerification(false);
        next("/login");
        return;
      }
      auth.login(res.data);
      auth.toggleLoaderVerification(false);
      next("/my-price");
    } else if (to.path === "/google/login" && to.query.hash && to.query.id) {
      const auth = useAuthStore();
      auth.toggleLoaderVerification(true);
      const res = await loginByIdAndHash(to.query.hash, to.query.id);
      auth.login(res.data);
      auth.toggleLoaderVerification(false);
      next("/");
    } else next();
  });
};
export const auth = (router) => {
  router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some((record) => record.meta.auth);
    const requireNoAuth = to.matched.some((record) => record.meta.noAuth);
    const auth = useAuthStore();
    if (requireAuth && !auth.user) {
      next("/login");
    } else if (requireNoAuth && auth.user) {
      next("/");
    } else {
      next();
    }
  });
};
