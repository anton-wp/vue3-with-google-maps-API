<template>
  <div class="z-20 flex h-16 w-full items-center pl-4 pr-10 shadow-md">
    <button
      class="h-full cursor-pointer stroke-cinder-300 px-7 lg:hidden"
      @click="emit('openNavBar')"
    >
      <IconBurger />
    </button>
    <slot />
    <div class="ml-auto flex items-center">
      <NotificationButton
        v-if="authStore.userInfo && authStore.userInfo.email_verified_at"
      />
      <button
        ref="button"
        class="group relative py-4 outline-none"
        @mousedown.prevent="focus"
      >
        <img
          class="h-8 w-8 cursor-pointer rounded-full object-cover"
          :src="authStore.userInfo && authStore.userInfo.avatar"
        />
        <div
          class="absolute top-16 right-0 z-30 hidden w-44 flex-col overflow-hidden rounded-lg bg-white shadow-md group-focus-within:flex"
        >
          <div
            class="flex cursor-pointer items-center px-6 py-2 duration-300 hover:bg-havelock-blue-50"
            :class="item.class"
            v-for="(item, key) in buttons"
            @click="click(item.event)"
          >
            <component class="mr-3" :is="item.icon" />
            {{ item.label }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

import NotificationButton from "@/layouts/default/components/NotificationButton.vue";
import IconLogOut from "@/components/icons/IconLogOut.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconBurger from "@/components/icons/IconBurger.vue";

const emit = defineEmits(["openNavBar"]);

const authStore = computed(() => useAuthStore());

const router = useRouter();
const buttons = [
  {
    label: "Edit",
    icon: IconEdit,
    class: "stroke-cinder-400 text-cinder-400",
    event: () => router.push({ name: "Profile", query: { edit: true } }),
  },
  {
    label: "Log out",
    icon: IconLogOut,
    class: "stroke-red-500 text-red-500",
    event: authStore.value.logout,
  },
];
const click = (event) => {
  document.activeElement.blur();
  event();
};

const button = ref(null);

const focus = () => {
  button.value.focus();
};
</script>
