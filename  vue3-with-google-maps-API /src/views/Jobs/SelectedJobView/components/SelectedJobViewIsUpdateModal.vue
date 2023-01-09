<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[594px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="flex flex-col items-center p-14">
      <icon-with-bg class="mb-6">
        <IconList class="h-8 w-8" />
      </icon-with-bg>
      <h2 class="h2 mb-4 text-center">Are you sure you want update info?</h2>
      <ButtonsBlock
        class="mt-10"
        :secondary-title="'Cancel'"
        :primary-title="'Update'"
        @secondaryEvent="emit('update:modelValue', false)"
        @primaryEvent="emit('save')"
      />
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import IconWithBg from "@/components/IconWithBg.vue";
import CButton from "@/components/Button.vue";
import ButtonsBlock from "@/components/ButtonsBlock.vue";
import IconList from "@/components/icons/IconList.vue";

const emit = defineEmits(["update:modelValue", "save"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
