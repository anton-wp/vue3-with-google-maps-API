<template>
  <div class="mt-6">
    <PersonalInfoForm
      class="w-full lg:w-2/3"
      v-if="$route.query.edit === 'true'"
      :is-in-tabs="true"
      :info-block="info"
      :profile="{ user }"
      @update-data="updateUser"
      @reload-profile="reloadProfile"
    />
    <PersonalInfo v-else :is-in-tabs="true" :info-block="info" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { infoBlock } from "@/helpers/profile.js";

import PersonalInfo from "@/components/PersonalInfo.vue";
import PersonalInfoForm from "@/components/PersonalInfoForm.vue";

const props = defineProps({
  user: Object,
});
const emit = defineEmits(["updateUser"]);
const info = infoBlock();
const updateUser = (data) => {
  emit("updateUser", data);
  router.push({ name: route.name });
};

const router = useRouter();
const route = useRoute();
const reloadProfile = (data) => {
  Object.keys(info).forEach((key) => {
    info[key].value = data.user[key] || "";
  });
  router.push({ name: route.name });
};

onMounted(() => {
  reloadProfile(props);
});
</script>
