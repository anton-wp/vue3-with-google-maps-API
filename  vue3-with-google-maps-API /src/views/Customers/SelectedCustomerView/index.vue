<template>
  <div class="px-10 py-6 xl:px-12 xl:py-8">
    <template v-if="!loading">
      <Back class="mb-6 xl:mb-8" :to="{ name: 'Customers' }" />
      <div
        class="mb-6 flex w-full items-center justify-between rounded-lg bg-havelock-blue-tb p-6 xl:mb-8"
      >
        <div class="flex items-center">
          <img
            class="mr-4 h-16 w-16 rounded-full object-cover"
            :src="user.avatar"
            alt="avatar"
          />
          <span class="text-cinder-500">{{ user.full_name }}</span>
        </div>
        <div class="flex">
          <div
            class="flex w-24 flex-col items-center justify-center lg:w-32"
            v-for="(item, key) in jobTabs"
            :key="item"
          >
            <span class="text-xl font-semibold text-blue-500">
              {{ item.value }}
            </span>
            <span class="text-cinder-300">{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="flex stroke-cinder-200 text-cinder-200">
        <router-link
          class="flex items-center whitespace-nowrap border-b border-gray-200 px-4 pb-4 duration-300"
          v-for="item in tabsLink"
          :to="{ name: item.routeName }"
        >
          <component class="mr-2 h-5 w-5" :is="item.icon" />
          {{ item.label }}
        </router-link>
        <div class="w-full border-b border-gray-200"></div>
      </div>
      <router-view :user="user" @update-user="updateUser" />
    </template>
    <Loader v-else />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getCustomerById } from "@/services/api/customers.js";

import Back from "@/components/Back.vue";
import Loader from "@/components/LoaderPage.vue";
import ClipBoard from "@/components/icons/IconClipBoard.vue";
import Contact from "@/components/icons/IconContact.vue";
import Wallet from "@/components/icons/IconWallet.vue";

const loading = ref(true);

const tabsLink = [
  {
    label: "Personal Info",
    routeName: "CustomerInfo",
    icon: Contact,
  },
  {
    label: "Price",
    routeName: "CustomerPrice",
    icon: Wallet,
  },
  {
    label: "Jobs",
    routeName: "CustomerJobs",
    icon: ClipBoard,
  },
];

const user = ref({});
const jobs = ref({});
const jobTabs = computed(() => {
  return [
    {
      label: "Ordered",
      value: jobs.value.jobs_ordered_count,
    },
    {
      label: "In progress",
      value: jobs.value.jobs_in_progress_count,
    },
    {
      label: "Finished",
      value: jobs.value.jobs_finished_count,
    },
  ];
});
const updateUser = (data) => {
  user.value = { ...user.value, ...data };
};
const route = useRoute();
onMounted(async () => {
  loading.value = true;
  const { data } = await getRequest(getCustomerById(route.params.customerId));
  jobs.value = data.jobs;
  user.value = data.user;
  loading.value = false;
});
</script>

<style scoped>
.router-link-active {
  @apply border-blue-500 stroke-blue-500 text-blue-500;
}
</style>
