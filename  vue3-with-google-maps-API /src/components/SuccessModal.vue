<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconCheck class="h-8 w-8 stroke-blue-500" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">{{message}}</h2>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";

import IconCheck from "@/components/icons/IconCheckbox.vue";

const emit = defineEmits(["update:modelValue", "delete"]);
const props = defineProps({
  modelValue: Boolean,
  message: String
});
</script>
