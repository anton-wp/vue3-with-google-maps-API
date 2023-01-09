<template>
  <Marker :roofDetailId="roofDetailId" :title="title" :icon="IconSkylights" />
</template>
<script setup>
import Marker from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Marker.vue";
import IconSkylights from "@/components/icons/IconSkylights.vue";

const roofDetailId = 13;
const title = "Skylights";
</script>
