<template>
  <div class="flex flex-col justify-center rounded-lg p-10">
    <h2 class="h2 mx-auto mb-6">Contact info</h2>
    <div class="flex w-full flex-wrap">
      <div
        v-for="item in infoBlocks"
        :key="item.label"
        class="mb-8 w-1/2 border-cinder-50 px-1 first:border-r last:border-l xl:mb-0 xl:w-1/6 xl:border-r xl:px-5 xl:first:w-2/6 xl:last:w-2/6 xl:last:border-0"
      >
        <div
          class="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded bg-havelock-blue-50 stroke-blue-500"
        >
          <component class="h-5 w-5" :is="item.icon" />
        </div>
        <span class="flex w-full justify-center text-center text-cinder-500">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import IconLocation from "@/components/icons/IconLocation.vue";
import IconMessage from "@/components/icons/IconMessage.vue";
import IconPrinter from "@/components/icons/IconPrinter.vue";
import IconPhone from "@/components/icons/IconPhone.vue";

const props = defineProps({
  info: Object,
});

const infoBlocks = computed(() => [
  {
    icon: IconMessage,
    label: props.info.email_for_orders,
  },
  {
    icon: IconPhone,
    label: props.info.phone,
  },
  {
    icon: IconPrinter,
    label: props.info.fax,
  },
  {
    icon: IconLocation,
    label: props.info.address,
  },
]);
</script>
