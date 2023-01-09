<template>
  <div v-if="!loading" class="flex flex-col py-8 px-12">
    <Back class="mb-12" :to="{ name: 'Jobs' }" />
    <div class="mb-2 flex justify-between">
      <div class="flex items-center">
        <h1 class="h1">Job №{{ state.id }}</h1>
        <Badge
          v-if="state.status"
          class="ml-3"
          :type="statusObj.value"
          :label="statusObj.label"
        />
      </div>
      <c-button
        class="h-14 w-44"
        :variant="'secondary-blue'"
        @click="
          $router.push({ name: 'SelectedEditJob', params: $route.params })
        "
      >
        Edit
      </c-button>
    </div>
    <div class="flex text-sm">
      <span class="mr-2 text-cinder-300">Created date:</span>
      <span class="text-cinder-500">
        {{ DateTime.fromISO(state.created_at).toFormat("dd/MM/yy") }}</span
      >
    </div>
    <CustomerBlock
      v-if="role === 'admin' && state.user.id"
      class="mb-14"
      :user="state.user"
    />
    <InfoBlock class="mb-14" :state="state" />
    <sub-title class="mb-6" :icon="IconList"> Material list </sub-title>
    <TableWithEdit :header="header" :body="body" :is-edit="false" />
    <ImagesBlock
      class="mt-4"
      v-if="state.images.length"
      :images="state.images"
    />
    <buttons-block
      class="mt-12 ml-auto"
      :secondary-title="'Download'"
      :primary-title="changeButtonsObj.label"
      @secondaryEvent="download()"
      @primaryEvent="changeStatus(changeButtonsObj.key)"
    >
      <template #secondary>
        <IconDownload class="mr-4 fill-blue-500" />
      </template>
    </buttons-block>
    <a ref="link" class="hidden" :href="linkUrl" />
  </div>
  <Loader v-else />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { useAuthStore } from "@/stores";
import { getJobsById, changeStatusJob } from "@/services/api/jobs.js";
import { generateBody, header } from "@/helpers/job.js";
import { status } from "@/helpers/statuses.js";
import { DateTime } from "luxon";
import { role } from "@/helpers/role.js";

import Loader from "@/components/LoaderPage.vue";
import Back from "@/components/Back.vue";
import Badge from "@/components/Badge.vue";
import CButton from "@/components/Button.vue";
import SubTitle from "@/components/SubTitle.vue";
import ButtonsBlock from "@/components/ButtonsBlock.vue";
import TableWithEdit from "@/components/TableWithEdit.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import IconList from "@/components/icons/IconList.vue";

import InfoBlock from "@/views/Jobs/SelectedJobView/components/SelectedJobViewInfoBlock.vue";
import CustomerBlock from "@/views/Jobs/SelectedJobView/components/SelectedJobViewCustomerBlock.vue";
import ImagesBlock from "@/views/Jobs/SelectedJobView/components/SelectedJobViewImagesBlock.vue";

const route = useRoute();
const isEdit = computed(() => route.query.edit);

const userInfo = computed(() => {
  return useAuthStore().userInfo;
});

const loading = ref(false);
const linkUrl = computed(
  () =>
    `${import.meta.env.VITE_BASE_URL}job/${route.params.jobId}/export?email=${
      userInfo.value.email
    }`
);
const link = ref(null);

const statusObj = computed(() => status(state.status));

const state = reactive({
  id: null,
  address: "",
  comment: "",
  created_at: "",
  images: [],
  material: {},
  roof_type: {},
  warranty: {},
  user: {},
  general_square_footage: null,
  status: "",
  name: "",
});

const body = ref([]);

const changeStatus = async (status) => {
  loading.value = true;
  await getRequest(
    changeStatusJob({ jobId: route.params.jobId, data: { status } })
  );
  state.status = status;
  loading.value = false;
};

const changeButtons = {
  customer: {
    draft: {
      label: "Order",
      key: "ordered",
    },
  },
  admin: {
    ordered: {
      label: "Get in progress",
      key: "in_progress",
    },
    in_progress: {
      label: "Finish",
      key: "finished",
    },
  },
};

const changeButtonsObj = computed(() => {
  if (changeButtons[role.value] && changeButtons[role.value][state.status])
    return changeButtons[role.value][state.status];
  else return { label: "", key: "" };
});

const download = async () => {
  link.value.click();
};

onMounted(async () => {
  loading.value = true;
  const { data } = await getRequest(getJobsById({ jobId: route.params.jobId }));
  Object.keys(state).forEach((item) => {
    state[item] = data.data[item];
  });

  body.value = generateBody(data.data.coatings);

  loading.value = false;
});
</script>
