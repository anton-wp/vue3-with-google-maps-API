<template>
  <div>
    <span class="text-sm text-cinder-400">Pictures</span>
    <div class="mt-4 grid grid-cols-2 gap-6 xl:grid-cols-4 xl:gap-5">
      <div
        class="relative overflow-hidden rounded"
        v-for="(item, key) in imageArr"
        :key="item.id"
      >
        <img
          class="h-64 w-full object-cover"
          :src="item.full_url"
          alt="picture"
        />
        <template
          v-if="!isFull && imageArr.length === key + 1 && images.length > 4"
        >
          <div
            class="absolute top-0 left-0 z-10 h-full w-full bg-black opacity-50"
          />
          <div
            class="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center"
          >
            <button class="text-2xl text-white" @click="isFull = true">
              + {{ images.length - 4 }}
            </button>
          </div>
        </template>
      </div>
    </div>
    <button
      class="flex items-center text-sm text-blue-500"
      v-if="isFull"
      @click="isFull = false"
    >
      Hide photo
      <IconCarret class="ml-3 rotate-180 stroke-blue-500" />
    </button>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";

import IconCarret from "@/components/icons/IconCarret.vue";

const props = defineProps({
  images: {
    types: Array,
    default: [],
  },
});
const isFull = ref(false);
const imageArr = computed(() => {
  if (isFull.value) return props.images;
  else return props.images.slice(0, 4);
});
</script>
