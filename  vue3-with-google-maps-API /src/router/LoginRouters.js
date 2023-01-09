import Login from "@/layouts/login/index.vue";
import SingInFooterBlock from "@/components/Login/SingInFooterBlock.vue";
import SingUpFooterBlock from "@/components/Login/SingUpFooterBlock.vue";

export default [
  {
    path: "/login",
    name: "Login",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingInFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/RegisterView.vue"),
  },
  {
    path: "/confirm-email",
    name: "ConfirmEmail",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/ConfirmEmailView.vue"),
  },
  {
    path: "/password-recovery",
    name: "PasswordRecovery",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/PasswordRecoveryView.vue"),
  },
  {
    path: "/password-recovery-check-email",
    name: "PasswordRecoveryCheckEmail",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () =>
      import("../views/Login/PasswordRecoveryCheckEmailView.vue"),
  },
  {
    path: "/password-recovery-code",
    name: "PasswordRecoveryCode",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/PasswordRecoveryCodeView.vue"),
  },
  {
    path: "/password-recovery-password",
    name: "PasswordRecoveryPassword",
    meta: {
      noAuth: true,
      layout: Login,
      slots: [
        {
          name: "button",
          component: SingUpFooterBlock,
        },
      ],
    },
    component: () => import("../views/Login/PasswordRecoveryPasswordView.vue"),
  },
];
