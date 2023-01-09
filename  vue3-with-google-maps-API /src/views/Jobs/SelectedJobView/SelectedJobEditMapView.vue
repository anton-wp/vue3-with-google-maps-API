<template>
  <div class="my-8 mx-12">
    <Back
      class="mb-12"
      :to="{ name: 'SelectedEditJob', params: $route.params }"
    />
    <h1 class="h1 mb-3">Map</h1>
    <div
      v-show="!loading"
      class="map-container flex flex-wrap rounded-lg bg-cinder-50 p-2 xl:flex-nowrap xl:p-4"
    >
      <router-view />
      <TabsBlock
        class="order-2 mt-6 xl:order-3 xl:mt-0"
        :keyName="'EditMap-'"
        @save="saveTab"
      />
    </div>
    <Loader class="map-container" v-show="loading" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStep3Store } from "@/stores";

import Back from "@/components/Back.vue";
import Loader from "@/components/LoaderPage.vue";
import TabsBlock from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3TabsBlock.vue";

const save = computed(() => useStep3Store().save);
const loading = computed(() => useStep3Store().loading);

const saveTab = () => {
  save.value();
};
</script>
