<template>
  <div
    class="flex w-80 rounded border border-cinder-50 p-[6px] font-inter text-sm font-bold"
  >
    <div
      class="flex h-11 w-1/2 items-center justify-center duration-300"
      v-for="item in options"
      :key="item.value"
      :class="{
        'rounded bg-blue-50 text-blue-500': modelValue === item.value,
        'cursor-pointer text-cinder-200': modelValue !== item.value,
      }"
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
});

const options = [
  {
    value: "acrylic",
    label: "Acrylic",
  },
  {
    value: "silicone",
    label: "Silicone",
  },
];
</script>
