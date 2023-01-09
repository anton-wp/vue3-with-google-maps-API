<template>
  <Marker
    :roofDetailId="roofDetailId"
    :title="title"
    :icon="IconACUnit"
    :markers="['Medium', 'Large']"
  />
</template>
<script setup>
import Marker from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Marker.vue";
import IconACUnit from "@/components/icons/IconACUnit.vue";

const roofDetailId = 8;
const title = "A/C Unit";
</script>
