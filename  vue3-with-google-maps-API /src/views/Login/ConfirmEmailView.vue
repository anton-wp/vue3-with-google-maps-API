<template>
  <form class="my-auto h-fit w-5/6 py-32 lg:py-0" @submit.prevent="resend()">
    <h1 class="h1 mb-6 flex">
      {{ `Hi ${$route.query.first_name} ${$route.query.last_name},` }}
      <br />
      Thank you for registering!
    </h1>
    <span class="mb-6 flex text-sm text-cinder-400">
      We are looking forward to working with you!
      <br />
      Before we can start, please, confirm your email.
    </span>
    <span class="mb-12 flex text-sm text-cinder-400">
      Didn’t receive the link? Clicking on the following button:
    </span>
    <c-button
      class="mb-6 h-14 w-full"
      :disabled="isDisabled"
      @click.prevent="resend()"
    >
      Resend email
    </c-button>
    <span class="mb-12 flex text-cinder-400"> See you soon! </span>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { resendEmail } from "@/services/api/login.js";

import CButton from "@/components/Button.vue";
import SingInFooterBlock from "@/components/Login/SingInFooterBlock.vue";

import IconMessage from "@/components/icons/IconMessage.vue";

const isDisabled = ref(false);
const route = useRoute();
const resend = async () => {
  isDisabled.value = true;
  await resendEmail(route.query.access_token);
  isDisabled.value = false;
};
</script>
