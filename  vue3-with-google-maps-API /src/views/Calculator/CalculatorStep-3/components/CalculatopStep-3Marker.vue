<template>
  <GMap v-if="!loading" class="order-1" ref="myMapRef" @initMap="initMap" />
  <div
    class="order-3 w-auto max-w-full xl:order-2 xl:w-auto xl:overflow-x-visible xl:pr-2 xl:pl-6"
  >
    <Form
      :icon="icon"
      :title="title"
      :type="'label'"
      :data="shapesRef"
      :markers="markers"
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
import { initMarker } from "@/helpers/googleMaps/marker.js";
import {
  start,
  dataStart,
  options,
  loading,
  selectedObject,
} from "@/helpers/mixins/step-3.mixins";
import { typesMarkers } from "@/helpers/googleMaps/marker.js";

import GMap from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Map.vue";
import Form from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Form.vue";

const props = defineProps({
  roofDetailId: Number,
  title: String,
  icon: Object,
  markers: {
    type: Array,
    default: null,
  },
});
const type = "marker";

const initMap = (map) => {
  const drawingManager = initMarker({
    map,
    options: { ...options[type], ...typesMarkers[props.roofDetailId] },
    markers: props.markers,
  });
  const config = {
    [type]: true,
  };
  initActions({
    drawingManager,
    map,
    ...config,
    data: dataStart.value,
    options: { ...options[type], ...typesMarkers[props.roofDetailId] },
  });
};

const multiMarkers = () => {
  return shapesRef.value.map((item) => {
    return {
      coordinates: item.path,
      type: item.type,
    };
  });
};
const singleMarkers = () => {
  return shapesRef.value.map((item) => {
    return {
      coordinates: item.path,
    };
  });
};
const dataRes = computed(() => {
  return {
    roof_detail_id: props.roofDetailId,
    roof_details: props.markers ? multiMarkers() : singleMarkers(),
  };
});

start({ dataRes, roofDetailId: props.roofDetailId });
</script>
