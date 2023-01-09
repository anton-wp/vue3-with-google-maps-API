<template>
  <div
    class="mx-10 mt-10 flex w-full flex-col rounded-lg border border-cinder-50 px-4 py-6"
  >
    <span class="mb-8 flex text-xl font-semibold text-cinder-500"
      >Contact Info</span
    >
    <div class="grid grid-cols-2 gap-6">
      <CInput
        v-for="(item, key) in data"
        :key="key"
        v-model="item.value"
        v-model:errors="errorsForm[key]"
        :name="item.label"
        :placeholder="item.label"
        :rules="item.rules"
        :is-submit="isSubmit"
        :disabled="disabled"
      />
    </div>
    <div class="ml-auto mt-8 flex">
      <c-button
        class="mr-4 h-14 w-44"
        :variant="'secondary-blue'"
        :disabled="disabled"
        @click="emit('editOff')"
      >
        Cancel
      </c-button>
      <c-button class="h-14 w-44" :disabled="disabled" @click="updateForm">
        Save and update
      </c-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { messageErrors } from "@/helpers/errors.js";
import { updateContactInfo } from "@/services/api/contact.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";

const props = defineProps({
  info: Object,
});
const emit = defineEmits(["editOff", "updateInfo"]);

const isSubmit = ref(false);
const disabled = ref(false);

const data = reactive({
  email_for_orders: {
    value: "",
    label: "Email",
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
  fax: {
    value: "",
    label: "Fax",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "fax" }),
      },
    ],
  },
  phone: {
    value: "",
    label: "Phone",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "phone" }),
      },
    ],
  },
  address: {
    value: "",
    label: "Address",
    rules: [
      {
        key: "required",
        message: messageErrors({ key: "required", label: "address" }),
      },
    ],
  },
});
const errorsForm = ref({
  email_for_orders: [],
  fax: [],
  phone: [],
  address: [],
});

const save = () => {
  let obj = {};
  Object.keys(data).forEach((item) => {
    obj[item] = data[item].value;
  });
  return updateContactInfo(obj);
};

const updateForm = async () => {
  isSubmit.value = true;
  if (Object.values(errorsForm.value).flat().length > 0) return;
  disabled.value = true;
  const { data } = await validForm(save(), errorsForm);
  disabled.value = false;
  if (!data) return;
  emit("editOff");
  emit("updateInfo", data);
  isSubmit.value = false;
};

onMounted(() => {
  Object.keys(data).forEach((item) => {
    data[item].value = props.info[item];
  });
});
</script>
