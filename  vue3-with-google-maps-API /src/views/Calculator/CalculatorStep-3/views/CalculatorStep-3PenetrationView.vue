<template>
  <Marker
    :roofDetailId="roofDetailId"
    :title="title"
    :icon="IconPenetration"
    :markers="['Small', 'Medium', 'Large']"
  />
</template>
<script setup>
import Marker from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Marker.vue";
import IconPenetration from "@/components/icons/IconPenetration.vue";

const roofDetailId = 7;
const title = "Penetration";
</script>
