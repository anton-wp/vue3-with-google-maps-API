<template>
  <button
    ref="button"
    class="group relative h-full w-full cursor-pointer outline-none"
    @mousedown.prevent="focus"
  >
    <div
      type="button"
      class="relative flex h-full w-full items-center rounded border bg-white pl-5 duration-300 group-focus-within:bg-cinder-50 group-focus-within:text-cinder-300 group-disabled:bg-cinder-50 group-disabled:text-cinder-300"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <span class="flex items-center">
        {{ options.find((item) => item.value === modelValue).label }}
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-5 flex items-center"
      >
        <IconCarret
          class="stroke-cinder-300 duration-300 group-focus-within:rotate-180 group-disabled:rotate-180"
        />
      </span>
    </div>
    <ul
      class="absolute z-30 hidden w-full rounded-lg bg-white shadow-md group-focus-within:block"
      tabindex="0"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      <li
        v-for="(item, key) in options"
        :key="key"
        tabindex="0"
        class="flex cursor-pointer py-3 pl-6 duration-300 hover:bg-blue-50 hover:text-blue-500"
        :class="{
          'text-blue-500': item.value === modelValue,
        }"
        role="option"
        @click="click($event, item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </button>
</template>
<script setup>
import { ref } from "vue";

import IconCarret from "@/components/icons/IconCarret.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String | Number,
  options: Array,
});

const click = (e, val) => {
  document.activeElement.blur();
  emit("update:modelValue", val);
};
const button = ref(null);

const focus = () => {
  button.value.focus();
};
</script>
