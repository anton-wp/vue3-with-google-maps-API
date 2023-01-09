<template>
  <div
    class="mx-auto flex items-center justify-center rounded-full"
    :class="[sizes[size], types[type]]"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
  type: {
    type: String,
    default: "primary",
  },
});

const sizes = {
  md: "h-20 w-20",
};
const types = {
  error: "bg-red-50 stroke-red-500",
  primary: "bg-blue-50 stroke-blue-500",
};
</script>
