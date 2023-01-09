<template>
  <div v-if="!loading" class="flex flex-col py-8 px-12">
    <Back class="mb-12" :to="{ name: 'SelectedJob', params: $route.params }" />
    <div class="mb-2 flex justify-between">
      <div class="flex items-center">
        <h1 class="h1">Job №{{ info.id }}</h1>
      </div>
    </div>
    <div class="mb-8 flex text-sm">
      <span class="mr-2 text-cinder-300">Created date:</span>
      <span class="text-cinder-500">
        {{ DateTime.fromISO(info.created_at).toFormat("dd/MM/yy ") }}
      </span>
    </div>
    <AddressBlock class="mb-8" :info="info" @updateInfo="updateInfo" />
    <RoofBlock class="mb-8" :info="info" />
    <div class="flex flex-col rounded-lg border border-blue-50 p-8">
      <sub-title class="mb-6" :icon="IconsRoof">
        What coating do you want to use?
      </sub-title>
      <CoatingBlock
        v-model:material="stateId.material"
        v-model:warranty="stateId.warranty"
        v-model:coating="stateId.coating"
        v-model:roof_type="stateId.roof_type"
        v-model:name="state.name"
        :state="options"
      />
      <TableWithEdit
        class="mt-5"
        :header="header"
        :body="body"
        :is-edit="true"
      />
      <div class="mt-6 mb-4 flex justify-between">
        <span class="text-cinder-400">Pictures</span>
        <div>
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
            <IconUpload class="mr-2 stroke-blue-500" />
            <span class="text-sm text-blue-500">Upload pictures</span>
          </label>
        </div>
      </div>
      <!-- v-if="state.images.length" -->
      <GalleryBlock
        v-model="state.images"
        v-model:loader="loaderImage"
        :jobId="$route.params.jobId"
        :is-scroll="false"
      />
      <sub-title class="mb-6 mt-10" :icon="IconWallet">
        Instant Estimate
      </sub-title>
      <EstimateBlock
        v-model:price="state.price"
        v-model:comment="state.comment"
      />
      <ButtonsBlock
        class="mt-10 ml-auto"
        :primary-title="'Save'"
        @primaryEvent="clickSave()"
      />
    </div>
    <IsUpdateModal v-model="isOpenModal" @save="save()" />
  </div>
  <Loader v-else />
  <NextModal
    v-model="isNextModal"
    @reset-form="resetForm()"
    @save-form="save(true)"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import {
  generateOptions,
  generateBody,
  header,
  updatePhoto,
  getCoatings,
} from "@/helpers/job.js";
import {
  getJobMetaData,
  updateJobs,
  // saveJobImage,
} from "@/services/api/jobs.js";
import { DateTime } from "luxon";

import Loader from "@/components/LoaderPage.vue";
import NextModal from "@/components/NextModal.vue";
import AddressBlock from "@/views/Jobs/SelectedJobView/components/SelectedJobEditViewAddressBlock.vue";
import RoofBlock from "@/views/Jobs/SelectedJobView/components/SelectedJobEditViewRoofBlock.vue";
import Back from "@/components/Back.vue";
import SubTitle from "@/components/SubTitle.vue";
import GalleryBlock from "@/components/GalleryBlock.vue";
import TableWithEdit from "@/components/TableWithEdit.vue";
import EstimateBlock from "@/components/EstimateBlock.vue";
import CoatingBlock from "@/components/CoatingBlock.vue";
import ButtonsBlock from "@/components/ButtonsBlock.vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import IconsRoof from "@/components/icons/IconsRoof.vue";
import IconWallet from "@/components/icons/IconWallet.vue";
import IsUpdateModal from "@/views/Jobs/SelectedJobView/components/SelectedJobViewIsUpdateModal.vue";

const loading = ref(true);
const loaderImage = ref(false);

const state = reactive({
  images: [],
  comment: "",
  name: "",
  price: null,
});
const stateId = reactive({
  material: null,
  coating: null,
  warranty: null,
  roof_type: null,
});
const options = reactive({
  materials: [],
  warranties: [],
  roof_types: [],
});
const info = reactive({
  id: null,
  address: "",
  created_at: "",
  general_square_footage: 0,
  filled_tabs_count: 0,
  coordinates: {},
});
const body = ref([]);

const changePhoto = (e) => [
  updatePhoto({
    e,
    state,
    loaderImage,
    jobId: route.params.jobId,
  }),
];
const updateInfo = (job) => {
  Object.keys(info).forEach((item) => {
    info[item] = job[item];
  });
};

const route = useRoute();
const router = useRouter();
onMounted(async () => {
  loading.value = true;
  const { data } = await getRequest(
    getJobMetaData({ jobId: route.params.jobId })
  );
  Object.keys(options).forEach((item) => {
    options[item] = generateOptions(data[item]);
  });
  Object.keys(stateId).forEach((item) => {
    if (!data.job[item]) return;
    stateId[item] = data.job[item].id;
  });
  Object.keys(state).forEach((item) => {
    if (item === "name" && !data.job[item]) {
      state[item] = "";
      return;
    }
    state[item] = data.job[item];
  });
  updateInfo(data.job);
  body.value = generateBody(data.job.coatings);
  loading.value = false;
});

const isOpenModal = ref(false);
const isShowModal = ref(false);
const clickSave = () => {
  isOpenModal.value = true;
};
const save = async (next) => {
  isOpenModal.value = false;
  const coatings = getCoatings(body.value);
  const dataForm = {
    coatings,
    material_id: stateId.material,
    warranty_id: stateId.warranty,
    roof_type_id: stateId.roof_type,
    comment: state.comment,
    name: state.name,
    ...(stateId.material === 1 ? { coating_id: stateId.coating } : {}),
  };
  const { data } = await getRequest(
    updateJobs({ data: dataForm, jobId: route.params.jobId })
  );
  if (!data) return;
  if (next) nextF.value();
  else {
    isShowModal.value = true;
    router.push({ name: "SelectedJob", params: route.params });
  }
};
const resetForm = () => {
  nextF.value();
};
const isNextModal = ref(false);
const nextF = ref(null);
onBeforeRouteLeave((to, from, next) => {
  if (isShowModal.value) next();
  isNextModal.value = true;
  nextF.value = next;
});
</script>
