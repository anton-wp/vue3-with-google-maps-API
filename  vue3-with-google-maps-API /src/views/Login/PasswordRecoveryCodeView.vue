<template>
  <form class="my-auto h-fit w-5/6 py-32 lg:py-0" @submit.prevent="submit()">
    <icon-with-bg class="mb-6" :type="isError ? 'error' : 'primary'">
      <IconLock />
    </icon-with-bg>
    <h1 class="h1 mb-6 flex justify-center">Enter the code</h1>
    <div class="mb-12 flex flex-col items-center">
      <div class="mb-5 flex">
        <div class="group relative" v-for="(item, key) in form" :key="key">
          <input
            class="mr-3 h-16 w-12 rounded-lg border border-cinder-100 focus:border-blue-500 text-center text-2xl caret-transparent outline-none last:mr-0"
            :id="key"
            :class="{
              'border-blue-500 text-blue-700 ':
                form[key] && form[key].length && !isError,
              'border-red-500 bg-red-50 text-red-500': isError,
            }"
            v-model.number="form[key]"
            type="number"
            @input="(e) => input({ key, e })"
          />
          <div
            class="absolute left-2 bottom-2 hidden h-[1px] w-8 bg-blue-500 group-focus-within:block"
          ></div>
        </div>
      </div>
      <span
        class="flex w-[328px] justify-center text-center"
        :class="{
          'text-red-500': isError,
        }"
      >
        We sent an code to {{ $route.query.email }}. Usually the code comes
        within one minute
      </span>
    </div>
    <c-button class="h-14 w-full"> Continue </c-button>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { checkCode } from "@/services/api/login.js";

import CButton from "@/components/Button.vue";
import IconWithBg from "@/components/IconWithBg.vue";

import IconLock from "@/components/icons/IconLock.vue";

const form = reactive({
  number1: "",
  number2: "",
  number3: "",
  number4: "",
  number5: "",
  number6: "",
});

const isError = ref(false);
const input = ({ key, e }) => {
  form[key] = e.data;
  if (typeof +e.data !== "number" || e.data === 'e') return;
  const id = key.slice(0, key.length - 1) + (+key.slice(-1) + 1);
  const nextInput = document.getElementById(id);
  if (nextInput) nextInput.focus();
};

const router = useRouter();
const route = useRoute();
const submit = async () => {
  const code = Object.values(form).join("");
  if (code.length !== 6) {
    isError.value = true;
    return;
  }
  try {
    const res = await checkCode({ code, email: route.query.email });
    router.push({
      name: "PasswordRecoveryPassword",
      query: {
        ...route.query,
        code,
      },
    });
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      isError.value = true;
      return;
    }
    console.log(error);
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
