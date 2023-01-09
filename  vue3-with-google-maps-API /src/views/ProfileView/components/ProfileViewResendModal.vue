<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconDeleteProfile class="h-8 w-8" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">Email is not verified</h2>
      <p class="mb-8 w-[406px] text-center">
        You can't go to other pages until you verify your email
      </p>
      <div class="flex w-[376px] justify-between">
        <c-button
          class="h-12 w-44"
          :variant="'secondary-blue'"
          @click="emit('update:modelValue', false)"
        >
          Cancel
        </c-button>
        <c-button class="h-12 w-44" @click="emit('resend')">
          Resend email
        </c-button>
      </div>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";

import IconDeleteProfile from "@/components/icons/IconDeleteProfile.vue";

const emit = defineEmits(["update:modelValue", "resend"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
