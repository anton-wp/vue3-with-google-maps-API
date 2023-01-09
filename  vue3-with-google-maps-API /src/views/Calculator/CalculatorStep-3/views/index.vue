<template>
  <div
    v-show="!loading"
    class="map-container flex flex-wrap rounded-lg bg-cinder-50 p-4 xl:flex-nowrap"
  >
    <router-view />
    <TabsBlock class="order-2 mt-6 xl:order-3 xl:mt-0" @save="saveTab" />
  </div>
  <Loader class="map-container" v-show="loading" />
  <div class="flex flex-wrap items-center pt-6 pb-14">
    <div
      class="mb-14 flex w-full items-center justify-between font-inter text-cinder-500 xl:w-auto xl:justify-start"
    >
      <div>
        <span>How many tabs in this project?</span>
        <span class="ml-2.5 mr-8 text-blue-500">{{ tabsCount }}</span>
      </div>
      <div>
        <span>General Square Footage</span>
        <input
          class="ml-5 w-36 rounded border-cinder-300 p-4 text-cinder-300"
          type="number"
          :value="generalSquareFootage"
          disabled
        />
      </div>
    </div>
    <ButtonsBlock
      class="ml-auto mb-14"
      :primary-title="'Next'"
      :secondary-title="'Back'"
      @secondaryEvent="back()"
      @primaryEvent="next()"
    />
  </div>
  <div class="hidden">
    <img src="@/assets/image/marker-medium.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-large.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-small.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-field.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-endlap.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-sidelap.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-walls.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-flashing.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-ridge.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-penetration.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-ACUnit.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-closure.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-fasteners.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-drain.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-silicone-walkpad.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-skylights.svg" alt="picture-roof" />
    <img src="@/assets/image/marker-repairs-needed.svg" alt="picture-roof" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStep3Store } from "@/stores";

import ButtonsBlock from "@/components/ButtonsBlock.vue";
import Loader from "@/components/LoaderPage.vue";
import TabsBlock from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3TabsBlock.vue";

const tabsCount = computed(() => useStep3Store().tabsCount);
const generalSquareFootage = computed(
  () => useStep3Store().generalSquareFootage
);
const save = computed(() => useStep3Store().save);
const loading = computed(() => useStep3Store().loading);

const saveTab = () => {
  save.value();
};

const router = useRouter();
const route = useRoute();
const back = () => {
  router.push({ name: "CalculatorStep-2", params: route.params });
};
const next = async () => {
  await save.value();
  if (generalSquareFootage.value === 0) return;
  router.push({ name: "CalculatorStep-4", params: route.params });
};
</script>
