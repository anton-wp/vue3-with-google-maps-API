<template>
  <div class="flex text-cinder-400">
    <span>View</span>
    <DropDown
      class="ml-4 mr-4 h-9 w-14"
      :modelValue="modelValue"
      :options="optionsItems"
      :position="'top'"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    />
    <span>jobs per page</span>
  </div>
</template>
<script setup>
import { ref } from "vue";

import DropDown from "@/components/DropDown.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
});

const optionsItems = ref([
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
]);
</script>
