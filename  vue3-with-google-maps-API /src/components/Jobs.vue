<template>
  <div class="flex flex-wrap items-center">
    <h1 v-if="!isInTabs" class="h1 mb-6 lg:mb-12">Jobs</h1>
    <h1 v-else class="mb-6 flex items-center text-xl font-semibold lg:mb-12">
      <ClipBoard class="mr-4 stroke-blue-500" />
      Jobs
    </h1>
    <div class="ml-auto mb-6 lg:mb-12">
      <CSelectWithFind
        v-if="['admin'].includes(role) && !isInTabs"
        class="ml-4 h-12 w-48 first:ml-0"
        :modelValue="jobsState.filter[`filter[customer]`].split(',')"
        :options="options['customer']"
        @update:modelValue="changeFilter(`filter[customer]`, $event.join())"
      />
      <CSelect
        v-for="item in selects"
        class="ml-4 h-12 w-40 first:ml-0"
        :modelValue="jobsState.filter[`filter[${item}]`]"
        :options="options[item]"
        @update:modelValue="changeFilter(`filter[${item}]`, $event)"
      />
    </div>
  </div>
  <Loader v-if="jobsState.loader" />
  <template v-else-if="body.length > 0">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:block">
      <c-table :header="header" :body="body">
        <template #buttons="{ id, status }">
          <TableButtons
            :id="id"
            :openId="openId"
            :status="status"
            @closeButtons="closeButtons(id)"
          />
        </template>
      </c-table>
    </div>
    <div class="mt-8 flex w-full flex-wrap items-center justify-between">
      <JobsPerPage
        class="order-2 mt-2 h-9 items-center lg:order-1 lg:mt-0"
        :modelValue="jobsState.filter.paginate"
        @update:modelValue="changeFilter('paginate', $event)"
      />
      <Pagination
        class="order-1 w-full items-center justify-between lg:order-2 lg:w-auto"
        :modelValue="jobsState.meta.current_page"
        :pages="jobsState.meta.last_page"
        @update:modelValue="changeFilter('page', $event)"
      />
    </div>
  </template>
  <EmptyJobs v-else style="min-height: calc(100vh - 20rem)" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { body, header, options, selects } from "@/helpers/jobs.js";
import { useJobsStore } from "@/stores";
import { role } from "@/helpers/role.js";

import Loader from "@/components/LoaderPage.vue";
import CTable from "@/components/Table/index.vue";
import TableButtons from "@/components/Table/TableButtons.vue";
import CSelect from "@/components/Select.vue";
import CSelectWithFind from "@/components/SelectWithFind.vue";
import EmptyJobs from "@/components/EmptyJobs.vue";
import Pagination from "@/components/pagination/index.vue";
import JobsPerPage from "@/components/JobsPerPage.vue";
import ClipBoard from "@/components/icons/IconClipBoard.vue";

const props = defineProps({
  isInTabs: {
    types: Boolean,
    default: false,
  },
});

const route = useRoute();

const jobsActions = useJobsStore();
const jobsState = computed(() => useJobsStore());

const changeFilter = (key, val) => {
  jobsActions.updateFilter({ key, val });
};

const openId = ref()
const closeButtons = (e) => {
  openId.value = e
};

onMounted(() => {
  const customerId = props.isInTabs ? route.params.customerId : null;
  jobsActions.initFilter(route.query, customerId);
});
</script>
