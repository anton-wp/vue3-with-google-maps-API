<template>
  <Polyline
    :roofDetailId="roofDetailId"
    :title="title"
    :icon="IconNewSiliconeWalkpad"
  />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconNewSiliconeWalkpad from "@/components/icons/IconNewSiliconeWalkpad.vue";

const roofDetailId = 12;
const title = "Silicone Walkpad";
</script>
