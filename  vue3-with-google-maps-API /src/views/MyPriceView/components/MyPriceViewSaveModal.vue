<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconList class="h-6 w-6" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">
        Are you sure you want to update prices?
      </h2>
      <p class="mb-8 w-[406px] text-center">
        If you update the prices, the current prices will be selected instead of
        the default prices
      </p>
      <!-- <p class="mb-8 w-[406px] text-center">
        You will receive a notification about the accepted price list with which
        you can work
      </p> -->
      <c-button class="h-12 w-44" @click="emit('saveForm')"> Update </c-button>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";

import IconList from "@/components/icons/IconList.vue";

const emit = defineEmits(["update:modelValue", "saveForm"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
