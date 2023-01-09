<template>
  <div class="h-full py-8 px-12">
    <StepsBlock v-if="route.name !== 'CalculatorHowItWorks'" />
    <router-view />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import StepsBlock from "@/views/Calculator/components/CalculatorStepsBlock.vue";

const route = useRoute();
</script>
