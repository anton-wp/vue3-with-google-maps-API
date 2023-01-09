<template>
  <GMap v-if="!loading" class="order-1" ref="myMapRef" @initMap="initMap">
    <GMapPolygon :editable="true" :options="options[type]" />
  </GMap>
  <div
    class="order-3 w-auto max-w-full xl:order-2 xl:w-auto xl:overflow-x-visible xl:pr-2 xl:pl-6"
  >
    <Form
      :icon="IconField"
      :title="'Field'"
      :data="shapesRef"
      :selectedShapeRef="selectedShapeRef"
      @clickRow="(e) => selectedObject(e, type)"
    />
  </div>
</template>
<script setup>
import { computed } from "vue";

import {
  initActions,
  shapesRef,
  selectedShapeRef,
} from "@/helpers/googleMaps/index.js";
import { initPolygon } from "@/helpers/googleMaps/polygon.js";
import {
  start,
  dataStart,
  options,
  loading,
  selectedObject,
} from "@/helpers/mixins/step-3.mixins";

import GMap from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Map.vue";
import IconField from "@/components/icons/IconField.vue";
import Form from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Form.vue";

const roofDetailId = 1;
const type = "polygone";

const initMap = (map) => {
  const drawingManager = initPolygon({ map, options: options[type] });
  const config = {
    polygon: true,
  };

  initActions({
    drawingManager,
    map,
    ...config,
    data: dataStart.value,
    options: options[type],
  });
};

const dataRes = computed(() => {
  return {
    roof_detail_id: roofDetailId,
    roof_details:
      shapesRef.value.length > 0
        ? shapesRef.value.map((item) => {
            return {
              coordinates: item.path,
              area: item.value,
            };
          })
        : [],
  };
});

start({ dataRes, roofDetailId });
</script>
