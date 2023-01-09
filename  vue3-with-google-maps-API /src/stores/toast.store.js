import { defineStore } from "pinia";

export const useToastStore = defineStore({
  id: "toast",
  state: function () {
    return {
      toasters: [],
    };
  },
  actions: {
    addToast(type, message) {
      this.toasters = [{ id: Date.now(), type, message }, ...this.toasters];
    },
    removeToast(id) {
      this.toasters = this.toasters.filter((item) => item.id !== id);
    },
  },
});
