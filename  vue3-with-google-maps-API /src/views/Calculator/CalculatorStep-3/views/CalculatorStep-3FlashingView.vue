<template>
  <Polyline :roofDetailId="roofDetailId" :title="title" :icon="IconFlashing" />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconFlashing from "@/components/icons/IconFlashing.vue";

const roofDetailId = 5;
const title = "Flashing";
</script>
