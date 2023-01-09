<template>
  <div v-if="user" class="nav-bar h-screen px-2 pt-10 shadow-xl">
    <div class="mb-12 flex w-60 justify-center">
      <IconLogo class="fill-blue-500" />
    </div>
    <router-link
      class="mb-4 flex h-14 w-full items-center rounded stroke-cinder-300 pl-4 font-semibold text-cinder-300 duration-300"
      v-for="(item, key) in navs[role]"
      :to="{ name: item.route }"
      :key="key"
    >
      <component :is="item.icon" class="mr-3" />
      {{ item.label }}
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores";
import { role } from "@/helpers/role.js";

import IconLogo from "@/components/icons/IconLogo.vue";
import ClipBoard from "@/components/icons/IconClipBoard.vue";
import Contact from "@/components/icons/IconContact.vue";
import Wallet from "@/components/icons/IconWallet.vue";
import Calculator from "@/components/icons/IconCalculator.vue";
import Customers from "@/components/icons/IconCustomers.vue";

const user = computed(() => useAuthStore().user);

const navs = {
  customer: [
    {
      label: "My jobs",
      icon: ClipBoard,
      route: "Jobs",
    },
    {
      label: "Сalculator",
      icon: Calculator,
      route: "CalculatorStep-1",
    },
    {
      label: "My price",
      icon: Wallet,
      route: "MyPrice",
    },
    {
      label: "My profile",
      icon: Contact,
      route: "Profile",
    },
  ],
  admin: [
    {
      label: "Jobs",
      icon: ClipBoard,
      route: "Jobs",
    },
    {
      label: "Customers",
      icon: Customers,
      route: "Customers",
    },
    {
      label: "Price",
      icon: Wallet,
      route: "MyPrice",
    },
    {
      label: "My profile",
      icon: Contact,
      route: "Profile",
    },
  ],
};
</script>
<style>
.nav-bar .router-link-active {
  @apply bg-blue-100 stroke-blue-500 text-blue-500;
}
</style>
