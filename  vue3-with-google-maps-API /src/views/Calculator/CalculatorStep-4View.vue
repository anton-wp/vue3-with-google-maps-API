<template>
  <EstimateBlock
    v-if="!state.loading"
    v-model:price="state.price"
    v-model:comment="state.comment"
    :is-table="true"
    :body="body"
  />
  <Loader v-else />
  <ButtonsBlock
    class="float-right mb-6 mt-16"
    :secondary-title="'Back'"
    :primary-title="'Save'"
    @secondaryEvent="back()"
    @primaryEvent="save()"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getJobsById, updateJobs } from "@/services/api/jobs.js";
import { useToastStore } from "@/stores";
import { generateBody, getCoatings } from "@/helpers/job.js";

import Loader from "@/components/LoaderPage.vue";
import EstimateBlock from "@/components/EstimateBlock.vue";
import ButtonsBlock from "@/components/ButtonsBlock.vue";

const state = reactive({
  price: "",
  comment: "",
  loading: true,
});

const route = useRoute();
const router = useRouter();

const back = () => {
  router.push({ name: "CalculatorStep-3", params: route.params });
};
const save = async () => {
  const coatings = getCoatings(body.value);
  const data = {
    coatings,
    comment: state.comment,
  };
  await getRequest(updateJobs({ data, jobId: route.params.jobId }));
  useToastStore().addToast("primary", "Details were captured!");
  router.push({ name: "Jobs" });
};

const body = ref([]);

onMounted(async () => {
  state.loading = true;
  const { data } = await getRequest(getJobsById({ jobId: route.params.jobId }));
  state.price = data.data.price;
  state.comment = data.data.comment;
  body.value = generateBody(data.data.coatings);
  state.loading = false;
});
</script>
