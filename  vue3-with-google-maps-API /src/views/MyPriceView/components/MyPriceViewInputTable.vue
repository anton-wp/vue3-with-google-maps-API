<template>
  <div
    v-if="isEdit"
    class="relative w-24 rounded-lg border border-cinder-50 py-2 focus-within:border-blue-500"
  >
    <span class="absolute left-2 text-cinder-200">$</span>
    <input
      class="w-full pl-6 outline-none"
      type="number"
      step=".01"
      :value="modelValue"
      @input="input"
    />
  </div>
  <span v-else>$ {{ modelValue }}</span>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String | Number,
  isEdit: Boolean,
});

const input = ($event) => {
  if ($event.target.value.indexOf(".") != "-1") {
    $event.target.value = $event.target.value.substring(0, $event.target.value.indexOf(".") + 3);
  }
  emit("update:modelValue", $event.target.value);
};
</script>
