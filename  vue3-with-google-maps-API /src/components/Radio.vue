<template>
  <div class="flex items-center">
    <input
      type="radio"
      class="cursor-pointer appearance-none"
      :id="label"
      :value="value"
      :checked="modelValue"
      @change="emit('update:modelValue', value)"
    />
    <div
      class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border duration-300"
      :class="{
        'border-blue-500': modelValue,
        'border-cinder-100': !modelValue,
      }"
      @click="emit('update:modelValue', value)"
    >
      <div
        class="h-3 w-3 rounded-full duration-300"
        :class="{
          'bg-blue-500': modelValue,
          'bg-cinder-100': !modelValue,
        }"
      />
    </div>
    <label :for="label" class="cursor-pointer pl-3">{{ label }}</label>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String | Number,
  value: String | Number,
  label: String,
});
</script>
