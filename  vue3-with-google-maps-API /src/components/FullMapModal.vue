<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[80vw] h-[80vh]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="absolute right-4 top-3 flex">
      <button class="ml-auto" @click="emit('update:modelValue', false)">
        <IconClose
          class="stroke-cinder-300 duration-300 hover:stroke-blue-500"
        />
      </button>
    </div>
    <div v-if="modelValue" class="h-full px-4 pb-4 pt-10">
      <FullMap class="h-full" />
    </div>
  </modal>
</template>
<script setup>
import Modal from "@/components/Modal.vue";
import FullMap from "@/components/FullMapBlock.vue";
import IconClose from "@/components/icons/IconClose.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
});
</script>
