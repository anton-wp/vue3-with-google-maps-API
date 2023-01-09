<template>
  <button
    class="flex items-center justify-center duration-300"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "normal",
  },
});

const sizes = {
  sm: "text-sm font-normal",
  normal: "text-normal font-semibold",
  bold: "font-bold",
};

const variants = {
  primary:
    "bg-gradient rounded text-white hover:opacity-80 active:opacity-90 focus:opacity-95 disabled:opacity-40",
  secondary:
    "border border-cinder-100 rounded text-cinder-500  active:bg-cinder-50 disabled:opacity-40",
  "secondary-blue":
    "border border-blue-50 rounded text-blue-500 active:border-blue-200 hover:border-blue-500 disabled:text-blue-300",
  "secondary-gray":
    "border border-cinder-200 rounded-lg text-cinder-400 stroke-cinder-400 active:border-blue-500  active:text-blue-500 active:stroke-blue-500 hover:border-cinder-300",
  white: "bg-white rounded text-cinder-400 ",
};
</script>
