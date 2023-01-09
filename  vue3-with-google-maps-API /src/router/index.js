import { createRouter, createWebHistory } from "vue-router";
import { routeVerifyEmail, auth } from "@/router/helpers/auth.js";
import { role } from "@/router/helpers/role.js";

import None from "@/layouts/none.vue";

import LoginRouters from "./LoginRouters.js";
import CalculatorRouters from "./CalculatorRouters.js";
import JobsRouters from "./JobsRouters.js";
import CustomersRouters from "./CustomersRouters.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...LoginRouters,
    ...CalculatorRouters,
    ...JobsRouters,
    ...CustomersRouters,
    {
      path: "/my-price",
      name: "MyPrice",
      meta: {
        auth: true,
      },
      component: () => import("../views/MyPriceView/index.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      meta: {
        auth: true,
        noVerified: true,
      },
      component: () => import("../views/ProfileView/index.vue"),
    },
    {
      path: "/contact",
      name: "ContactUs",
      meta: {
        auth: true,
        roles: ["customer"],
      },
      component: () => import("../views/ContactUsView.vue"),
    },
    {
      path: "/notifications",
      name: "Notifications",
      meta: {
        auth: true,
      },
      component: () => import("../views/NotificationsView.vue"),
    },
    {
      path: "/contact-info",
      name: "ContactInfo",
      meta: {
        auth: true,
        roles: ["admin"],
      },
      component: () => import("../views/ContactInfoView/index.vue"),
    },

    // {
    //   path: "/faq",
    //   name: "FAQ",
    //   meta: {
    //     auth: true,
    //   },
    //   component: () => import("../views/FAQView.vue"),
    // },
    // {
    //   path: "/privacy-policy",
    //   name: "PrivacyPolicy",
    //   meta: {
    //     auth: true,
    //   },
    //   component: () => import("../views/PrivacyPolicyView.vue"),
    // },
    {
      path: "/:catchAll(.*)",
      meta: {
        layout: None,
      },
      component: () => import("../views/404View.vue"),
    },
    {
      path: "/404",
      name: "404",
      meta: {
        layout: None,
      },
      component: () => import("../views/404View.vue"),
    },
  ],
});
routeVerifyEmail(router);
auth(router);
role(router);

export default router;
