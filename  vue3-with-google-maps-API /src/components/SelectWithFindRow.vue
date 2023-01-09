<template>
  <li
    class="flex cursor-pointer p-2 text-sm text-cinder-500 duration-300 hover:bg-blue-50 hover:text-blue-500"
    :class="{
      'text-blue-500': value,
    }"
    role="option"
  >
    <CCheckbox
      class="cursor-pointer"
      :size="'sm'"
      :value="item.value"
      :modelValue="value"
    />
    {{ item.label }}
  </li>
</template>

<script setup>
import CCheckbox from "@/components/Checkbox.vue";

const props = defineProps({
  value: Boolean,
  item: Object,
});
</script>
