import SearchBlock from "@/layouts/default/components/SearchBlock.vue";

export default [
  {
    path: "/customers",
    meta: {
      auth: true,
      roles: ["admin"],
    },
    component: () => import("../views/Customers/index.vue"),
    children: [
      {
        path: "/customers",
        name: "Customers",
        meta: {
          slots: [
            {
              id: "Customers",
              name: "header",
              component: SearchBlock,
            },
          ],
        },
        component: () => import("../views/Customers/CustomersView/index.vue"),
      },
      {
        path: "/customer/:customerId",
        name: "Customer",
        redirect: () => {
          return { name: "CustomerInfo" };
        },
        component: () =>
          import("../views/Customers/SelectedCustomerView/index.vue"),
        children: [
          {
            path: "/customer/:customerId/info",
            name: "CustomerInfo",
            component: () =>
              import(
                "../views/Customers/SelectedCustomerView/SelectedCustomerInfoView.vue"
              ),
          },
          {
            path: "/customer/:customerId/price",
            name: "CustomerPrice",
            props: {
              smallTitle: true,
            },
            component: () => import("../views/MyPriceView/index.vue"),
          },
          {
            path: "/customer/:customerId/jobs",
            name: "CustomerJobs",
            meta: {
              slots: [
                {
                  id: "Jobs",
                  name: "header",
                  component: SearchBlock,
                },
              ],
            },
            component: () =>
              import(
                "../views/Customers/SelectedCustomerView/SelectedCustomerJobsView.vue"
              ),
          },
        ],
      },
    ],
  },
];
