<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div
      class="absolute right-3 top-3 cursor-pointer"
      @click="emit('update:modelValue', false)"
    >
      <IconClose class="h-3 w-3 stroke-cinder-300" />
    </div>
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconInfo class="h-6 w-6" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">Attention</h2>
      <p class="mb-8 w-[420px] text-center">
        You are leaving the page, all the data changes will be lost. Please
        click <span class="font-bold text-blue-500">Save</span> or
        <span class="font-bold text-blue-500">Reset</span> and you will go
        further.
      </p>
      <div class="flex">
        <c-button
          class="mr-4 h-12 w-44"
          :variant="'secondary-blue'"
          @click="emit('resetForm')"
        >
          Reset
        </c-button>
        <c-button class="h-12 w-44" @click="emit('saveForm')"> Save </c-button>
      </div>
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";

import IconClose from "@/components/icons/IconClose.vue";
import IconInfo from "@/components/icons/IconInfo.vue";

const emit = defineEmits(["update:modelValue", "saveForm", "resetForm"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
