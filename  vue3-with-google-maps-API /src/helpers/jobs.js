import { computed } from "vue";
import { listStatuses } from "@/helpers/statuses.js";
import { role } from "@/helpers/role.js";
import { useJobsStore } from "@/stores";
import { DateTime } from "luxon";

const headers = {
  customer: [
    {
      key: "number",
      label: "Number",
      class: "order-3 xl:order-1 w-full xl:w-1/12",
    },
    {
      key: "name",
      label: "Name title",
      class: "order-4 xl:order-2 w-full xl:w-2/12",
    },
    {
      key: "address",
      label: "Address",
      class: "order-5 xl:order-3 w-full xl:w-2/12",
    },
    {
      key: "date",
      label: "Created",
      class: "order-6 xl:order-4 w-full xl:w-2/12",
    },
    {
      key: "material",
      label: "Material",
      class: "order-7 xl:order-5 w-full xl:w-1/12",
    },
    {
      key: "roofType",
      label: "Roof type",
      class: "order-8 xl:order-6 w-full xl:w-2/12",
    },
    {
      key: "status",
      label: "",
      class: "mb-6 xl:mb-0 order-1 xl:order-7 w-1/2 xl:w-[15%]",
    },
    {
      key: "buttons",
      label: "",
      class: "flex justify-end mb-6 xl:mb-0 order-2 xl:order-8 w-1/2 xl:w-[3%]",
    },
  ],
  admin: [
    {
      key: "number",
      label: "Number",
      class: "order-3 xl:order-1 w-full xl:w-1/12",
    },
    {
      key: "name",
      label: "Name title",
      class: "order-4 xl:order-2 w-full xl:w-1/12",
    },
    {
      key: "customer",
      label: "Сustomer name",
      class: "order-5 xl:order-3 w-full xl:w-2/12",
    },
    {
      key: "address",
      label: "Address",
      class: "order-6 xl:order-4 w-full xl:w-2/12",
    },
    {
      key: "date",
      label: "Created",
      class: "order-7 xl:order-5 w-full xl:w-1/12",
    },
    {
      key: "material",
      label: "Material",
      class: "order-8 xl:order-6 w-full xl:w-1/12",
    },
    {
      key: "roofType",
      label: "Roof type",
      class: "order-9 xl:order-7 w-full xl:w-2/12",
    },
    {
      key: "status",
      label: "",
      class: "mb-6 xl:mb-0 order-1 xl:order-8 w-1/2 xl:w-[15%]",
    },
    {
      key: "buttons",
      label: "",
      class: "flex justify-end mb-6 xl:mb-0 order-2 xl:order-9 w-1/2 xl:w-[3%]",
    },
  ],
};

const jobsState = computed(() => useJobsStore());

export const header = computed(() => {
  return headers[role.value];
});

const rows = (item) => {
  if (role.value === "admin")
    return {
      customer: {
        label: item.user.full_name,
      },
    };
  else return {};
};
export const body = computed(() =>
  jobsState.value.jobs.map((item) => {
    return {
      id: item.id,
      route: { name: "SelectedJob", params: { jobId: item.id } },
      number: {
        label: `№${item.id}`,
      },
      name: {
        label: item.name || "--/--",
      },
      address: {
        label: item.address,
      },
      date: {
        label: DateTime.fromISO(item.created_at).toFormat("dd/MM/yy"),
      },
      material: {
        label: item.material.name,
      },
      roofType: {
        label: item.roof_type.name,
      },
      status: {
        type: item.status,
      },
      ...rows(item),
    };
  })
);

export const selects = ["period", "status"];

export const options = computed(() => {
  return {
    customer: jobsState.value.customers,
    status: listStatuses.value,
    period: [
      {
        value: null,
        label: "All periods",
      },
      {
        value: "year",
        label: "Year",
      },
      {
        value: "month",
        label: "Month",
      },
      {
        value: "week",
        label: "Week",
      },
    ],
  };
});
