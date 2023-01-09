<template>
  <div
    class="relative ml-5 flex items-center stroke-cinder-300 text-cinder-300 placeholder:text-cinder-300 focus-within:stroke-cinder-400 focus-within:text-cinder-400"
  >
    <IconSearch />
    <input
      class="pl-3 focus-within:outline-0"
      type="text"
      placeholder="Search"
      :value="state.filter['filter[search]']"
      @input="changeFilter('filter[search]', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { computed, onUnmounted, watch } from "vue";
import * as store from "@/stores";

import IconSearch from "@/components/icons/IconSearch.vue";

const actions = computed(() => store[`use${props.id}Store`]());
const state = computed(() => store[`use${props.id}Store`]());

const props = defineProps({
  id: String,
});

const changeFilter = (key, val) => {
  actions.value.updateFilter({ key, val });
};
watch(
  () => props.id,
  () => actions.value.clearFilter()
);
onUnmounted(() => {
  actions.value.clearFilter();
});
</script>
