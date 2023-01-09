<template>
  <div class="mb-8 flex h-12 w-full">
    <div
      class="relative flex w-1/4 items-center justify-center text-sm"
      :class="{
        'bg-blue-500 text-cinder-200': key < selectItem,
        'bg-blue-500 text-white': selectItem === 3,
        'bg-blue-500 text-white before:absolute before:-right-2 before:z-10 before:h-full before:w-4 before:-skew-x-12 before:bg-blue-500':
          selectItem === key && key !== 3,
        'bg-cinder-50 text-cinder-300': key > selectItem,
      }"
      v-for="(item, key) in navs"
    >
      <span v-if="key > selectItem || selectItem === key" class="mr-2">
        {{ key + 1 }}
      </span>
      <IconCheckbox v-else class="mr-2 stroke-cinder-300" />
      {{ item.label }}
    </div>
  </div>
  <div class="mb-4 flex items-center text-2xl font-semibold">
    <span class="text-havelock-blue-500">{{ selectHeader.title }}</span>
    <component class="mx-3 stroke-havelock-blue-500" :is="selectHeader.icon" />
    <span class="text-cinder-500">{{ selectHeader.label }}</span>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import IconLocation from "@/components/icons/IconLocation.vue";
import IconCheckbox from "@/components/icons/IconCheckbox.vue";
import IconRuler from "@/components/icons/IconRuler.vue";
import IconsRoof from "@/components/icons/IconsRoof.vue";
import IconWallet from "@/components/icons/IconWallet.vue";

const route = useRoute();

const selectItem = computed(() => {
  return +route.name.slice(15, 16) - 1;
});
const selectHeader = computed(() => {
  return titles[route.name.slice(0, 16)];
});
const key = computed(() => {
  return +route.name.slice(15, 16) - 1;
});
const navs = [
  {
    key: "CalculatorStep-1",
    label: "Address",
  },
  {
    key: "CalculatorStep-2",
    label: "Material",
  },
  {
    key: "CalculatorStep-3",
    label: "Details",
  },
  {
    key: "CalculatorStep-4",
    label: "Estimate",
  },
];
const titles = {
  "CalculatorStep-1": {
    title: "Step 1.",
    label: "Enter Commercial Address",
    icon: IconLocation,
  },
  "CalculatorStep-2": {
    title: "Step 2.",
    label: "What coating do you want to use?",
    icon: IconsRoof,
  },
  "CalculatorStep-3": {
    title: "Step 3.",
    label: "Outline each detail below",
    icon: IconRuler,
  },
  "CalculatorStep-4": {
    title: "Step 4.",
    label: "Instant Estimate",
    icon: IconWallet,
  },
};
</script>
