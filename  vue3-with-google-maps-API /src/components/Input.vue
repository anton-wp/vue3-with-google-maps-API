<template>
  <div class="input group relative z-0 flex w-full flex-col">
    <input
      class="h-14 w-full rounded border border-cinder-100 bg-inherit px-6 outline-none focus:border-blue-500"
      :type="type"
      :disabled="disabled"
      :class="{ 'border-red-500': isError, active: modelValue.length > 0 }"
      :value="modelValue"
      :autocomplete="autocomplete"
      @input="(e) => emit('update:modelValue', e.target.value)"
    />
    <label
      for="name"
      :class="{
        'text-red-500': isError,
        'text-cinder-300 ': !isError,
      }"
      class="-z-1 absolute rounded-lg duration-300 group-focus-within:text-blue-500"
    >
      {{ placeholder }}
    </label>
    <div class="absolute top-5 right-7 cursor-pointer">
      <slot name="image" />
    </div>
    <span
      v-if="isMessage && isError"
      class="ml-6 text-sm text-red-600"
      id="error"
    >
      {{ errors[0] }}
    </span>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";

import { valid } from "@/helpers/errors.js";

const emit = defineEmits(["update:modelValue", "update:errors"]);
const props = defineProps({
  modelValue: String,
  errors: Array,
  placeholder: String,
  autocomplete: {
    types: String,
    default: "on",
  },
  type: {
    types: String,
    default: "text",
  },
  rules: {
    types: Array,
    default: [],
  },
  isMessage: {
    types: Boolean,
    default: true,
  },
  isSubmit: {
    types: Boolean,
    default: false,
  },
  disabled: {
    types: Boolean,
    default: false,
  },
});

const isRules = computed(() => props.rules > 0);
const isError = computed(() => props.isSubmit && props.errors.length > 0);

watch(
  () => props.modelValue,
  (val) => input(val)
);
const input = (value) => {
  if (isRules.value) return;
  const errors = props.rules.map((item) => {
    if (!valid[item.key](value, props.rules)) return item.message;
  });
  emit(
    "update:errors",
    errors.filter((item) => !!item)
  );
};
onMounted(() => {
  if (props.modelValue) input(props.modelValue);
  else input("");
});

if (props.rules.find((item) => item.key === "match")) {
  watch(
    () => props.rules[0].matchValue,
    () => {
      input(props.modelValue);
    }
  );
}
</script>
