<template>
  <form class="my-auto h-fit w-5/6" @submit.prevent="submit()">
    <h1 class="h1 my-8 flex w-full">Password recovery</h1>
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

    <c-button class="mb-8 h-14 w-full" :disabled="disabled">
      Continue
    </c-button>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "@/services/api/login.js";
import { messageErrors } from "@/helpers/errors.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import ValidPasswordBlock from "@/components/Login/ValidPasswordBlock.vue";
import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";
import IconShow from "@/components/icons/IconShowPassword.vue";
import IconHide from "@/components/icons/IconHidePassword.vue";

const data = reactive({
  password: "",
  password_confirmation: "",
});
const errors = ref({
  password: [],
  password_confirmation: [],
});

const typePassword = ref("password");
const typeConfirmPassword = ref("password");

const disabled = ref(false);
const isSubmit = ref(false);

const route = useRoute();
const router = useRouter();
const submit = async () => {
  isSubmit.value = true;
  if (Object.values(errors.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(
    resetPassword({
      ...data,
      code: route.query.code,
      email: route.query.email,
    }),
    errors
  );
  disabled.value = false;
  if (!res) return;
  router.push({
    name: "Login",
  });
};
</script>
