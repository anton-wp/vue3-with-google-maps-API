<template>
  <div class="relative flex h-screen w-screen items-center justify-center">
    <div class="absolute left-10 top-12 z-10 lg:left-14 lg:top-14">
      <IconLogo class="h-14 w-64 fill-white" />
    </div>
    <figure>
      <picture>
        <source
          srcset="@/assets/image/404-lg.jpg"
          type="image/jpg"
          media="(max-width:1023px)"
        />
        <img
          class="absolute top-0 left-0 h-full w-full object-cover"
          src="@/assets/image/404.jpg"
          alt="image"
        />
      </picture>
    </figure>

    <div class="relative z-10 flex flex-col items-center justify-center">
      <span
        class="mt-36 leading-none"
        style="font-size: 328px; color: rgba(255, 255, 255, 0.7)"
        >404</span
      >
      <h1 class="mb-4 text-4xl font-semibold text-white">
        Oops, something went wrong
      </h1>
      <span class="mb-12 w-[411px] text-center text-cinder-100">
        Check your internet connection and reload this page, sorry for any
        inconvenience!
      </span>
      <router-link to="/">
        <c-button class="h-14 w-44">Go to Home page</c-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import CButton from "@/components/Button.vue";
</script>

