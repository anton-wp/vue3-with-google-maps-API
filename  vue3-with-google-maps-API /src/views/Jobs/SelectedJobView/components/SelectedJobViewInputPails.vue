<template>
  <div v-if="isEdit" class="flex items-center">
    <input
      class="w-12 rounded-lg border border-cinder-50 px-2 py-2 outline-none focus-within:border-blue-500"
      type="number"
      :value="modelValue"
      @input="emit('update:modelValue', +$event.target.value)"
    />
    <IconPails class="ml-2 fill-blue-500" />
  </div>
  <div v-else class="flex items-center">
    <span>
      {{ modelValue }}
    </span>
    <IconPails class="ml-2 fill-blue-500" />
  </div>
</template>
<script setup>
import IconPails from "@/components/icons/IconPails.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Number,
  isEdit: Boolean,
});
</script>
