<template>
  <span class="mb-10 font-bold text-white">Are you already registered?</span>
  <c-button
    class="h-14 w-full"
    :variant="'white'"
    :size="'bold'"
    @click="$router.push({ name: 'Login' })"
    >Log In</c-button
  >
</template>
<script setup>
import CButton from "@/components/Button.vue";
</script>
