import { defineStore } from "pinia";
import router from "@/router/index.js";

import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getCustomersList } from "@/services/api/customers.js";

const filter = {
  "filter[search]": "",
  paginate: "10",
  page: "1",
};
export const useCustomersStore = defineStore({
  id: "customers-page",
  state: () => ({
    filter: filter,
    customers: [],
    meta: {},
    loader: false,
  }),
  actions: {
    updateFilter({ key, val }) {
      this.filter[key] = val;
      const query = {};
      Object.keys(this.filter).forEach(
        (item) => this.filter[item] && (query[item] = this.filter[item])
      );
      router.push({
        query: query,
      });
      this.getCustomers(query);
    },
    initFilter(query) {
      this.filter = { ...this.filter, ...query };
      this.getCustomers(query);
    },
    clearFilter() {
      this.filter = filter;
    },
    async getCustomers(query) {
      this.loader = true;
      const { data } = await getRequest(getCustomersList(query));
      if (!data) return;
      this.customers = data.data;
      this.meta = data.meta;
      this.loader = false;
    },
  },
});
