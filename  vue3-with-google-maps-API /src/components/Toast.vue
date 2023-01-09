<template>
  <div
    class="mb-4 rounded-md px-10 py-5 text-white last:mb-0"
    :class="[types[state.type]]"
  >
    {{ state.message }}
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useToastStore } from "@/stores";

const props = defineProps({
  state: Object,
});

const types = {
  primary: "bg-blue-900 ",
};

onMounted(() => {
  setTimeout(() => {
    useToastStore().removeToast(props.state.id);
  }, 5000);
});
</script>
