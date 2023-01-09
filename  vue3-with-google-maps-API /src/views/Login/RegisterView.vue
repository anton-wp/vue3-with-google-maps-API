<template>
  <form class="my-auto h-fit w-5/6" @submit.prevent="submit()">
    <h1 class="h1 my-8 flex w-full">Sign up</h1>
    <div class="mb-6 flex">
      <CInput
        class="mr-5"
        style="width: calc(50% - 10px)"
        v-model="data.first_name"
        v-model:errors="errors.first_name"
        :disabled="disabled"
        :placeholder="'First Name'"
        :is-submit="isSubmit"
        :rules="[
          {
            key: 'required',
            message: messageErrors({ key: 'required', label: 'first name' }),
          },
          {
            key: 'letters',
            message: messageErrors({ key: 'letters', label: 'first name' }),
          }
        ]"
      />
      <CInput
        style="width: calc(50% - 10px)"
        v-model="data.last_name"
        v-model:errors="errors.last_name"
        :disabled="disabled"
        :placeholder="'Last Name'"
        :is-submit="isSubmit"
        :rules="[
          {
            key: 'required',
            message: messageErrors({ key: 'required', label: 'last name' }),
          },
          {
            key: 'letters',
            message: messageErrors({ key: 'letters', label: 'last name' }),
          },
        ]"
      />
    </div>
    <CInput
      class="mb-6"
      v-model="data.email"
      v-model:errors="errors.email"
      :disabled="disabled"
      :placeholder="'Email'"
      :is-submit="isSubmit"
      :rules="[
        {
          key: 'required',
          message: messageErrors({ key: 'required', label: 'email' }),
        },
        {
          key: 'email',
          message: messageErrors({ key: 'email', label: 'email' }),
        },
      ]"
    />
    <c-input
      class="mb-2 stroke-cinder-300"
      v-model="data.password"
      v-model:errors="errors.password"
      :disabled="disabled"
      :placeholder="'Password'"
      :type="typePassword"
      :is-submit="isSubmit"
      :is-message="false"
      :rules="[
        { key: 'required', message: 'required' },
        { key: 'minLength', message: 'More than 8 characters', min: 8 },
        { key: 'includesNumber', message: 'Number' },
        { key: 'uppercase', message: 'Upper-case letter' },
        { key: 'lowercase', message: 'Lower-case letter' },
      ]"
    >
      <template #image>
        <IconShow
          v-if="typePassword === 'text'"
          @click="typePassword = 'password'"
        />
        <IconHide v-else @click="typePassword = 'text'" />
      </template>
    </c-input>
    <ValidPasswordBlock
      :errors-value="errors.password"
      :errors-message="[
        'Lower-case letter',
        'Upper-case letter',
        'Number',
        'More than 8 characters',
      ]"
      class="mb-5"
    />
    <c-input
      class="mb-4 stroke-cinder-300"
      v-model="data.password_confirmation"
      v-model:errors="errors.password_confirmation"
      :disabled="disabled"
      :placeholder="'Confirm password'"
      :type="typeConfirmPassword"
      :is-submit="isSubmit"
      :rules="[
        {
          key: 'match',
          message: messageErrors({
            key: 'match',
            label: 'confirm password',
            helper: 'password',
          }),
          matchValue: data.password,
        },
      ]"
    >
      <template #image>
        <IconShow
          v-if="typeConfirmPassword === 'text'"
          @click="typeConfirmPassword = 'password'"
        />
        <IconHide v-else @click="typeConfirmPassword = 'text'" />
      </template>
    </c-input>

    <!-- <CCheckbox
      class="mb-14 w-full"
      v-model="isDataProcessing"
      v-model:errors="errors.data_processing"
      :is-submit="isSubmit"
      :name="'Agree'"
      :label="'I agree to data processing'"
      :rules="[
        {
          key: 'checked',
          message: 'err',
        },
      ]"
    /> -->

    <c-button class="mb-8 h-14 w-full" :disabled="disabled">
      Continue
    </c-button>
    <span class="mb-8 flex w-full justify-center">Or Sign up with</span>
    <a
      class="text-normal mb-8 flex h-14 w-full items-center justify-center rounded border border-cinder-100 font-semibold text-cinder-500 duration-300 active:bg-cinder-50 disabled:opacity-40"
      :href="googleLink"
    >
      <IconGoogle class="mr-3" />
      Google
    </a>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/services/api/login.js";
import { messageErrors } from "@/helpers/errors.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import ValidPasswordBlock from "@/components/Login/ValidPasswordBlock.vue";
import CCheckbox from "@/components/Checkbox.vue";
import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import IconShow from "@/components/icons/IconShowPassword.vue";
import IconHide from "@/components/icons/IconHidePassword.vue";

const googleLink = `${import.meta.env.VITE_BASE_URL_BACK}social/google`;

const data = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const errors = ref({
  first_name: [],
  last_name: [],
  email: [],
  password: [],
  password_confirmation: [],
  data_processing: [],
});
const isDataProcessing = ref(false);

const disabled = ref(false);

const typePassword = ref("password");
const typeConfirmPassword = ref("password");

const remember = ref(false);
const isSubmit = ref(false);

const router = useRouter();

const submit = async () => {
  isSubmit.value = true;
  if (Object.values(errors.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(register(data), errors);
  disabled.value = false;
  if (!res) return;
  router.push({
    name: "ConfirmEmail",
    query: {
      first_name: data.first_name,
      last_name: data.last_name,
      access_token: res.data.access_token,
    },
  });
};
</script>
