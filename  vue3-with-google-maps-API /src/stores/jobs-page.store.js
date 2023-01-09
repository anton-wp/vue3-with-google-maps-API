import { defineStore } from "pinia";
import router from "@/router/index.js";

import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getJobsList, deleteJobById } from "@/services/api/jobs.js";
import { getJobsByCustomerId } from "@/services/api/customers.js";

const filter = {
  "filter[search]": "",
  "filter[period]": null,
  "filter[status]": null,
  "filter[customer]": "",
  paginate: "10",
  page: "1",
};
export const useJobsStore = defineStore({
  id: "jobs-page",
  state: () => ({
    filter: filter,
    jobs: [],
    customers: [],
    meta: {},
    customerId: null,
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
      this.getJobs(query);
    },
    initFilter(query, customerId) {
      this.customerId = customerId;
      this.filter = { ...this.filter, ...query };
      this.getJobs(query);
    },
    clearFilter() {
      this.filter = filter;
    },
    async getJobs(query) {
      this.loader = true;
      const { data } = await getRequest(
        this.customerId
          ? getJobsByCustomerId(query, this.customerId)
          : getJobsList(query)
      );
      if (!data) return;
      if (data.customers) {
        this.customers = Object.keys(data.customers).map((item) => {
          return {
            value: item,
            label: data.customers[item],
          };
        });
      }
      this.jobs = data.jobs;
      this.meta = data.meta;
      this.loader = false;
    },
    async deleteJobs(id, query) {
      this.loader = true;
      const { data } = await getRequest(deleteJobById(id, query));
      if (!data) return;
      this.jobs = data.jobs;
      this.meta = data.meta;
      this.loader = false;
    },
  },
});
