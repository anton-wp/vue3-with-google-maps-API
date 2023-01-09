<template>
  <template v-if="!state.loading">
    <CoatingBlock
      v-model:material="state.material"
      v-model:coating="state.coating"
      v-model:warranty="state.warranty"
      v-model:roof_type="state.roof_type"
      v-model:name="state.name"
      :state="state"
    />
    <span v-if="state.images.length" class="mb-4 mt-6 flex text-cinder-400">
      Pictures
    </span>
    <!-- v-if="state.images.length" -->
    <GalleryBlock
      v-model="state.images"
      v-model:loader="loaderImage"
      :jobId="$route.params.jobId"
    />
    <div class="mt-6 flex justify-between pb-6">
      <input
        id="uploadFile"
        name="uploadFile"
        type="file"
        class="hidden"
        :accept="'image/x-png,image/jpeg,image/jpg'"
        multiple
        :disabled="loaderImage"
        @change="changePhoto"
      />
      <label for="uploadFile" class="flex cursor-pointer items-center">
        <span class="font-semibold text-blue-500">Upload pictures</span>
        <IconUpload class="ml-2.5 stroke-blue-500" />
      </label>
      <!-- :secondary-title="'Back'" -->
      <!-- @secondaryEvent="back()" -->
      <ButtonsBlock :primary-title="'Next'" @primaryEvent="next()" />
    </div>
  </template>
  <Loader v-else />
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateOptions, updatePhoto } from "@/helpers/job.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getJobMetaData, updateJobs } from "@/services/api/jobs.js";
import { useToastStore } from "@/stores";

import ButtonsBlock from "@/components/ButtonsBlock.vue";
import CoatingBlock from "@/components/CoatingBlock.vue";
import Loader from "@/components/LoaderPage.vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import GalleryBlock from "@/components/GalleryBlock.vue";
import CButton from "@/components/Button.vue";

const state = reactive({
  material: null,
  materials: [],
  coating: null,
  warranty: null,
  warranties: [],
  roof_type: null,
  roof_types: [],
  images: [],
  loading: true,
  name: "",
});

const loaderImage = ref(false);

const changePhoto = (e) => [
  updatePhoto({
    e,
    state,
    loaderImage,
    jobId: route.params.jobId,
  }),
];

const route = useRoute();
const router = useRouter();
// const back = () => {
//   router.push({ name: "CalculatorStep-3", params: route.params });
// };
const next = async () => {
  const data = {
    material_id: state.material,
    coating_id: state.coating,
    warranty_id: state.warranty,
    roof_type_id: state.roof_type,
    name: state.name,
    ...(state.material === 1 ? { coating_id: state.coating } : {}),
  };
  await getRequest(updateJobs({ data, jobId: route.params.jobId }));
  useToastStore().addToast("primary", "Details were captured!");
  router.push({ name: "CalculatorStep-3", params: route.params });
};

onMounted(async () => {
  state.loading = true;
  const { data } = await getRequest(
    getJobMetaData({ jobId: route.params.jobId })
  );
  state.materials = generateOptions(data.materials);
  state.warranties = generateOptions(data.warranties);
  state.roof_types = generateOptions(data.roof_types);
  // state.name = data.job.name || "name " + data.job.id;
  state.name = data.job.name || "";
  state.images = data.job.images;
  state.material = data.job.material.id;
  state.coating = data.job.coating.id;
  state.warranty = data.job.warranty.id;
  state.roof_type = data.job.roof_type.id;
  state.loading = false;
});
</script>
