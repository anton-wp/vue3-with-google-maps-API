<template>
  <Loader v-if="isLoading" />
  <div v-else class="relative flex flex-wrap pb-8 lg:flex-nowrap">
    <ContactHeader class="absolute" />
    <div class="z-10 w-full pt-36 lg:w-[380px] lg:min-w-[380px] lg:pt-40">
      <InfoCard
        :profile="profileInfoCard"
        :is-email-no-verified="isEmailNoVerified"
        @update-data="updateUser"
      />
    </div>
    <div class="flex w-full flex-col px-8 pt-8 lg:pt-[318px] lg:pl-8 lg:pr-12">
      <ShowInfo v-if="!isEdit" :info-block="info" />
      <template v-else>
        <Back class="mb-6" :to="{ name: 'Profile', query: {} }" />
        <ShowForm
          :profile="profile"
          :info-block="info"
          @update-data="updateUser"
          @reload-profile="reloadProfile"
        />
        <PasswordForm @open-success-modal="openSuccessModal" />
      </template>
    </div>
    <SuccessModal
      v-model="isOpenSuccessModal"
      :message="'Your profile has been updated'"
    />
    <ResendModal v-model="isShowResendModal" @resend="resend" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { getProfile } from "@/services/api/profile.js";
import { resendEmailWithVerification } from "@/services/api/login.js";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { infoBlock } from "@/helpers/profile.js";
import { useAuthStore } from "@/stores";

import Loader from "@/components/LoaderPage.vue";
import ContactHeader from "@/components/ContactHeader.vue";
import ShowInfo from "@/components/PersonalInfo.vue";
import Back from "@/components/Back.vue";
import InfoCard from "@/views/ProfileView/components/ProfileViewInfoCard.vue";
import ShowForm from "@/components/PersonalInfoForm.vue";
import PasswordForm from "@/views/ProfileView/components/ProfileViewPasswordForm.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import ResendModal from "@/views/ProfileView/components/ProfileViewResendModal.vue";

const route = useRoute();
const info = infoBlock(true);
const isEdit = computed(() => {
  return !!route.query.edit;
});

watch(
  () => isEdit.value,
  (val) => {
    if (!val) reloadProfile(profile.value);
  }
);

const profile = ref({});
const profileInfoCard = computed(() => {
  if (profile.value) return { ...profile.value.jobs, ...profile.value.user };
  return {};
});

const isLoading = ref(true);

const isShowResendModal = ref(false);
const isOpenSuccessModal = ref(false);
const openSuccessModal = () => {
  isOpenSuccessModal.value = true;
};
const updateUser = (user) => {
  openSuccessModal();
  useAuthStore().updateUser(user);
  profile.value = { ...profile.value, user: user };
};
const reloadProfile = (data) => {
  profile.value = data;
  Object.keys(info).forEach((key) => {
    info[key].value = data.user[key] || "";
  });
};

onMounted(async () => {
  isLoading.value = true;
  const res = await getRequest(getProfile());
  if (!res) return;
  reloadProfile(res.data);
  useAuthStore().updateUser(res.data.user);
  isLoading.value = false;
});

const isEmailNoVerified = computed(
  () => useAuthStore().userInfo && !useAuthStore().userInfo.email_verified_at
);

const resend = () => {
  resendEmailWithVerification();
  isShowResendModal.value = false;
};
onBeforeRouteLeave(() => {
  if (isEmailNoVerified.value) isShowResendModal.value = true;
});
</script>
