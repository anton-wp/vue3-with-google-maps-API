<template>
  <router-link class="flex items-center text-cinder-400">
    <div
      class="mr-5 flex h-9 w-9 items-center justify-center rounded bg-blue-50"
    >
      <IconCarret class="rotate-90 stroke-blue-500" />
    </div>
    <span>Back</span>
  </router-link>
</template>
<script setup>
import IconCarret from "@/components/icons/IconCarret.vue";
</script>
