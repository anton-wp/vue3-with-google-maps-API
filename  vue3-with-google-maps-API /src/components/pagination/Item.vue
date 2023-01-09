<template>
  <li>
    <button
      v-if="page === null"
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-blue-50"
    >
      ...
    </button>
    <button
      v-else
      type="button"
      :aria-label="`Go to page ${page}`"
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md duration-300"
      :class="{
        'hover:bg-blue-50': !isActive,
        'bg-blue-500 text-white': isActive,
      }"
      @click="clickHandler"
    >
      {{ page }}
    </button>
  </li>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  page: Number,
  current: Number,
});

const isActive = computed(() => {
  return props.page === props.current;
});

const clickHandler = () => {
  emit("update", props.page);
};
</script>
