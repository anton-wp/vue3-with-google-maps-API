<template>
  <Polyline
    :roofDetailId="roofDetailId"
    :title="title"
    :icon="IconRepairsNeeded"
  />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconRepairsNeeded from "@/components/icons/IconRepairsNeeded.vue";

const roofDetailId = 14;
const title = "Repairs Needed";
</script>
