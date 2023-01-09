<template>
  <div class="flex flex-col items-center justify-center">
    <IconEmptyJobs class="mb-10" />
    <h1 class="h1 mb-10 w-[400px] text-center">
      You don’t have any applications yet
    </h1>
    <router-link :to="{ name: 'CalculatorStep-1' }">
      <c-button v-if="['customer'].includes(role)" class="h-14 w-60"
        >Go to calculator page</c-button
      >
    </router-link>
  </div>
</template>

<script setup>
import { role } from "@/helpers/role.js";

import IconEmptyJobs from "@/components/icons/IconEmptyJobs.vue";
import CButton from "@/components/Button.vue";
</script>
