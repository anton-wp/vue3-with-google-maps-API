<template>
  <ul class="flex items-center stroke-cinder-400 text-sm text-cinder-400">
    <button
      class="mr-4 flex cursor-pointer items-center disabled:stroke-cinder-200 disabled:text-cinder-200"
      :disabled="modelValue < 2"
      @click="updatePageHandler(modelValue - 1)"
    >
      <IconArrowLeft class="mr-4" />
      <span class="hidden lg:block">Previous</span>
    </button>
    <div class="flex">
      <Item
        v-for="page in pagination"
        :key="`pagination-page-${page}`"
        :page="page"
        :current="+modelValue"
        @update="updatePageHandler"
      />
    </div>
    <button
      class="ml-4 flex cursor-pointer items-center disabled:stroke-cinder-200 disabled:text-cinder-200"
      :disabled="+modelValue > pages - 1"
      @click="updatePageHandler(`${+modelValue + 1}`)"
    >
      <span class="hidden lg:block">Next</span>
      <IconArrowLeft class="ml-4 rotate-180" />
    </button>
  </ul>
</template>

<script setup>
import { computed } from "vue";

import Item from "@/components/pagination/Item.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  rangeSize: {
    type: Number,
    default: 1,
  },
  pages: Number,
  modelValue: String | Number,
});

const updatePageHandler = (page) => {
  emit("update:modelValue", page);
};

const pagination = computed(() => {
  const res = [];
  const minPaginationElems = 5 + props.rangeSize * 2;
  let rangeStart =
    props.pages <= minPaginationElems ? 1 : +props.modelValue - props.rangeSize;
  let rangeEnd =
    props.pages <= minPaginationElems
      ? props.pages
      : +props.modelValue + props.rangeSize;
  rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
  rangeStart = rangeStart < 1 ? 1 : rangeStart;
  if (props.pages > minPaginationElems) {
    const isStartBoundaryReached = rangeStart - 1 < 3;
    const isEndBoundaryReached = props.pages - rangeEnd < 3;
    if (isStartBoundaryReached) {
      rangeEnd = minPaginationElems - 2;
      for (let i = 1; i < rangeStart; i++) {
        res.push(i);
      }
    } else {
      res.push(1);
      // res.push(2);
      // res.push(3);
      res.push(null);
    }
    if (isEndBoundaryReached) {
      rangeStart = props.pages - (minPaginationElems - 3);
      for (let i = rangeStart; i <= props.pages; i++) {
        res.push(i);
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        res.push(i);
      }
      res.push(null);
      // res.push(props.pages - 2);
      // res.push(props.pages - 1);
      res.push(props.pages);
    }
  } else {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      res.push(i);
    }
  }
  return res;
});
</script>
