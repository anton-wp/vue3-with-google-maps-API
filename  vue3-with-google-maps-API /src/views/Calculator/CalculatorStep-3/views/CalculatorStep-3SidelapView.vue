<template>
  <Polyline :roofDetailId="roofDetailId" :title="title" :icon="IconSidelap" />
</template>
<script setup>
import Polyline from "@/views/Calculator/CalculatorStep-3/components/CalculatopStep-3Polyline.vue";
import IconSidelap from "@/components/icons/IconSidelap.vue";

const roofDetailId = 3;
const title = "Sidelap";
</script>
