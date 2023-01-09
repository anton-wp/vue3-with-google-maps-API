<template>
  <div
    class="mt-2 max-h-full max-w-full overflow-hidden rounded shadow-md xl:mt-0 xl:w-48 xl:overflow-y-auto xl:rounded"
  >
    <div
      class="flex w-full items-center bg-havelock-blue-tb stroke-blue-500 p-4 text-xs font-medium text-blue-500 xl:sticky xl:top-0"
      style="min-width: 12rem"
    >
      <component :is="icon" class="mr-2.5" />
      <span>{{ title }}</span>
    </div>

    <div class="block overflow-x-auto">
      <template v-if="markers">
        <div
          v-for="marker in markers"
          class="flex h-8 items-center bg-white px-2"
        >
          <CCheckbox
            :value="marker.toLowerCase()"
            :size="'sm'"
            :modelValue="typeMarker === marker.toLowerCase()"
            :label="marker"
            :type-input="'radio'"
            @update:modelValue="typeMarker = $event"
          />
          <span class="ml-1">
            ({{
              shapesRef.filter((i) => i.type === marker.toLowerCase()).length
            }})
          </span>
        </div>
      </template>
      <button
        v-else
        class="min-w-48 w-48 bg-white p-2 text-start disabled:bg-havelock-blue-tb"
        style="min-width: 12rem"
        v-for="(item, key) in data"
        :key="item.zIndex"
        :disabled="item.zIndex === selectedShapeRef.zIndex"
        @click="emit('clickRow', item.zIndex)"
      >
        <template v-if="type === 'label'">
          <span
            class="mb-2 text-xs"
            :class="{
              'text-havelock-blue-500': item.zIndex === selectedShapeRef.zIndex,
              'text-cinder-600': item.zIndex !== selectedShapeRef.zIndex,
            }"
            >{{ item.label }} {{ key + 1 }}</span
          >
        </template>
        <template v-else-if="type === 'input'">
          <span
            class="mb-2 text-xs"
            :class="{
              'text-havelock-blue-500': item.zIndex === selectedShapeRef.zIndex,
              'text-cinder-600': item.zIndex !== selectedShapeRef.zIndex,
            }"
            >{{ item.label }} {{ item.zIndex + 1 }}</span
          >
          <input
            class="w-full rounded border border-cinder-100 px-4 py-1 outline-none"
            type="number"
            v-model="item.value"
          />
        </template>
        <template v-else-if="type === 'input-walls'">
          <span
            class="mb-2 text-xs"
            :class="{
              'text-havelock-blue-500': item.zIndex === selectedShapeRef.zIndex,
              'text-cinder-600': item.zIndex !== selectedShapeRef.zIndex,
            }"
            >{{ item.label }} {{ item.zIndex + 1 }}</span
          >
          <input
            class="w-full rounded border border-cinder-100 px-4 py-1 outline-none"
            type="number"
            v-model="item.value"
          />
          <span
            class="mb-2 text-xs"
            :class="{
              'text-havelock-blue-500': item.zIndex === selectedShapeRef.zIndex,
              'text-cinder-600': item.zIndex !== selectedShapeRef.zIndex,
            }"
            >Height {{ item.zIndex + 1 }}</span
          >
          <input
            class="w-full rounded border border-cinder-100 px-4 py-1 outline-none"
            type="number"
            v-model="item.height"
          />
        </template>
      </button>
    </div>
  </div>
</template>
<script setup>
import { typeMarker } from "@/helpers/googleMaps/marker.js";
import { shapesRef } from "@/helpers/googleMaps/index.js";

import CCheckbox from "@/components/Checkbox.vue";

const emit = defineEmits(["clickRow"]);
const props = defineProps({
  icon: {
    type: Object,
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "input",
  },
  data: {
    type: Array,
    default: [],
  },
  selectedShapeRef: {
    type: Object,
    default: {},
  },
  markers: {
    type: Array,
    default: null,
  },
});
</script>
