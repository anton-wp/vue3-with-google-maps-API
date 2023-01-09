<template>
  <div class="relative flex">
    <Transition name="modal">
      <div
        v-if="auth.isLoaderVerification"
        class="bg-blur absolute z-30 flex h-full w-full flex-col items-center justify-center"
      >
        <Vue3Lottie :animationData="cubeLoader" :height="300" :width="300" />
        <span class="text-2xl">Wait for verification process</span>
      </div>
    </Transition>
    <NavBar
      class="absolute top-0 z-40 bg-white duration-300 lg:relative lg:left-0 lg:block"
      :class="{
        '-left-64': !isOpen,
        'left-0': isOpen,
      }"
    />
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="bg-blur absolute z-30 h-full w-full lg:hidden"
        @click="isOpen = false"
      />
    </Transition>
    <div class="flex w-full flex-col">
      <c-header @open-nav-bar="isOpen = true">
        <slot name="header" />
      </c-header>
      <div ref="target" class="content-wrapper relative overflow-auto pb-6">
        <slot name="routerView" />
      </div>
      <CFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

import { useAuthStore } from "@/stores";
import { cubeLoader } from "@/helpers/loaders.js";

import CHeader from "./components/Header.vue";
import CFooter from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

const auth = computed(() => useAuthStore());

const isOpen = ref(false);
</script>
