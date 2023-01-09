<template>
  <span>$ {{ modelValue }}</span>
</template>
<script setup>
import { onMounted, watchEffect } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Number | String,
  row: Object,
  body: Array,
});

const utils = {
  drums: props.row.drum,
  pails: props.row.pail,
  ["2 gal. pail"]: props.row["2 gal. pail"],
};
if (utils.drums || utils.pails || utils["2 gal. pail"]) {
  const updateCountCost = () => {
    const costs = {
      drum: utils.drums ? utils.drums.value * utils.drums.price : 0,
      pail: utils.pails ? utils.pails.value * utils.pails.price : 0,
      ["2 gal. pail"]: utils["2 gal. pail"]
        ? utils["2 gal. pail"].value * utils["2 gal. pail"].price
        : 0,
    };
    const cost = costs.drum + costs.pail + costs["2 gal. pail"];

    emit("update:modelValue", +cost.toFixed(2));
  };
  watchEffect(() => updateCountCost());
  onMounted(() => {
    updateCountCost();
  });
} else {
  const updateCountCost = () => {
    const cost = props.body
      .slice(0, props.body.length - 1)
      .reduce((acc, item) => acc + item.costs.value, 0);
    emit("update:modelValue", +cost.toFixed(2));
  };
  watchEffect(() => updateCountCost());
  onMounted(() => {
    updateCountCost();
  });
}
</script>
