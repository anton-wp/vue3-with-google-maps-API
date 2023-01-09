<template>
  <div class="flex h-full w-full items-center justify-center">
    <Vue3Lottie class="absolute top-1/3" :animationData="cubeLoader" :height="300" :width="300" />
  </div>
</template>

<script setup>
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

import { cubeLoader } from "@/helpers/loaders.js";
</script>
