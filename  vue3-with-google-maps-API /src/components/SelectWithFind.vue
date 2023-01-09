<template>
  <button
    ref="button"
    class="group relative h-full w-full cursor-pointer outline-none"
    @mousedown.prevent="focus"
  >
    <div
      type="button"
      class="relative flex h-full w-full items-center rounded border bg-white pl-5 duration-300 group-focus-within:bg-cinder-50 group-focus-within:text-cinder-300 group-disabled:bg-cinder-50 group-disabled:text-cinder-300"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <span
        class="mr-10 block w-full items-center overflow-hidden text-ellipsis whitespace-nowrap text-start"
      >
        {{
          modelValue.length > 1
            ? options
                .filter((item) => modelValue.includes(item.value))
                .map((item) => item.label)
                .join(", ")
            : "Customers"
        }}
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-5 flex items-center"
      >
        <IconCarret
          class="stroke-cinder-300 duration-300 group-focus-within:rotate-180 group-disabled:rotate-180"
        />
      </span>
    </div>
    <ul
      class="absolute z-30 hidden max-h-56 w-full overflow-y-auto rounded-lg bg-white shadow-md group-focus-within:block"
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      <div
        class="sticky top-0 z-10 flex w-full items-center bg-white p-2"
        style="width: -webkit-fill-available"
      >
        <input
          ref="input"
          class="w-full py-2 pr-4 text-cinder-500 outline-none"
          type="text"
          v-model="filter"
          placeholder="Search..."
          @click="input.focus()"
        />

        <IconSearch class="absolute right-2 h-3 w-3 stroke-cinder-300" />
      </div>
      <template v-if="optionsSelected.length">
        <button
          class="flex w-full p-2 text-xs text-cinder-400"
          @click="emit('update:modelValue', [])"
        >
          clear selected users
        </button>
        <Row
          v-for="(item, key) in optionsSelected"
          :key="key"
          :item="item"
          :value="modelValue.includes(item.value)"
          @click="selectCustomer(item.value)"
        />
        <span class="flex w-full p-2 text-xs text-cinder-400">Customers</span>
      </template>
      <Row
        v-if="optionsFilter.length"
        v-for="(item, key) in optionsFilter"
        :key="key"
        :item="item"
        :value="modelValue.includes(item.value)"
        @click="selectCustomer(item.value)"
      />
      <div v-else class="p-2 text-xs text-cinder-500">No options</div>
    </ul>
  </button>
</template>
<script setup>
import { computed, ref } from "vue";

import Row from "@/components/SelectWithFindRow.vue";
import IconCarret from "@/components/icons/IconCarret.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Array | Object,
  options: Array,
});
const filter = ref("");

const optionsFilter = computed(() => {
  return props.options.filter((item) => item.label.includes(filter.value));
});
const optionsSelected = computed(() => {
  return props.options.filter((item) => props.modelValue.includes(item.value));
});

const selectCustomer = (val) => {
  if (props.modelValue.includes(val)) {
    emit(
      "update:modelValue",
      props.modelValue.filter((item) => item !== val)
    );
  } else {
    emit("update:modelValue", [...props.modelValue, val]);
  }
};
const button = ref(null);
const input = ref(null);

const focus = () => {
  button.value.focus();
};
</script>
