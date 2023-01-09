<template>
  <Polyline :roofDetailId="roofDetailId" :title="title" :icon="IconEndlap" />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconEndlap from "@/components/icons/IconEndlap.vue";

const roofDetailId = 2;
const title = "Endlap";
</script>
