import { useAuthStore } from "@/stores";

export const role = (router) => {
  router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const roles = to.meta.roles;
    const role = auth.user ? auth.user.user.role : null;
    const isVerified = auth.user ? auth.user.user.email_verified_at : null;

    if (!role) next();
    else if (!to.meta.noVerified && !isVerified) next("/profile");
    else if (!roles || roles.includes(role)) next();
    else next("/404");
  });
};
