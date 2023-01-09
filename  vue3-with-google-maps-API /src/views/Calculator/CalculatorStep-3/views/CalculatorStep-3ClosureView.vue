<template>
  <Polyline :roofDetailId="roofDetailId" :title="title" :icon="IconClosure" />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconClosure from "@/components/icons/IconClosure.vue";

const roofDetailId = 9;
const title = "Closure";
</script>
