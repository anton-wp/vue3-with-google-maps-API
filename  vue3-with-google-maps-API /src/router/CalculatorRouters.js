import { roofPages } from "@/router/helpers/roof-pages.js";

export default [
  {
    path: "/calculator/step-1",
    meta: {
      auth: true,
      roles: ["customer"],
    },
    component: () => import("../views/Calculator/index.vue"),
    children: [
      {
        path: "/calculator/how-it-works",
        name: "CalculatorHowItWorks",
        component: () =>
          import("../views/Calculator/CalculatorHowItWorksView.vue"),
      },
      {
        path: "/calculator/step-1",
        name: "CalculatorStep-1",
        component: () => import("../views/Calculator/CalculatorStep-1View.vue"),
      },
      {
        path: "/calculator/step-2/:jobId",
        name: "CalculatorStep-2",
        component: () => import("../views/Calculator/CalculatorStep-2View.vue"),
      },
      {
        path: "/calculator/step-3/:jobId",
        name: "CalculatorStep-3",
        redirect: () => {
          return { name: "CalculatorStep-3Field" };
        },
        component: () =>
          import("../views/Calculator/CalculatorStep-3/views/index.vue"),
        children: [
          ...roofPages.map((item) => {
            return {
              path: `/calculator/step-3/:jobId/${item
                .replace(/([a-z])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              name: `CalculatorStep-3${item}`,
              component: () =>
                import(
                  `../views/Calculator/CalculatorStep-3/views/CalculatorStep-3${item}View.vue`
                ),
            };
          }),
        ],
      },
      {
        path: "/calculator/step-4/:jobId",
        name: "CalculatorStep-4",
        component: () => import("../views/Calculator/CalculatorStep-4View.vue"),
      },
    ],
  },
];
