<template>
  <Polyline :roofDetailId="roofDetailId" :title="title" :icon="IconRidge" />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconRidge from "@/components/icons/IconRidge.vue";

const roofDetailId = 6;
const title = "Ridge";
</script>
