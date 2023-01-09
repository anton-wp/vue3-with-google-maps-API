<template>
  <div class="mb-10 rounded-lg border border-cinder-50 px-4 py-6">
    <div
      class="flex cursor-pointer items-center justify-between"
      @click="click()"
    >
      <sub-title :icon="icon" :size="!isInTabs ? 'md' : 'sm'">
        <slot name="title" />
      </sub-title>
      <IconCarret
        v-if="!isInTabs"
        class="stroke-cinder-100 duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <transition name="accordion">
      <div v-if="isOpen" class="flex flex-col overflow-hidden">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

import SubTitle from "@/components/SubTitle.vue";
import IconCarret from "@/components/icons/IconCarret.vue";

const props = defineProps({
  icon: Object,
  isInTabs: {
    types: Boolean,
    default: false,
  },
});
const isOpen = ref(false);

const click = () => {
  if (!props.isInTabs) isOpen.value = !isOpen.value;
};
onMounted(() => {
  if (props.isInTabs) isOpen.value = true;
});
</script>
