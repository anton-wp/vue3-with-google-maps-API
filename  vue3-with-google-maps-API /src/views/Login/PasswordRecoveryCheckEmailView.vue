<template>
  <form class="my-auto h-fit w-5/6 py-32 lg:py-0" @submit.prevent="submit()">
    <div
      class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 stroke-blue-500"
    >
      <IconMessage />
    </div>
    <h1 class="h1 mb-6 flex justify-center">Check your Email</h1>
    <span class="mb-12 flex w-full justify-center">
      We sent you an email to recover your password
    </span>
    <c-button
      class="h-14 w-full"
      @click="
        $router.push({ name: 'PasswordRecoveryCode', query: $route.query })
      "
    >
      Continue
    </c-button>
  </form>
</template>

<script setup>
import CButton from "@/components/Button.vue";
import IconMessage from "@/components/icons/IconMessage.vue";

const submit = () => {};
</script>
