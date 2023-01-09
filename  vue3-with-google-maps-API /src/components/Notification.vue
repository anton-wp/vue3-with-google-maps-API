<template>
  <router-link class="flex" :to="types[props.item.data.type].link">
    <div :class="sizes[size].img">
      <div
        class="flex h-12 w-12 items-center justify-center rounded"
        :class="[type.class]"
      >
        <component :is="type.icon" />
      </div>
    </div>
    <div class="w-full">
      <div class="mb-2 flex w-full items-center justify-between">
        <span :class="sizes[size].title">{{ item.data.title }}</span>
        <span class="ml-2 whitespace-nowrap text-sm text-cinder-200">
          {{ timeSince(item.created_at) }}
        </span>
      </div>
      <span class="text-sm text-cinder-400">
        {{ item.data.message }}
      </span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { timeSince } from "@/helpers/dateTime.js";
import { role } from "@/helpers/role.js";

import IconAddUser from "@/components/icons/IconAddUser.vue";
import IconContact from "@/components/icons/IconContact.vue";
import IconChangeMessage from "@/components/icons/IconChangeMessage.vue";
import IconChangeJobs from "@/components/icons/IconChangeJobs.vue";
import IconList from "@/components/icons/IconList.vue";

const props = defineProps({
  item: Object,
  size: {
    types: String,
    default: "md",
  },
});
const type = computed(() => {
  if (props.item.data.type) return types[props.item.data.type];
  return types.default;
});

const sizes = {
  sm: {
    title: "font-normal",
    img: "mr-2",
  },
  md: {
    title: "font-semibold",
    img: "mr-4",
  },
};

const types = {
  default: {
    class: "bg-cream-can-50 stroke-cream-can-500",
    icon: IconList,
    link: { name: "Jobs" },
  },
  "new-customer-registered": {
    class: "bg-pastel-green-50 stroke-pastel-green-500",
    icon: IconAddUser,
    link: {
      name: "CustomerInfo",
      params: { customerId: props.item.data.user.id },
    },
  },
  "customer-changed-email": {
    class: "bg-cream-can-50 stroke-cream-can-500",
    icon: IconChangeMessage,
    link: {
      name: "CustomerInfo",
      params: { customerId: props.item.data.user.id },
    },
  },
  "personal-info-has-been-changed": {
    class: "bg-blue-50 stroke-blue-500",
    icon: IconContact,
    link: { name: "Profile" },
  },
  "job-status-has-been-changed": {
    class: "bg-cream-can-50 stroke-cream-can-500",
    icon: IconChangeJobs,
    link: { name: "SelectedJob", params: { jobId: props.item.data.job_id } },
  },
  "customers-material-prices-have-been-changed": {
    class: "bg-cream-can-50 stroke-cream-can-500",
    icon: IconList,
    link:
      role.value === "admin"
        ? {
            name: "CustomerPrice",
            params: { customerId: props.item.data.user.id },
          }
        : { name: "MyPrice" },
  },
};
</script>
