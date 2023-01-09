<template>
  <span class="mb-10 font-bold text-white">Not registered yet?</span>
  <c-button
    class="h-14 w-full"
    :variant="'white'"
    :size="'bold'"
    @click="$router.push({ name: 'Register' })"
    >Sign up</c-button
  >
</template>
<script setup>
import CButton from "@/components/Button.vue";
</script>
