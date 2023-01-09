<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconWallet class="h-8 w-8" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">
        Are you sure you want to drop your prices?
      </h2>
      <p class="mb-8 w-[406px] text-center">
        if you confirm the operation now, your prices will be deleted and the
        default prices will be indicated
      </p>
      <div class="flex w-[376px] justify-between">
        <c-button
          class="h-12 w-44"
          :variant="'secondary-blue'"
          @click="emit('update:modelValue', false)"
        >
          Cancel
        </c-button>
        <c-button class="h-12 w-44" @click="emit('resetForm')">
          Reset
        </c-button>
      </div>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";

import IconWallet from "@/components/icons/IconWallet.vue";

const emit = defineEmits(["update:modelValue", "resetForm"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
