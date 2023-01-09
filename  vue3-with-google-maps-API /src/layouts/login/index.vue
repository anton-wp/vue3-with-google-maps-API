<template>
  <div class="px-16 py-10 lg:px-20 lg:py-9">
    <div
      class="flex flex-col overflow-hidden rounded-lg border lg:flex-row"
      style="min-height: calc(100vh - 4.5rem)"
    >
      <div
        class="relative flex h-[632px] justify-center pt-6 pb-10 lg:h-auto lg:w-1/2 lg:pt-8 lg:pb-24"
      >
        <img
          class="absolute top-0 h-full w-full object-cover object-top"
          src="@/assets/image/login.jpg"
          alt="login"
        />
        <div class="z-10 flex w-96 flex-col items-center justify-between">
          <IconLoginLogo />
          <span
            class="w-52 text-center text-4xl font-bold uppercase leading-normal text-white lg:w-full lg:text-7xl"
          >
            Roof Coating
          </span>
          <div class="flex w-full flex-col items-center font-inter">
            <slot name="button" />
          </div>
        </div>
      </div>
      <div
        class="wrapp-login flex justify-center overflow-y-auto py-8 lg:w-1/2 lg:py-0"
      >
        <slot name="routerView" />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLoginLogo from "@/components/icons/IconLoginLogo.vue";
</script>

<style>
.wrapp-login {
  height: calc(100vh - 5rem);
}
@media screen and (max-width: 1023px) {
  .wrapp-login {
    height: 100%;
  }
}
</style>
