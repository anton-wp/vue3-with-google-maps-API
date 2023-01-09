import { computed, ref, watch } from "vue";
import { putReadNotif } from "@/services/api/notifications.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";

export const container = ref(null);
export const arrNotif = ref([]);

export const modalHeight = computed(() => {
  if (!container.value || !Object.keys(divs.value).length)
    return { min: 0, max: 0 };
  return {
    min: container.value.getBoundingClientRect().top,
    max:
      container.value.getBoundingClientRect().height +
      container.value.getBoundingClientRect().top,
  };
});

export const changePosition = () => {
  Object.values(divs.value).forEach(async (item) => {
    if (!item) return;
    const pos =
      item.getBoundingClientRect().top + item.getBoundingClientRect().height;
    const notifIndex = arrNotif.value.findIndex((i) => i.id === item.id);
    if (notifIndex < 0) return;
    if (
      !arrNotif.value[notifIndex].read_at &&
      modalHeight.value.min <= pos &&
      modalHeight.value.max >= pos
    ) {
      arrNotif.value[notifIndex].read_at = true;
      await getRequest(putReadNotif(item.id));
    }
  });
};
export const divs = ref({});

export const generateRef = (el, key) => {
  divs.value[key] = el;
};
export const start = ({ isOpenNotif }) => {
  watch(
    () => modalHeight.value,
    async () => {
      if (!isOpenNotif.value) return;
      changePosition();
    }
  );
};
