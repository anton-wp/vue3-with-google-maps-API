<template>
  <component class="font-poppins" :is="layout">
    <template v-for="item in slots" :key="item.name" #[item.name]>
      <component :is="item.component" :id="item.id" />
    </template>
    <template #routerView>
      <RouterView />
    </template>
  </component>
  <div class="absolute right-12 bottom-12 z-50">
    <TransitionGroup name="list" tag="ul">
      <Toast
        v-for="item in toasters"
        :key="item.id"
        :state="item"
        transition="thing"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useToastStore } from "@/stores";

import defaultLayout from "@/layouts/default/index.vue";
import Toast from "@/components/Toast.vue";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout || defaultLayout;
});
const slots = computed(() => {
  if (route.meta.slots && route.meta.slots.length > 0) return route.meta.slots;
  else return [];
});

const toasters = computed(() => useToastStore().toasters);
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
