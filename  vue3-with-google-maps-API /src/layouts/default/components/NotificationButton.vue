<template>
  <div class="relative mr-4">
    <IconNotification
      class="stroke-cinder-300"
      :class="{ 'cursor-pointer': $route.name !== 'Notifications' }"
      @click="openNotif"
    />
    <div
      v-if="isNewNotif"
      class="absolute top-0 right-[3px] h-[6px] w-[6px] rounded-full bg-blue-500"
    ></div>
    <div
      v-if="isOpenNotif"
      class="absolute top-10 right-0 w-96 overflow-hidden rounded-lg bg-white shadow-md"
      v-click-outside="() => (isOpenNotif = false)"
    >
      <div class="flex w-full items-center justify-between p-4">
        <span class="text-cinder-500">Notifications</span>

        <IconClose
          class="h-2.5 w-2.5 cursor-pointer stroke-cinder-200"
          @click="isOpenNotif = false"
        />
      </div>
      <div
        ref="container"
        class="max-h-[260px] min-h-[120px] overflow-auto"
        @scroll="changePosition"
      >
        <div v-if="isLoading" class="flex items-center justify-center">
          <Loader />
        </div>
        <div
          v-else-if="arrNotif.length"
          :ref="(el) => generateRef(el, key)"
          v-for="(item, key) in arrNotif"
          :key="item"
          :id="item.id"
          class="my-2 mx-4"
        >
          <Notification :item="item" size="sm" />
        </div>
        <div v-else class="py-10 text-center text-xs text-cinder-300">
          You have no new notifications at this time
        </div>
      </div>
      <router-link
        class="flex h-12 items-center justify-center bg-havelock-blue-tb text-blue-500"
        :to="{ name: 'Notifications' }"
        @click="isOpenNotif = false"
      >
        View all notifications
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { getNotificationsUnreadList } from "@/services/api/notifications.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import {
  start,
  generateRef,
  changePosition,
  container,
  arrNotif,
} from "@/helpers/mixins/notifications.mixins";

import Notification from "@/components/Notification.vue";
import Loader from "@/components/LoaderComponent.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import IconClose from "@/components/icons/IconClose.vue";

const isLoading = ref(false);

const route = useRoute();
const openNotif = async () => {
  if (route.name === "Notifications") return;
  isLoading.value = true;
  isOpenNotif.value = true;
  const { data } = await getRequest(getNotificationsUnreadList());
  arrNotif.value = data.data;
  isLoading.value = false;
};

const isOpenNotif = ref(false);
start({ isOpenNotif });

const isNewNotif = ref(false);
let timer;
onMounted(() => {
  timer = setInterval(async () => {
    const { data } = await getRequest(getNotificationsUnreadList());
    if (data.data.length) isNewNotif.value = true;
    else isNewNotif.value = false;
  }, 10000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>
