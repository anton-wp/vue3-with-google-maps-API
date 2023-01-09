import { roofPages } from "@/router/helpers/roof-pages.js";

import SearchBlock from "@/layouts/default/components/SearchBlock.vue";

export default [
  {
    path: "/",
    meta: {
      auth: true,
    },
    component: () => import("../views/Jobs/index.vue"),
    children: [
      {
        path: "/",
        name: "Jobs",
        meta: {
          slots: [
            {
              id: "Jobs",
              name: "header",
              component: SearchBlock,
            },
          ],
        },
        component: () => import("../views/Jobs/JobsView/index.vue"),
      },
      {
        path: "/jobs/:jobId",
        name: "SelectedJob",
        component: () => import("../views/Jobs/SelectedJobView/index.vue"),
      },
      {
        path: "/jobs/:jobId/edit",
        name: "SelectedEditJob",
        component: () =>
          import("../views/Jobs/SelectedJobView/SelectedJobEditView.vue"),
      },
      {
        path: "/jobs/:jobId/edit-map",
        name: "SelectedEditMapJob",
        redirect: () => {
          return { name: "EditMap-Field" };
        },
        component: () =>
          import("../views/Jobs/SelectedJobView/SelectedJobEditMapView.vue"),
        children: [
          ...roofPages.map((item) => {
            return {
              path: `/jobs/:jobId/edit-map/${item
                .replace(/([a-z])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              name: `EditMap-${item}`,
              component: () =>
                import(
                  `../views/Calculator/CalculatorStep-3/views/CalculatorStep-3${item}View.vue`
                ),
            };
          }),
        ],
      },
    ],
  },
];
