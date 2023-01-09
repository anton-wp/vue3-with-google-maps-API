<template>
  <div class="flex h-[571px] w-full flex-col xl:h-full">
    <div
      v-if="isInfoBlock"
      class="mb-4 flex items-center rounded-md bg-white p-1.5 text-cinder-500"
    >
      <div
        class="mr-4 flex h-9 w-9 items-center justify-center rounded bg-blue-500"
      >
        <IconInfo class="stroke-white" />
      </div>
      The double press ends a line
    </div>
    <GMapMap
      class="h-full w-full overflow-hidden rounded"
      ref="myMapRef"
      map-type-id="satellite"
      :center="center"
      :zoom="30"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }"
    >
      <slot />
    </GMapMap>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { useStep3Store } from "@/stores";
import { addCustomZoomButtons } from "@/helpers/googleMaps/zoomButtons.js";
import IconInfo from "@/components/icons/IconInfo.vue";

const emit = defineEmits(["initMap"]);
const props = defineProps({
  isInfoBlock: {
    types: Boolean,
    default: false,
  },
});

const center = computed(() => useStep3Store().center);
const myMapRef = ref(null);
onMounted(() => {
  myMapRef.value.$mapPromise.then((map) => {
    addCustomZoomButtons(map);
    emit("initMap", map);
  });
});
</script>
