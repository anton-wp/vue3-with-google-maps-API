<template>
  <div class="mt-6 flex">
    <CRadio
      class="mr-10"
      v-for="item in state.materials"
      :key="item.value"
      :modelValue="item.value === material"
      :value="item.value"
      :label="item.label"
      @update:modelValue="updateMaterial"
    />
  </div>
  <div v-if="material === 1" class="mt-8 flex">
    <div class="hidden"></div>
    <div
      v-for="item in coatings"
      class="mr-4 flex w-[219px] cursor-pointer items-center rounded p-2.5 duration-300"
      :class="{
        'bg-blue-500 text-white': item.id === coating,
        'bg-cinder-50 text-blue-900': item.id !== coating,
      }"
      @click="emit('update:coating', item.id)"
    >
      <div class="mr-4 flex items-center justify-center rounded bg-white">
        <img
          v-show="item.img === 'Evercoat-HT'"
          class="w-9"
          src="/src/assets/image/Evercoat-HT.png"
          alt="image"
        />
        <img
          v-show="item.img === 'Evercoat-EC'"
          class="w-9"
          src="/src/assets/image/Evercoat-EC.png"
          alt="image"
        />
      </div>
      {{ item.label }}
    </div>
  </div>
  <div class="mt-5 w-1/2 pr-5">
    <h2 class="h2 mb-5">Name title</h2>
    <CInput
      class="mb-4 stroke-cinder-300"
      :placeholder="'Name'"
      :modelValue="name"
      @update:modelValue="emit('update:name', $event)"
    />
  </div>
  <div class="mt-6 flex">
    <div
      v-for="(item, key) in selects"
      :key="key"
      class="flex w-1/2 flex-col first:mr-5 last:ml-5 xl:w-96"
    >
      <h2 class="h2 mb-5">{{ item.label }}</h2>
      <div class="h-14">
        <CSelect
          class="h-14 w-full"
          :modelValue="item.value"
          :options="item.options"
          @update:modelValue="emit(`update:${item.key}`, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { messageErrors } from "@/helpers/errors.js";

import CSelect from "@/components/Select.vue";
import CRadio from "@/components/Radio.vue";
import CInput from "@/components/Input.vue";

const emit = defineEmits([
  "update:material",
  "update:coating",
  "update:warranty",
  "update:roof_type",
  "update:name",
]);
const props = defineProps({
  material: String | Number,
  coating: String | Number,
  warranty: String | Number,
  roof_type: String | Number,
  name: String,
  state: Object,
});
const coatings = [
  {
    id: 1,
    label: "Evercoat HT",
    img: "Evercoat-HT",
  },
  {
    id: 2,
    label: "Evercoat EC",
    img: "Evercoat-EC",
  },
];
const selects = computed(() => [
  {
    label: "Warranty",
    key: "warranty",
    value: props.warranty,
    // optionKey: "warranties",
    options: props.state.warranties,
  },
  {
    label: "Roof type",
    key: "roof_type",
    value: props.roof_type,
    options: props.state.roof_types,
  },
]);
const updateMaterial = (e) => {
  emit("update:material", e);
  if (e === 1) emit("update:coating", 1);
};
</script>
