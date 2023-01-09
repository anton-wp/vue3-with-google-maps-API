<template>
  <modal
    :show="modelValue"
    :modal-class="'w-[552px]'"
    @close="emit('update:modelValue', false)"
  >
    <div class="px-6 pb-4 pt-6">
      <h2 class="h2 mb-9">Upload profile photo</h2>
      <div
        class="relative flex h-56 w-full flex-col items-center justify-center rounded-lg border border-dashed border-cinder-200"
      >
        <template v-if="!urlImage">
          <label for="uploadFile" class="mb-2 flex cursor-pointer">
            <IconPlus class="mr-3 stroke-cinder-100" />
            <span class="text-cinder-500">Upload photo</span>
            <input
              id="uploadFile"
              name="uploadFile"
              type="file"
              class="hidden"
              :accept="'image/x-png,image/jpeg,image/jpg'"
              multiple
              @change="updatePhoto"
            />
          </label>
          <span
            class="text-xs"
            :class="{ 'text-cinder-200': !error, 'text-red-600': error }"
          >
            PNG or Jpeg file (to 5MB)
          </span>
        </template>
        <template v-else>
          <img
            class="absolute h-full w-full object-contain"
            :src="urlImage"
            alt="photo"
          />
          <div
            class="absolute bottom-3 right-3 flex h-8 w-24 cursor-pointer items-center justify-center rounded stroke-red-500 text-red-500 shadow-md"
            style="
              background: rgba(255, 255, 255, 0.5);
              backdrop-filter: blur(16px);
            "
            @click="deletePhoto()"
          >
            <IconBasket class="mr-2 h-4 w-4" />
            Delete
          </div>
        </template>
      </div>
    </div>
    <div class="mt-9 flex justify-end bg-havelock-blue-tb px-8 py-4">
      <c-button
        class="mr-4 h-10 w-20"
        :size="'sm'"
        :variant="'secondary-blue'"
        @click="emit('update:modelValue', false)"
      >
        Cancel
      </c-button>
      <c-button class="h-10 w-40" :size="'sm'" @click="save()">
        Set as profile photo
      </c-button>
    </div>
  </modal>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { saveAvatar, deleteAvatar } from "@/services/api/profile.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";

import IconPlus from "@/components/icons/IconPlus.vue";
import IconBasket from "@/components/icons/IconBasket.vue";
import Modal from "@/components/Modal.vue";
import CButton from "@/components/Button.vue";

const emit = defineEmits(["update:modelValue", "updateUser"]);
const props = defineProps({
  modelValue: Boolean,
  profile: Object,
});

watch(
  () => props.modelValue,
  () => {
    file.value = null;
    isDelete.value = false;
  }
);
const error = ref(false);
const file = ref(null);
const urlImage = computed(() => {
  if (file.value) return URL.createObjectURL(file.value);
  else if (props.profile.has_avatar && props.profile.avatar && !isDelete.value)
    return props.profile.avatar;
  else return null;
});
const updatePhoto = (e) => {
  const fileEvent = e.target.files[0];
  if (fileEvent.size > 5000000) {
    error.value = true;
    return;
  }
  file.value = fileEvent;
};
const isDelete = ref(false);
const deletePhoto = () => {
  file.value = null;
  isDelete.value = true;
};

const save = async () => {
  let res;
  if (file.value) {
    const data = new FormData();
    data.append("avatar", file.value);
    res = await getRequest(saveAvatar(data));
  } else if (
    props.profile.has_avatar &&
    props.profile.avatar &&
    isDelete.value
  ) {
    res = await getRequest(deleteAvatar());
  }
  if (res) emit("updateUser", res.data.data);

  emit("update:modelValue", false);
};
</script>
