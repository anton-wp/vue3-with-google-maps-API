<template>
  <div
    class="relative"
    :class="{ 'min-h-[10rem]': loader || modelValue.length }"
  >
    <div>
      <div
        class="grid grid-cols-2 gap-4 md:grid-cols-3"
        :class="{ 'xl:flex xl:overflow-x-auto': isScroll }"
      >
        <div
          class="relative h-40 w-full flex-none overflow-hidden rounded-lg"
          :class="{ 'xl:mr-5 xl:w-60': isScroll }"
          v-for="(item, key) in modelValue"
          :key="item.id"
        >
          <button
            class="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded stroke-red-500 text-red-500 shadow-md"
            style="
              background: rgba(255, 255, 255, 0.67);
              backdrop-filter: blur(7px);
            "
            @click="deletePhoto(item.id)"
          >
            <IconBasket class="h-4 w-4" />
          </button>
          <img
            class="h-full w-full object-cover"
            :src="item.original_url"
            alt="picture-roof"
          />
        </div>
      </div>
    </div>
    <Transition name="modal">
      <Loader
        v-if="loader"
        class="absolute top-0 left-0 flex h-full min-h-[10rem] w-full items-center justify-center"
      />
    </Transition>
  </div>
</template>

<script setup>
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { deleteJobImage } from "@/services/api/jobs.js";
import { useToastStore } from "@/stores";

import Loader from "@/components/LoaderComponent.vue";
import IconBasket from "@/components/icons/IconBasket.vue";

const emit = defineEmits(["update:modelValue", "update:loader"]);
const props = defineProps({
  modelValue: Array,
  loader: Boolean,
  jobId: Number | String,
  isScroll: {
    types: Boolean,
    default: true,
  },
});

const deletePhoto = async (image) => {
  emit("update:loader", true);
  const { data } = await getRequest(
    deleteJobImage({ jobId: props.jobId, image })
  );
  useToastStore().addToast("primary", "The image has been deleted!");
  emit("update:modelValue", data.data);
  emit("update:loader", false);
};
</script>
