<template>
  <form class="my-auto h-fit w-5/6" @submit.prevent="submit" disabled>
    <h1 class="h1 my-8 flex">Log in</h1>
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
      class="mb-4 stroke-cinder-300"
      v-model="data.password"
      v-model:errors="errors.password"
      :disabled="disabled"
      :placeholder="'Password'"
      :type="typePassword"
      :is-submit="isSubmit"
      :rules="[
        {
          key: 'required',
          message: messageErrors({ key: 'required', label: 'password' }),
        },
        {
          key: 'minLength',
          message: messageErrors({
            key: 'minLength',
            label: 'password',
            helper: '8',
          }),
          min: 8,
        },
        {
          key: 'includesNumber',
          message: messageErrors({ key: 'includesNumber', label: 'password' }),
        },
        {
          key: 'uppercase',
          message: messageErrors({ key: 'uppercase', label: 'password' }),
        },
        {
          key: 'lowercase',
          message: messageErrors({ key: 'lowercase', label: 'password' }),
        },
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
    <div class="mb-14 flex justify-between">
      <CCheckbox
        v-model="isRemember"
        :name="'remember'"
        :label="'Remember me'"
      />
      <router-link class="text-blue-500" :to="{ name: 'PasswordRecovery' }">
        Forgot password?
      </router-link>
    </div>
    <c-button class="mb-8 h-14 w-full" :disabled="disabled">
      Continue
    </c-button>
    <span class="mb-8 flex w-full justify-center">Or Log In with</span>
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
import { login } from "@/services/api/login.js";
import { messageErrors } from "@/helpers/errors.js";
import { useAuthStore } from "@/stores";
import { validForm } from "@/helpers/wrapsForRequests.js";

import CInput from "@/components/Input.vue";
import CCheckbox from "@/components/Checkbox.vue";
import CButton from "@/components/Button.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import IconShow from "@/components/icons/IconShowPassword.vue";
import IconHide from "@/components/icons/IconHidePassword.vue";

const googleLink = `${import.meta.env.VITE_BASE_URL_BACK}social/google`;

const data = reactive({
  email: "",
  password: "",
});
const errors = ref({
  email: [],
  password: [],
});
const isRemember = ref(false);

const disabled = ref(false);

const typePassword = ref("password");
const remember = ref(false);
const isSubmit = ref(false);

const router = useRouter();

const authStore = useAuthStore();

const submit = async () => {
  isSubmit.value = true;
  if (Object.values(errors.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(login(data), errors);
  disabled.value = false;
  if (!res) return;
  // if (!res.data.user.email_verified_at) {
  //   router.push({
  //     name: "ConfirmEmail",
  //     query: {
  //       first_name: res.data.user.first_name,
  //       last_name: res.data.user.last_name,
  //       access_token: res.data.access_token,
  //     },
  //   });
  //   return;
  // }
  authStore.login(res.data, isRemember.value);
};
</script>
