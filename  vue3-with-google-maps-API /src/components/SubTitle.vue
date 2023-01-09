<template>
  <div class="flex items-center">
    <component
      :is="icon"
      class="stroke-blue-500"
      :class="[sizes[size].icon]"
    />
    <span class="text-cinder-500" :class="[sizes[size].label]">
      <slot />
    </span>
  </div>
</template>
<script setup>
const props = defineProps({
  icon: Object,
  size: {
    types: String,
    default: "md",
  },
});

const sizes = {
  md: {
    icon: "mr-5 h-6 w-6",
    label: "text-2xl font-semibold",
  },
  sm: {
    icon: "mr-4 h-5 w-5",
    label: "text-xl font-semibold",
  }
};
</script>
