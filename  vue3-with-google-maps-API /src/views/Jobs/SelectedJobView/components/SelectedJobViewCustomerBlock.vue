<template>
  <div class="pt-6">
    <sub-title class="mb-6" :icon="IconContact"> Customer Info </sub-title>

    <div class="w-full overflow-hidden rounded-lg border border-blue-50">
      <div class="flex text-sm text-cinder-300">
        <div
          v-for="item in header"
          :key="item"
          class="flex w-1/3 items-center p-4"
        >
          {{ item }}
        </div>
      </div>
      <div class="flex bg-havelock-blue-tb text-sm text-cinder-500">
        <div
          class="flex w-1/3 items-center p-4"
          v-for="(item, key) in body"
          :key="item"
        >
          <template v-if="key === 0">
            <router-link
              :to="{ name: 'Customer', params: { customerId: user.id } }"
              class="flex items-center hover:underline"
              v-html="item"
            />
          </template>
          <template v-else>
            <div>{{ item }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

import IconContact from "@/components/icons/IconContact.vue";
import Tooltip from "@/components/Tooltip.vue";
import SubTitle from "@/components/SubTitle.vue";

const props = defineProps({
  user: Object,
});
const header = ["Name", "Email", "Phone"];
const body = computed(() => [
  `<img class="w-9 h-9 rounded-full mr-5" src="${props.user.avatar}" alt="avatar" /><span>${props.user.full_name}</span>`,
  props.user.email,
  props.user.phone,
]);
</script>
