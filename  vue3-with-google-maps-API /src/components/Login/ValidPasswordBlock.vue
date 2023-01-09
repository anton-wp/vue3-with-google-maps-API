<template>
  <div
    class="flex w-full flex-col rounded-lg border border-cinder-50 py-2 px-4 text-sm text-cinder-400"
  >
    <div
      class="mb-2 flex items-center last:mb-0"
      v-for="(item, key) in errorsMessage"
      :key="key"
    >
      <div
        class="h-2 w-2 rounded-full bg-blue-500"
        v-if="errorsValue.includes(item)"
      ></div>
      <IconCheck v-else class="stroke-pastel-green-500" />
      <span class="ml-3"> {{ item }}</span>
    </div>
  </div>
</template>
<script setup>
import IconCheck from "@/components/icons/IconCheck.vue";

const props = defineProps({
  errorsMessage: Array,
  errorsValue: Array,
});
</script>
