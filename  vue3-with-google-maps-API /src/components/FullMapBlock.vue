<template>
  <div class="flex flex-col rounded-lg bg-cinder-50 p-2 xl:flex-row">
    <GMapMap
      class="h-full w-full overflow-hidden rounded"
      ref="myMapRef"
      map-type-id="satellite"
      :zoom="30"
      :center="center"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }"
    />
    <div
      v-if="selectItem"
      class="w-auto max-w-full xl:order-2 xl:w-auto xl:overflow-x-visible xl:pr-2 xl:pl-6"
    >
      <div
        class="mt-2 max-h-full w-48 max-w-full overflow-hidden rounded shadow-md xl:mt-0 xl:overflow-y-auto xl:rounded"
      >
        <div
          class="flex w-full items-center bg-havelock-blue-tb stroke-blue-500 p-4 text-xs font-medium text-blue-500 xl:sticky xl:top-0"
          style="min-width: 12rem"
        >
          <component
            :is="tabs.find((i) => i.key === selectItem.roof_detail.id).icon"
            class="mr-2.5"
          />
          <span> {{ selectItem.roof_detail.name }}</span>
        </div>
        <div class="block overflow-x-auto">
          <div
            v-if="
              selectItem.data.linear_feet ||
              selectItem.data.area ||
              selectItem.data.type
            "
            class="flex flex-col bg-white p-2"
          >
            <span class="mb-2 text-xs text-cinder-600">
              {{ selectItem.data.linear_feet && "Linear Feet" }}
              {{ selectItem.data.area && " Square Footage" }}
              {{ selectItem.data.type && "Type" }}
            </span>
            <span class="border-cinder-100">
              {{
                selectItem.data.linear_feet ||
                selectItem.data.area ||
                selectItem.data.type
              }}
            </span>
            <template v-if="selectItem.data.height">
              <span class="mb-2 mt-2 text-xs text-cinder-600"> Height </span>
              <span class="border-cinder-100">
                {{ selectItem.data.height }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getRoofDetails } from "@/services/api/jobs.js";
import { addCustomZoomButtons } from "@/helpers/googleMaps/zoomButtons.js";
import { initFullscreenControl } from "@/helpers/googleMaps/fullScreenButton";
import { containerStyle } from "@/helpers/googleMaps/styles";
import { typesMarkers } from "@/helpers/googleMaps/marker.js";
import { tabs } from "@/helpers/tabsMap.js";

import GMap from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3Map.vue";

const loading = ref(true);
const route = useRoute();

const myMapRef = ref(null);
const map = ref(null);
const markers = ref([]);

const center = ref({ lat: 47.60789952635893, lng: -122.33494772941305 });

const poligonGenerate = (item) => {
  return new google.maps.Polygon({
    paths: item.data.coordinates,
    fillColor: "#F5F9FE",
    fillOpacity: 0.8,
    strokeColor: "#0D5CA9",
    item,
  });
};
const polylineGenerate = (item) => {
  const types = {
    2: {
      strokeColor: "#3990E4",
    },
    3: {
      strokeColor: "#33CC66",
    },
    4: {
      strokeColor: "#FFCC66",
    },
    5: {
      strokeColor: "#70DB94",
    },
    6: {
      strokeColor: "#FF4D4D",
    },
    9: {
      strokeColor: "#568DC3",
    },
    12: {
      strokeColor: "#53B0B6",
    },
    14: {
      strokeColor: "#0C5398",
    },
  };
  return new google.maps.Polyline({
    path: item.data.coordinates,
    strokeOpacity: 1,
    strokeWeight: 3,
    ...types[item.roof_detail.id],
    item,
  });
};
const markerGenerate = (item) => {
  const marker = new google.maps.Marker({
    position: item.data.coordinates.length
      ? item.data.coordinates[0]
      : item.data.coordinates,

    ...typesMarkers[item.roof_detail.id],
    item,
  });
  markers.value = [...markers.value, marker];
  return marker;
};

const selectItem = ref(null);
const addElement = (el, isSelect) => {
  google.maps.event.addListener(el, "click", () => {
    selectItem.value = el.item;
  });
  if (isSelect) {
    selectItem.value = el.item;
  }
  el.setMap(map.value);
};
onMounted(async () => {
  map.value = await myMapRef.value.$mapPromise;

  map.value.setTilt(0);
  addCustomZoomButtons(map.value);
  const controlWrapper = document.createElement("div");
  controlWrapper.classList.add(...containerStyle, "mr-1");
  initFullscreenControl({ controlWrapper, map: map.value });
  map.value.controls[google.maps.ControlPosition.TOP_RIGHT].push(
    controlWrapper
  );

  loading.value = true;
  const { data } = await getRoofDetails({ jobId: route.params.jobId });
  center.value = data.coordinates;
  loading.value = false;

  data.job_roof_details.forEach((item) => {
    switch (item.roof_detail.id) {
      case 1:
        addElement(poligonGenerate(item), true);
        addElement(markerGenerate(item));
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 9:
      case 12:
      case 14:
        addElement(polylineGenerate(item));
        addElement(markerGenerate(item));
        break;
      default:
        addElement(markerGenerate(item));
    }
  });
});
</script>
