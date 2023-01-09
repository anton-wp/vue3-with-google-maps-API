<template>
  <div
    class="relative mx-auto grid w-11/12 grid-cols-2 rounded-lg bg-white shadow-md lg:ml-auto lg:mr-0 lg:w-80 lg:grid-cols-1"
  >
    <div
      class="flex flex-col items-center border-r border-blue-50 pt-8 lg:border-none lg:pt-12"
    >
      <div class="relative mb-6 h-36 w-36">
        <img
          class="h-full w-full rounded-full object-cover"
          alt="profile image"
          :src="profile.avatar"
        />
        <button
          class="absolute bottom-1 right-3 flex h-8 w-8"
          @click="isShowPhotoModal = true"
        >
          <IconPhoto />
        </button>
      </div>
      <span class="mb-8 font-semibold text-cinder-500">
        {{ profile.full_name }}
      </span>
    </div>
    <div class="relative w-full lg:mb-24">
      <div
        class="absolute top-20 flex w-full flex-col items-center lg:relative lg:top-0"
      >
        <div class="mb-6 grid w-max grid-cols-2 gap-4">
          <div
            class="flex flex-col items-center rounded bg-havelock-blue-tb py-2"
            v-for="(item, key) in cards"
            :key="key"
            :class="{
              'w-32 first:col-span-2 first:w-full': ['admin'].includes(role),
              'w-32': !['admin'].includes(role),
            }"
          >
            <span class="text-2xl font-semibold text-blue-500">{{
              item.value
            }}</span>
            <span class="text-sm text-cinder-300">{{ item.label }}</span>
          </div>
        </div>
        <div
          class="flex h-12 w-full items-center justify-center bg-blue-500 text-white"
        >
          <span class="mr-2 text-2xl font-semibold">{{
            profile.jobs_count
          }}</span>
          <span class="text-sm">Total jobs</span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col items-center border-r border-blue-50 pb-6 lg:border-none lg:pb-8"
    >
      <c-button
        v-if="isEmailNoVerified"
        class="mb-4 h-12 w-64"
        :variant="'secondary-gray'"
        @click="resendEmailWithVerification()"
      >
        Resend email
      </c-button>
      <c-button
        class="mb-4 h-12 w-64"
        :variant="'secondary-gray'"
        @click="isShowDelModal = true"
      >
        Delete profile
      </c-button>
      <c-button class="h-12 w-64" :variant="'secondary-gray'" @click="logout()">
        <span>Log Out</span>
        <IconLogOut class="ml-3" />
      </c-button>
    </div>
  </div>
  <DeleteModal v-model="isShowDelModal" @delete="deleteProfile()" />
  <PhotoModal
    v-model="isShowPhotoModal"
    :profile="profile"
    @update-user="emit('updateData', $event)"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores";
import { deleteProfile } from "@/services/api/profile.js";
import { resendEmailWithVerification } from "@/services/api/login.js";
import { role } from "@/helpers/role.js";

import CButton from "@/components/Button.vue";
import IconLogOut from "@/components/icons/IconLogOutReverse.vue";
import IconPhoto from "@/components/icons/IconPhoto.vue";
import DeleteModal from "@/views/ProfileView/components/ProfileViewDeleteModal.vue";
import PhotoModal from "@/views/ProfileView/components/ProfileViewPhotoModal.vue";

const emit = defineEmits(["updateData"]);
const props = defineProps({
  profile: Object,
  isEmailNoVerified: Boolean,
});
const isShowDelModal = ref(false);
const isShowPhotoModal = ref(false);

const cards = computed(() => {
  let cardsArr = [
    {
      label: "In progress",
      value: props.profile.jobs_in_progress_count,
    },
    {
      label: "Ordered",
      value: props.profile.jobs_ordered_count,
    },
    {
      label: "Finished",
      value: props.profile.jobs_finished_count,
    },
  ];
  if (!["admin"].includes(role.value)) {
    cardsArr = [
      {
        label: "Drafts",
        value: props.profile.jobs_draft_count,
      },
      ...cardsArr,
    ];
  }
  return cardsArr;
});

const authStore = computed(() => useAuthStore());

const logout = () => {
  authStore.value.logout();
};
</script>
