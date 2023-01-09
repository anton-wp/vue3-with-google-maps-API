<template>
  <div class="flex flex-col rounded-lg border border-blue-50 p-8">
    <div class="mb-6 flex items-center justify-between">
      <sub-title :icon="IconRuler"> Outline each detail below </sub-title>
      <c-button
        class="h-14 w-44"
        :variant="'secondary-blue'"
        @click="$router.push({ name: 'SelectedEditMapJob' })"
      >
        Edit
      </c-button>
    </div>
    <div class="mb-2 flex">
      <span class="mr-2.5 text-cinder-500">How many tabs in this project?</span>
      <span class="mr-8 text-blue-500">{{ info.filled_tabs_count }}</span>
      <span class="mr-2.5 text-cinder-500">Square Footage</span>
      <span class="text-blue-500">{{ info.general_square_footage }}</span>
    </div>
    <FullMap class="h-[671px]" />
    <!-- <div
      class="relative mt-6 flex h-72 w-full items-center justify-center overflow-hidden rounded"
    >
      <img
        class="h-full w-full object-cover"
        src="@/assets/image/roof-bg.jpg"
        alt="bg"
      />
      <div class="absolute h-full w-full bg-black opacity-60"></div>
      <router-link
        class="absolute text-lg text-white underline"
        :to="{ name: 'SelectedEditMapJob' }"
      >
        Open map and edit
      </router-link>
    </div> -->
  </div>
</template>

<script setup>
import SubTitle from "@/components/SubTitle.vue";
import FullMap from "@/components/FullMapBlock.vue";
import IconRuler from "@/components/icons/IconRuler.vue";
import CButton from "@/components/Button.vue";

const props = defineProps({
  info: {
    types: Object,
    default: {},
  },
});
</script>
