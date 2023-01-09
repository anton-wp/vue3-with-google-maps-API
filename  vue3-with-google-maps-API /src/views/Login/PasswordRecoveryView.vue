<template>
  <form class="my-auto h-fit w-5/6 py-32 lg:py-0" @submit.prevent="submit()">
    <h1 class="h1 mb-8 flex justify-center">Password recovery</h1>
    <CInput
      class="mb-12"
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
    <c-button class="mb-8 h-14 w-full" :disabled="disabled">
      Continue
    </c-button>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { forgotPassword } from "@/services/api/login.js";
import { messageErrors } from "@/helpers/errors.js";
import { validForm } from "@/helpers/wrapsForRequests.js";

import CInput from "@/components/Input.vue";
import CButton from "@/components/Button.vue";

const data = reactive({
  email: "",
});
const errors = ref({
  email: [],
});

const disabled = ref(false);
const isSubmit = ref(false);

const router = useRouter();

const submit = async () => {
  isSubmit.value = true;
  if (Object.values(errors.value).flat().length > 0) return;
  disabled.value = true;
  const res = await validForm(forgotPassword(data), errors);
  disabled.value = false;
  if (!res) return;
  router.push({
    name: "PasswordRecoveryCheckEmail",
    query: { email: data.email },
  });
};
</script>
