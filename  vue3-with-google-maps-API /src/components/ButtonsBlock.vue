<template>
  <div class="flex">
    <c-button
      v-if="secondaryTitle"
      class="mr-4 h-14 w-44"
      :variant="'secondary-blue'"
      @click="emit('secondaryEvent')"
    >
      <slot name="secondary" />
      {{ secondaryTitle }}
    </c-button>
    <c-button
      v-if="primaryTitle"
      class="h-14 w-44"
      @click="emit('primaryEvent')"
    >
     <slot name="primary" />
      {{ primaryTitle }}
    </c-button>
  </div>
</template>
<script setup>
import CButton from "@/components/Button.vue";

const emit = defineEmits(["primaryEvent", "secondaryEvent"]);
const props = defineProps({
  secondaryTitle: String,
  primaryTitle: String,
});
</script>
