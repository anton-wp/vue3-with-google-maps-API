<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center"
      >
        <div class="bg-blur h-full w-full" @click="emit('close')" />
        <div
          class="absolute overflow-hidden rounded-lg bg-white"
          :class="modalClass"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(["close"]);
const props = defineProps({
  show: Boolean,
  modalClass: String,
});
</script>
