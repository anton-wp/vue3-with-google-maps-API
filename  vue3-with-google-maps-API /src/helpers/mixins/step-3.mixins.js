import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useToastStore } from "@/stores";

import { useStep3Store } from "@/stores";
import { updateJobs, getRoofDetail } from "@/services/api/jobs.js";
import { clearAll, shapes, setSelection } from "@/helpers/googleMaps/index.js";

export const dataStart = ref([]);

export const options = {
  polygone: {
    strokeColor: "#50F4FF",
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: "#F5F9FE",
    fillOpacity: 0.8,
    editable: true,
    suppressUndo: true,
  },
  polyline: {
    strokeColor: "#50F4FF",
    strokeOpacity: 1,
    strokeWeight: 3,
    editable: true,
    suppressUndo: true,
  },
  marker: {
    draggable: true,
  },
};

export const loading = computed(() => useStep3Store().loading);

export const selectedObject = (zIndex, type) => {
  const shape = shapes.find((item) => item.zIndex === zIndex);
  setSelection({ shape, type });
};

export const start = ({ dataRes, roofDetailId }) => {
  const { updateState, toggleLoading } = useStep3Store();
  const route = useRoute();
  const jobId = route.params.jobId;

  const save = async () => {
    const { data } = await updateJobs({
      data: dataRes.value,
      jobId,
    });
    useToastStore().addToast("primary", "Details were captured!");
    updateState({
      generalSquareFootage: data.data.general_square_footage,
    });
  };
  onBeforeUnmount(() => {
    clearAll();
    dataStart.value = [];
    toggleLoading(true);
  });
  onMounted(async () => {
    toggleLoading(true);
    const { data } = await getRoofDetail({
      roofDetailId,
      jobId,
    });
    dataStart.value = data.job_roof_details;
    updateState({
      tabsCount: data.filled_tabs_count,
      center: data.coordinates,
      generalSquareFootage: data.general_square_footage,
      save,
    });
    toggleLoading(false);
  });
};
