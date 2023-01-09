<template>
  <div class="flex h-12 w-full items-center border-t pr-16 text-xs">
    <div class="ml-auto flex w-20 justify-between">
      <router-link
        v-for="(item, key) in navs"
        :key="key"
        :to="{ name: item.route }"
      >
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { role } from "@/helpers/role.js";

const navs = computed(() => [
  // {
  //   label: "Privacy Policy",
  //   route: "PrivacyPolicy",
  // },
  // {
  //   label: "F.A.Q.",
  //   route: "FAQ",
  // },
  {
    label: role.value === "admin" ? "Contact info" : "Contact us",
    route: role.value === "admin" ? "ContactInfo" : "ContactUs",
  },
]);
</script>
