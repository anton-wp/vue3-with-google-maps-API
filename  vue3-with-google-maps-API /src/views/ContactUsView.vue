<template>
  <Loader v-if="isLoading" />
  <div
    v-else
    class="relative flex flex-wrap justify-center pb-8 lg:flex-nowrap"
  >
    <ContactHeader class="absolute" />
    <div
      class="z-10 mx-12 mt-32 mb-6 w-full rounded-lg bg-white pt-10 shadow-md lg:mx-10 lg:mt-28 lg:mb-24"
    >
      <div class="px-12">
        <h1 class="h1 mb-6">Contact us</h1>
        <div class="flex flex-wrap">
          <CInput
            v-for="(item, key) in contactUs"
            :key="key"
            class="mb-6 flex justify-between first:pr-6 last:mb-0"
            :class="{
              'w-1/2': ['name', 'email'].includes(key),
            }"
            v-model="item.value"
            v-model:errors="errorsForm[key]"
            :name="item.label"
            :placeholder="item.label"
            :rules="item.rules"
            :is-submit="isSubmit"
            :disabled="disabled"
          />
        </div>
        <c-button
          class="mt-6 mb-24 h-14 w-44"
          :disabled="disabled"
          @click="updateForm()"
        >
          Send
        </c-button>
      </div>
      <ContactInfo class="bg-havelock-blue-tb" :info="info" />
    </div>
    <SuccessModal
      v-model="isOpenSuccessModal"
      message="Your message was sent"
    />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import { getContactInfo, sendSupport } from "@/services/api/contact.js";
import { messageErrors } from "@/helpers/errors.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import Loader from "@/components/LoaderPage.vue";
import ContactHeader from "@/components/ContactHeader.vue";
import ContactInfo from "@/components/ContactInfo.vue";
import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";
import SuccessModal from "@/components/SuccessModal.vue";

const isLoading = ref(true);
const isSubmit = ref(false);
const disabled = ref(false);

const info = reactive({
  address: "",
  email_for_orders: "",
  fax: "",
  phone: "",
});

const contactUs = reactive({
  name: {
    value: "",
    label: "Name*",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "name" }),
      },
    ],
  },
  email: {
    value: "",
    label: "Email*",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "email" }),
      },
      {
        key: "email",
        message: messageErrors({ key: "email", label: "email" }),
      },
    ],
  },
  phone: {
    value: "",
    label: "Phone number",
    rules: [],
  },
  message: {
    value: "",
    label: "Message*",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "last name" }),
      },
    ],
  },
});

const errorsForm = ref({
  name: [],
  email: [],
  phone: [],
  message: [],
});
const save = () => {
  let data = {};
  Object.keys(contactUs).forEach((item) => {
    data[item] = contactUs[item].value;
  });
  return sendSupport(data);
};

const isOpenSuccessModal = ref(false);
const updateForm = async () => {
  isSubmit.value = true;
  if (Object.values(errorsForm.value).flat().length > 0) return;
  disabled.value = true;
  await validForm(save(), errorsForm);
  disabled.value = false;
  // if (!res) return;
  Object.keys(contactUs).map((item) => {
    contactUs[item].value = "";
  });
  isOpenSuccessModal.value = true;
  isSubmit.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  const { data } = await getRequest(getContactInfo());
  Object.keys(info).map((item) => {
    info[item] = data[item];
  });
  isLoading.value = false;
});
</script>
