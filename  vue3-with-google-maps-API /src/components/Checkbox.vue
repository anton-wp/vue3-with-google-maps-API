<template>
  <div class="flex cursor-pointer">
    <div class="relative flex cursor-pointer items-center justify-center">
      <input
        class="appearance-none rounded border transition duration-300 focus:outline-none"
        :type="typeInput"
        :value="value"
        :checked="modelValue"
        :id="typeInput === 'checkbox' ? name : value"
        :class="{
          'border-red-500': isError,
          'border-cinder-100  checked:border-blue-600 checked:bg-blue-600':
            !isError,
          'h-6 w-6': size === 'md',
          'h-4 w-4': size === 'sm',
        }"
        @change="input($event.target)"
      />
      <IconCheck
        v-if="modelValue"
        class="absolute stroke-white"
        :class="{ 'h-4 w-4': size === 'md', 'h-3 w-3': size === 'sm' }"
        @click="input($event.target)"
      />
    </div>
    <label
      class="inline-block cursor-pointer pl-3"
      :class="{
        'text-red-600': isError,
        'text-gray-800': !isError,
      }"
      :for="typeInput === 'checkbox' ? name : value"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { valid } from "@/helpers/errors.js";

import IconCheck from "@/components/icons/IconCheckbox.vue";

const emit = defineEmits(["update:modelValue", "update:errors"]);
const props = defineProps({
  modelValue: Boolean | String,
  errors: Array,
  label: String,
  name: String,
  rules: {
    types: Array,
    default: [],
  },
  isSubmit: {
    types: Boolean,
    default: false,
  },
  typeInput: {
    types: String,
    default: "checkbox",
  },
  value: {
    types: String,
    default: null,
  },
  size: {
    types: String,
    default: "md",
  },
});

const isRules = computed(() => props.rules > 0);
const isError = computed(() => props.isSubmit && props.errors.length > 0);

function input(target) {
  const value = props.typeInput === "checkbox" ? target.checked : target.value;
  emit("update:modelValue", value);
  if (isRules.value) return;
  const errors = props.rules.map((item) => {
    if (!valid[item.key](value)) return item.message;
  });
  emit(
    "update:errors",
    errors.filter((item) => !!item)
  );
}
onMounted(() => {
  if (props.rules.length > 0) input(false);
});
</script>
