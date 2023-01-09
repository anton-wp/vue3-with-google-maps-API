<template>
  <form-container :icon="IconContact" :is-in-tabs="isInTabs">
    <template #title>Personal Info</template>
    <template #content>
      <div class="mt-6 flex flex-wrap">
        <CInput
          v-for="(item, key) in infoBlock"
          :key="key"
          class="mb-6 flex justify-between first:pr-6 last:mb-0"
          :class="{
            'w-1/2': ['first_name', 'last_name'].includes(key),
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
      <div class="flex pt-10 lg:mt-auto" :class="{ 'ml-auto': isInTabs }">
        <c-button
          class="mr-4 h-14 w-44"
          :variant="'secondary-blue'"
          :disabled="disabled"
          @click="emit('reloadProfile', profile)"
        >
          Cancel
        </c-button>
        <c-button class="h-14 w-44" :disabled="disabled" @click="updateForm()">
          Save and update
        </c-button>
      </div>
    </template>
  </form-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { updateProfile } from "@/services/api/profile.js";
import { putCustomerById } from "@/services/api/customers.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";
import IconContact from "@/components/icons/IconContact.vue";
import FormContainer from "@/views/ProfileView/components/ProfileViewFormContainer.vue";

const emit = defineEmits(["updateData", "reloadProfile"]);
const props = defineProps({
  infoBlock: Object,
  profile: Object,
  isInTabs: {
    types: Boolean,
    default: false,
  },
});

const isSubmit = ref(false);

const errorsForm = ref({
  first_name: [],
  last_name: [],
  email: [],
  phone: [],
});
const getData = () => {
  const data = {};
  const keys = Object.keys(props.infoBlock);
  const values = Object.values(props.infoBlock);
  for (let i = 0; i < values.length; i++) {
    data[keys[i]] = props.infoBlock[keys[i]].value;
  }
  return data;
};
const route = useRoute();
const disabled = ref(false);
const save = props.isInTabs
  ? () => putCustomerById(route.params.customerId, getData())
  : () => updateProfile(getData());
const updateForm = async () => {
  isSubmit.value = true;
  if (Object.values(errorsForm.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(save(), errorsForm);
  disabled.value = false;
  if (!res) return;
  emit("updateData", props.isInTabs ? res.data.user : res.data.data);
};
</script>
