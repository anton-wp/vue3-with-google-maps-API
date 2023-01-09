<template>
  <Loader v-if="isLoading" />
  <div v-else class="relative flex flex-wrap justify-center pb-8">
    <ContactHeader />
    <template v-if="!isEdit">
      <div class="z-10 mx-12 mt-8 w-full rounded-lg bg-white pt-10 shadow-md">
        <ContactInfo :info="info" />
      </div>
      <c-button class="mt-8 mr-12 ml-auto h-14 w-44" @click="isEdit = true">
        Edit
      </c-button>
    </template>
    <EditBlock
      v-else
      :info="info"
      @edit-off="isEdit = false"
      @update-info="updateInfo"
    />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getContactInfo } from "@/services/api/contact.js";

import Loader from "@/components/LoaderPage.vue";
import ContactHeader from "@/components/ContactHeader.vue";
import ContactInfo from "@/components/ContactInfo.vue";
import CButton from "@/components/Button.vue";

import EditBlock from "@/views/ContactInfoView/components/ContactInfoViewEditBlock.vue";

const isLoading = ref(true);
const isEdit = ref(false);

const info = reactive({
  address: "",
  email_for_orders: "",
  fax: "",
  phone: "",
});

const updateInfo = (data) => {
  Object.keys(info).map((item) => {
    info[item] = data[item];
  });
};
onMounted(async () => {
  isLoading.value = true;
  const { data } = await getRequest(getContactInfo());
  updateInfo(data);
  isLoading.value = false;
});
</script>
