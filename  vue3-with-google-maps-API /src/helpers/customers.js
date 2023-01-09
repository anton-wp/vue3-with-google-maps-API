import { computed } from "vue";
import { useCustomersStore } from "@/stores";

export const header = [
  {
    key: "nameAvatar",
    label: "Name",
    class: "w-full xl:w-1/4",
  },
  {
    key: "email",
    label: "Email",
    class: "w-full xl:w-1/4",
  },
  {
    key: "phone",
    label: "Phone",
    class: "w-full xl:w-1/4",
  },
  {
    key: "jobs",
    label: "Total jobs",
    class: "w-full xl:w-1/4",
  },
];

const state = computed(() => useCustomersStore());

export const body = computed(() =>
  state.value.customers.map((item) => {
    return {
      route: { name: "Customer", params: { customerId: item.id } },
      nameAvatar: {
        label: item.full_name,
        url: item.avatar,
      },
      email: {
        label: item.email,
      },
      phone: {
        label: item.phone,
      },
      jobs: {
        label: item.jobs_count,
      },
    };
  })
);
