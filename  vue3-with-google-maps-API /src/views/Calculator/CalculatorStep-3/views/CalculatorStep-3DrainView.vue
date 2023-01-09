<template>
  <Marker :roofDetailId="roofDetailId" :title="title" :icon="IconDrain" />
</template>
<script setup>
import Marker from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Marker.vue";
import IconDrain from "@/components/icons/IconDrain.vue";

const roofDetailId = 11;
const title = "Drain";
</script>
