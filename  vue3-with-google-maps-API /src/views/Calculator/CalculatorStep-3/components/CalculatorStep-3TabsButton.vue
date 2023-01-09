<template>
  <div
    class="flex min-h-[56px] min-w-[56px] cursor-pointer items-center justify-center rounded-md bg-white stroke-cinder-300 duration-300 hover:bg-havelock-blue-tb hover:stroke-blue-500"
  >
    <component :is="icon" />
  </div>
</template>
<script setup>
const props = defineProps({
  icon: Object,
});
</script>
