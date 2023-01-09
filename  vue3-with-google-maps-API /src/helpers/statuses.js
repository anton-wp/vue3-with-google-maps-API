import { computed } from "vue";
import { role } from "@/helpers/role.js";
import { useAuthStore } from "@/stores";

export const typesLines = {
  new: "bg-havelock-blue-500",
  ordered: "bg-havelock-blue-500",
  in_progress: "bg-cream-can-500",
  draft: "bg-cinder-200",
  finished: "bg-pastel-green-500",
};
export const typesBadges = {
  new: "bg-havelock-blue-50 text-havelock-blue-500",
  ordered: "bg-havelock-blue-50 text-havelock-blue-500",
  in_progress: "bg-cream-can-50 text-cream-can-500",
  draft: "bg-cinder-50 text-cinder-300",
  finished: "bg-pastel-green-50 text-pastel-green-500",
};
export const listStatusesCustomer = [
  {
    value: null,
    label: "All statuses",
  },
  {
    value: "ordered",
    label: "Ordered",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "finished",
    label: "Finished",
  },
];
export const listStatusesAdmin = [
  {
    value: null,
    label: "All statuses",
  },
  {
    value: "ordered",
    label: "New",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "finished",
    label: "Finished",
  },
];

const user = computed(() => useAuthStore().user);

export const listStatuses = computed(() => {
  if (role.value === "admin") return listStatusesAdmin;
  return listStatusesCustomer;
});

export const status = (val) => {
  const arrStatus = listStatuses.value;
  return arrStatus.find((item) => item.value === val);
};
