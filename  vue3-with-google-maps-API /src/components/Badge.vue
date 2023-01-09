<template>
  <div
    class="flex h-9 w-24 items-center justify-center rounded"
    :class="typesBadges[type]"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { typesBadges } from "@/helpers/statuses.js";

const props = defineProps({
  type: String,
  label: String,
});
</script>
