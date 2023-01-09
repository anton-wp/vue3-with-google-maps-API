<template>
  <Marker :roofDetailId="roofDetailId" :title="title" :icon="IconFasteners" />
</template>
<script setup>
import Marker from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Marker.vue";
import IconFasteners from "@/components/icons/IconFasteners.vue";

const roofDetailId = 10;
const title = "Fasteners";
</script>
