<template>
  <Polyline
    :roofDetailId="roofDetailId"
    :title="title"
    :icon="IconWalls"
    :height="true"
  />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconWalls from "@/components/icons/IconWalls.vue";

const roofDetailId = 4;
const title = "Walls";
</script>
