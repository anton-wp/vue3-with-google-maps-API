<template>
  <div class="step-1__address">
    <AddressBlock ref="address" />
  </div>

  <div class="flex items-center justify-between">
    <router-link
      class="font-semibold text-blue-500"
      :to="{ name: 'CalculatorHowItWorks' }"
    >
      How to use the site
    </router-link>
    <c-button class="mt-8 mb-14 h-14 w-44" @click="next()">Next</c-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { saveJobs } from "@/services/api/jobs.js";
import { useToastStore } from "@/stores";

import CButton from "@/components/Button.vue";
import AddressBlock from "@/components/AddressBlock.vue";

const address = ref(null);

const router = useRouter();
const next = async () => {
  try {
    const res = await address.value.valid();
    if (!res) return;
    const { data } = await saveJobs(res);
    useToastStore().addToast("primary", "Details were captured!");
    router.push({ name: "CalculatorStep-2", params: { jobId: data.data.id } });
  } catch (error) {
    address.value.isError = true;
    return;
  }
};
</script>

<style>
.step-1__address .vue-map-container {
  height: calc(100vh - 32rem);
}
@media screen and (max-width: 1023px) {
  .step-1__address .vue-map-container {
    height: 578px;
  }
}
</style>
