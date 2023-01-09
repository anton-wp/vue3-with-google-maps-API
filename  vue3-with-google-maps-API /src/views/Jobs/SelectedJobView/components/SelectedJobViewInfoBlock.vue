<template>
  <div class="pt-6">
    <sub-title class="mb-6" :icon="IconInfo"> Information </sub-title>
    <div
      class="border-fun-blue-50 rounded-lg border text-sm xl:overflow-hidden"
    >
      <div class="hidden text-sm text-cinder-400 xl:grid xl:grid-cols-6">
        <div v-for="item in header" class="py-4 pl-6">
          {{ item }}
        </div>
      </div>
      <div
        class="grid grid-cols-2 gap-2 p-3 text-sm text-cinder-500 xl:grid-cols-6 xl:bg-havelock-blue-tb xl:p-0"
      >
        <div v-for="(item, key) in body" class="flex xl:py-4 xl:pl-4">
          <span class="flex w-full text-cinder-300 xl:hidden">
            {{ header[key] }}</span
          >
          <span
            class="group relative ml-2 flex max-w-3/5 justify-end xl:w-full xl:justify-start"
          >
            <span class="overflow-hidden text-ellipsis whitespace-nowrap">
              {{ item }}
            </span>
            <tooltip class="-top-6 left-0">
              {{ item }}
            </tooltip>
          </span>
        </div>
      </div>
    </div>
    <div v-if="state.comment" class="mt-4 w-[666px] text-sm">
      <span class="mb-2 flex text-cinder-400">Comments</span>
      <span class="text-cinder-500">
        {{ state.comment }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

import IconInfo from "@/components/icons/IconInfo.vue";
import Tooltip from "@/components/Tooltip.vue";
import SubTitle from "@/components/SubTitle.vue";

const props = defineProps({
  state: Object,
});
const header = {
  address: "Address",
  name: "Name title",
  warranty: "Warranty",
  material: "Material",
  roof_type: "Roof type",
  general_square_footage: "Square Footage",
};
const body = computed(() => {
  return {
    address: props.state.address,
    name: props.state.name || "--/--",
    warranty: props.state.warranty.name,
    material: props.state.material.name,
    roof_type: props.state.roof_type.name,
    general_square_footage: props.state.general_square_footage,
  };
});
</script>
