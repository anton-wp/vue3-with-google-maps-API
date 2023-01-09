<template>
  <div class="lg:absolute w-full py-4 text-center text-sm" :class="[types[type]]">
    {{ label }}
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: {
    type: String,
    default: "success",
  },
});

const types = {
  success: "bg-pastel-green-50 text-pastel-green-500",
  warning: "bg-cream-can-50 text-cream-can-500",
  error: "bg-red-50 text-red-500",
};
</script>
