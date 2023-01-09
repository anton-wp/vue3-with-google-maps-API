<template>
  <div
    ref="container"
    class="container-dashboard-page overflow-y-auto"
    style="height: calc(100vh - 9rem)"
    @scroll="changePosition"
  >
    <div class="flex flex-wrap items-center">
      <h1 class="h1 mb-6 lg:mb-12">Notification</h1>
    </div>
    <Loader v-if="loader" />
    <template v-else-if="arrNotif.length > 0">
      <div
        v-for="(item, key) in arrNotif"
        :key="item.id"
        :id="item.id"
        :ref="(el) => generateRef(el, item.id)"
      >
        <Notification
          class="mb-4 rounded-lg border p-4 text-cinder-500"
          :class="{
            'border-blue-300 bg-havelock-blue-tb': !item.read_at,
            'border-cinder-50': item.read_at,
          }"
          :item="item"
        />
      </div>

      <div class="mt-8 flex w-full flex-wrap items-center justify-between">
        <JobsPerPage
          class="order-2 mt-2 h-9 items-center lg:order-1 lg:mt-0"
          :modelValue="filter.paginate"
          @update:modelValue="changeFilter('paginate', $event)"
        />
        <Pagination
          class="order-1 w-full items-center justify-between lg:order-2 lg:w-auto"
          :modelValue="meta.current_page"
          :pages="meta.last_page"
          @update:modelValue="changeFilter('page', $event)"
        />
      </div>
    </template>
    <EmptyNotification v-else style="min-height: calc(100vh - 20rem)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getNotificationsList } from "@/services/api/notifications.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import {
  start,
  generateRef,
  changePosition,
  container,
  arrNotif,
} from "@/helpers/mixins/notifications.mixins";

import Notification from "@/components/Notification.vue";
import EmptyNotification from "@/components/EmptyNotification.vue";
import Loader from "@/components/LoaderPage.vue";
import Pagination from "@/components/pagination/index.vue";
import JobsPerPage from "@/components/JobsPerPage.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({ target: Object });

const filter = ref({
  paginate: "10",
  page: "1",
});
const loader = ref(true);
const meta = ref({});

const changeFilter = (key, val) => {
  filter.value[key] = val;
  const query = {};
  Object.keys(filter.value).forEach(
    (item) => filter.value[item] && (query[item] = filter.value[item])
  );
  router.push({
    query: query,
  });
  getNotifications(query);
};

const getNotifications = async (query) => {
  loader.value = true;
  const { data } = await getRequest(getNotificationsList(query));
  if (!data) return;
  arrNotif.value = data.data;
  isOpenNotif.value = true;
  meta.value = data.meta;
  loader.value = false;
};
const initFilter = () => {
  filter.value = { ...filter.value, ...route.query };
  getNotifications(route.query);
};
onMounted(() => {
  initFilter();
});

const isOpenNotif = ref(false);
start({ isOpenNotif });
</script>
