<template>
  <form-container class="mb-6" :icon="IconLock">
    <template #title>Password</template>
    <template #content>
      <form class="mt-6 flex flex-col" @submit.prevent="updatePassword()">
        <div class="flex flex-wrap">
          <c-input
            v-for="(item, key) in passwords"
            class="mb-4 w-1/2 stroke-cinder-300 pr-4 even:pr-0 lg:w-full lg:pr-0 2xl:w-1/3 2xl:first:pr-4 2xl:last:pr-0 2xl:even:pr-4"
            v-model="item.value"
            v-model:errors="errorsPasswords[key]"
            :placeholder="item.placeholder"
            :type="item.type"
            :is-submit="isSubmitPassword"
            :rules="item.rules"
            :autocomplete="'new-password'"
            :disabled="disabled"
          >
            <template #image>
              <IconShow
                v-if="item.type === 'text'"
                @click="item.type = 'password'"
              />
              <IconHide v-else @click="item.type = 'text'" />
            </template>
          </c-input>
        </div>
        <div class="mt-2 flex">
          <c-button
            class="mr-4 h-14 w-44"
            :variant="'secondary-blue'"
            :disabled="disabled"
            @click.prevent="clearPasswords()"
          >
            Cancel
          </c-button>
          <c-button class="h-14 w-44" :disabled="disabled" @click.submit="">
            Save and update
          </c-button>
        </div>
      </form>
    </template>
  </form-container>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from "vue";
import { messageErrors } from "@/helpers/errors.js";

import { resetPassword } from "@/services/api/profile.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconShow from "@/components/icons/IconShowPassword.vue";
import IconHide from "@/components/icons/IconHidePassword.vue";
import FormContainer from "@/views/ProfileView/components/ProfileViewFormContainer.vue";

const emit = defineEmits(["openSuccessModal"]);

const isSubmitPassword = ref(false);

const matchValue = ref("");
const passwords = reactive({
  current_password: {
    value: "",
    type: "password",
    placeholder: "Old password",
    rules: [
      {
        key: "required",
        message: messageErrors({
          key: "required",
          label: "old password",
        }),
      },
      {
        key: "minLength",
        message: messageErrors({
          key: "minLength",
          label: "old password",
          helper: 8,
        }),
        min: 8,
      },
      {
        key: "includesNumber",
        message: messageErrors({
          key: "includesNumber",
          label: "old password",
        }),
      },
      {
        key: "uppercase",
        message: messageErrors({
          key: "uppercase",
          label: "old password",
        }),
      },
      {
        key: "lowercase",
        message: messageErrors({
          key: "lowercase",
          label: "old password",
        }),
      },
    ],
  },
  password: {
    value: "",
    type: "password",
    placeholder: "New Password",
    rules: [
      {
        key: "required",
        message: messageErrors({
          key: "required",
          label: "new password",
        }),
      },
      {
        key: "minLength",
        message: messageErrors({
          key: "minLength",
          label: "new password",
          helper: 8,
        }),
        min: 8,
      },
      {
        key: "includesNumber",
        message: messageErrors({
          key: "includesNumber",
          label: "new password",
        }),
      },
      {
        key: "uppercase",
        message: messageErrors({
          key: "uppercase",
          label: "new password",
        }),
      },
      {
        key: "lowercase",
        message: messageErrors({
          key: "lowercase",
          label: "new password",
        }),
      },
    ],
  },
  password_confirmation: {
    value: "",
    type: "password",
    placeholder: "Confirm password",
    rules: [
      {
        key: "match",
        message: messageErrors({
          key: "matchPasswords",
        }),
        matchValue: matchValue,
      },
    ],
  },
});

watch(
  () => passwords.password.value,
  (val) => {
    matchValue.value = val;
  }
);

const errorsPasswords = ref({
  current_password: [],
  password: [],
  password_confirmation: [],
});
const clearPasswords = async () => {
  const keys = Object.keys(passwords);
  const values = Object.values(passwords);
  for (let i = 0; i < values.length; i++) {
    passwords[keys[i]].value = "";
    await nextTick();
  }
  matchValue.value = "";
  isSubmitPassword.value = false;
};
const getPasswords = () => {
  const data = {};
  const keys = Object.keys(passwords);
  const values = Object.values(passwords);
  for (let i = 0; i < values.length; i++) {
    data[keys[i]] = passwords[keys[i]].value;
  }
  return data;
};

const disabled = ref(false);
const updatePassword = async () => {
  isSubmitPassword.value = true;
  if (Object.values(errorsPasswords.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(resetPassword(getPasswords()), errorsPasswords);
  disabled.value = false;
  if (!res || res.code === "ERR_BAD_REQUEST") return;
  clearPasswords();
  emit("openSuccessModal");
};
</script>
