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
      <h2 class="h2 mb-4 text-center">
        Are you sure you want to delete your profile?
      </h2>
      <p class="mb-8 w-[406px] text-center">
        If you delete a profile, you cannot restore it
      </p>
      <div class="flex w-[376px] justify-between">
        <c-button
          class="h-12 w-44"
          :variant="'secondary-blue'"
          @click="emit('update:modelValue', false)"
        >
          Cancel
        </c-button>
        <c-button class="h-12 w-44" @click="emit('delete')"> Delete </c-button>
      </div>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";

import IconDeleteProfile from "@/components/icons/IconDeleteProfile.vue";

const emit = defineEmits(["update:modelValue", 'delete']);
const props = defineProps({
  modelValue: Boolean,
});
</script>
