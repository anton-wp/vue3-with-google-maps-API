<template>
  <div
    class="mt-5 mb-6 flex h-14 w-4/5 items-center rounded border p-1"
    :class="{ 'border-cinder-100': !isError, 'border-red-500': isError }"
  >
    <GMapAutocomplete
      class="h-full w-full py-4 px-5 outline-none"
      ref="gmapAutocomplete"
      :options="autocompleteOptions"
      @place_changed="setPlace"
    />
    <div
      class="flex h-10 w-10 items-center justify-center rounded bg-cinder-100"
    >
      <IconSearch class="stroke-white" />
    </div>
  </div>
  <GMapMap
    ref="myMapRef"
    map-type-id="satellite"
    :center="center"
    :zoom="zoom"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }"
  >
    <GMapMarker
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      @dragend="dragendMarker"
    />
  </GMapMap>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  checkAddress,
  getFullAddressByMarker,
  DEFAULT_LOCATION,
} from "@/helpers/googleMaps/location.js";
import { initActions } from "@/helpers/googleMaps/index.js";
import { addCustomZoomButtons } from "@/helpers/googleMaps/zoomButtons.js";

import IconSearch from "@/components/icons/IconSearch.vue";

const props = defineProps({
  address: String,
  coordinates: Object,
});
const zoom = ref(30);
const gmapAutocomplete = ref(null);
const myMapRef = ref(null);

const autocompleteOptions = {
  componentRestrictions: {
    country: ["us"],
  },
  types: ["address"],
};

const center = ref(DEFAULT_LOCATION);
const marker = ref({
  position: DEFAULT_LOCATION,
});

const isAddressLoading = ref(false);
const addressQuery = ref("");
const isError = ref(false);

const centeringMarker = async () => {
  center.value = {
    lat: marker.value.position.lat(),
    lng: marker.value.position.lng(),
  };
  zoom.value = 50;
};

const dragendMarker = async (markerEvent) => {
  const position = markerEvent.latLng;

  marker.value = {
    position,
  };

  isAddressLoading.value = true;

  addressQuery.value = await getFullAddressByMarker(position);
  isAddressLoading.value = false;
  gmapAutocomplete.value.$el.value = addressQuery.value;
  centeringMarker();
};

const setPlace = (e) => {
  addressQuery.value = e.formatted_address;
  marker.value = {
    position: e.geometry.location,
  };
  centeringMarker();
};

onMounted(() => {
  myMapRef.value.$mapPromise.then(async (map) => {
    addCustomZoomButtons(map);
    initActions({
      map,
    });
    reset();
  });
});
const reset = () => {
  if (props.address && props.coordinates) {
    center.value = props.coordinates;
    marker.value.position = props.coordinates;
    addressQuery.value = props.address;
    gmapAutocomplete.value.$el.value = props.address;
  }
};
const valid = async () => {
  const address = await checkAddress(addressQuery.value);
  if (!address) return;
  return {
    address,
    coordinates: center.value,
  };
};

defineExpose({
  valid,
  isError,
  reset,
});
</script>

<style>
.hdpi.pac-logo:after {
  @apply hidden;
}
.vue-map {
  @apply rounded;
}
</style>
