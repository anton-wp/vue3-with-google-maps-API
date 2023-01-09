import { computed } from "vue";
import { useAuthStore } from "@/stores";

export const role = computed(() => {
  if (useAuthStore().user && useAuthStore().user.user)
    return useAuthStore().user.user.role;
  else return "";
});
