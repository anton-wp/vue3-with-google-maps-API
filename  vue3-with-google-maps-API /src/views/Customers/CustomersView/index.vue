<template>
  <div class="container-dashboard-page">
    <div class="flex flex-wrap items-center">
      <h1 class="h1 mb-6 lg:mb-12">Сustomers</h1>
    </div>
    <Loader v-if="state.loader" />
    <template v-else-if="body.length > 0">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:block">
        <c-table :header="header" :body="body">
          <template #buttons="{ id }">
            <TableButtons :id="id" />
          </template>
        </c-table>
      </div>
      <div class="mt-8 flex w-full flex-wrap items-center justify-between">
        <JobsPerPage
          class="order-2 mt-2 h-9 items-center lg:order-1 lg:mt-0"
          :modelValue="state.filter.paginate"
          @update:modelValue="changeFilter('paginate', $event)"
        />
        <Pagination
          class="order-1 w-full items-center justify-between lg:order-2 lg:w-auto"
          :modelValue="state.meta.current_page"
          :pages="state.meta.last_page"
          @update:modelValue="changeFilter('page', $event)"
        />
      </div>
    </template>
    <EmptyCustomers v-else style="min-height: calc(100vh - 20rem)" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { body, header } from "@/helpers/customers.js";
import { useCustomersStore } from "@/stores";

import Loader from "@/components/LoaderPage.vue";
import EmptyCustomers from "@/components/EmptyCustomers.vue";
import CTable from "@/components/Table/index.vue";
import TableButtons from "@/components/Table/TableButtons.vue";
import Pagination from "@/components/pagination/index.vue";
import JobsPerPage from "@/components/JobsPerPage.vue";

const route = useRoute();

const actions = useCustomersStore();
const state = computed(() => useCustomersStore());

const changeFilter = (key, val) => {
  actions.updateFilter({ key, val });
};

onMounted(() => {
  actions.initFilter(route.query);
});
</script>
