<template>
  <GMap
    v-if="!loading"
    class="order-1 h-full w-full"
    ref="myMapRef"
    @initMap="initMap"
    :is-info-block="true"
  >
    <GMapPolyline :editable="true" :options="options[type]" />
  </GMap>

  <div
    class="order-3 w-auto max-w-full xl:order-2 xl:w-auto xl:overflow-x-visible xl:pr-2 xl:pl-6"
  >
    <Form
      :icon="icon"
      :title="title"
      :data="shapesRef"
      :selectedShapeRef="selectedShapeRef"
      :type="height ? 'input-walls' : 'input'"
      @clickRow="selectedObject($event, type)"
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
import { initPolyline } from "@/helpers/googleMaps/polyline.js";
import {
  start,
  dataStart,
  options,
  loading,
  selectedObject,
} from "@/helpers/mixins/step-3.mixins";

import GMap from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Map.vue";
import Form from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Form.vue";

const props = defineProps({
  roofDetailId: Number,
  title: String,
  icon: Object,
  height: {
    type: Boolean,
    default: false,
  },
});
const type = "polyline";

const initMap = (map) => {
  const drawingManager = initPolyline({ map, options: options[type] });
  const config = {
    [type]: true,
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
    roof_detail_id: props.roofDetailId,
    roof_details:
      shapesRef.value.length > 0
        ? shapesRef.value.map((item) => {
            if (!props.height)
              return {
                coordinates: item.path,
                linear_feet: item.value,
              };
            else {
              return {
                coordinates: item.path,
                linear_feet: item.value,
                height: item.height,
              };
            }
          })
        : [],
  };
});

start({ dataRes, roofDetailId: props.roofDetailId });
</script>
