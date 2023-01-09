import { defineStore } from "pinia";

export const useStep3Store = defineStore({
  id: "useStep3Store",
  state: () => {
    return {
      tabsCount: 0,
      generalSquareFootage: 0,
      loading: true,
      center: {},
      save: () => {},
    };
  },
  actions: {
    updateState({ tabsCount, generalSquareFootage, save, center }) {
      this.generalSquareFootage = generalSquareFootage;
      if (tabsCount) this.tabsCount = tabsCount;
      if (center) this.center = center;
      if (save) this.save = save;
    },
    toggleLoading(val) {
      this.loading = val;
    },
  },
});
