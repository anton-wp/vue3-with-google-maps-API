<template>
  <div class="flex flex-col rounded-lg border border-blue-50 p-8">
    <sub-title class="mb-6" :icon="IconLocation">
      Enter Commercial Address
    </sub-title>
    <div class="selected-job__address">
      <AddressBlock
        ref="address"
        :address="info.address"
        :coordinates="info.coordinates"
      />
    </div>
    <ButtonsBlock
      class="mt-10 ml-auto"
      :secondary-title="'Cancel'"
      :primary-title="'Save'"
      @secondaryEvent="cancel()"
      @primaryEvent="isOpenModal = true"
    />
    <IsUpdateModal v-model="isOpenModal" @save="save()" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { updateJobs } from "@/services/api/jobs.js";

import AddressBlock from "@/components/AddressBlock.vue";
import SubTitle from "@/components/SubTitle.vue";
import ButtonsBlock from "@/components/ButtonsBlock.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IsUpdateModal from "@/views/Jobs/SelectedJobView/components/SelectedJobViewIsUpdateModal.vue";

const emit = defineEmits(["updateInfo"]);
const props = defineProps({
  info: {
    types: Object,
    default: {},
  },
});

const address = ref(null);
const isOpenModal = ref(false);
const route = useRoute();
const save = async () => {
  try {
    isOpenModal.value = false;
    const res = await address.value.valid();
    if (!res) return;
    const { data } = await updateJobs({ data: res, jobId: route.params.jobId });
    emit("updateInfo", data.data);
  } catch (error) {
    address.value.isError = true;
    return;
  }
};
const cancel = () => {
  address.value.reset();
};
</script>

<style>
.selected-job__address .vue-map-container {
  height: 271px;
}
@media screen and (max-width: 1023px) {
  .selected-job__address .vue-map-container {
    height: 291px;
  }
}
</style>
