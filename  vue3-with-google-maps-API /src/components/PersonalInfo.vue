<template>
  <div class="mb-6 flex justify-between">
    <sub-title :icon="IconContact" :size="!isInTabs ? 'md' : 'sm'">
      Personal Info
    </sub-title>
    <router-link v-if="isInTabs" :to="{ query: { edit: true } }">
      <c-button class="h-14 w-44" :variant="'secondary-blue'"
        >Edit personal info</c-button
      >
    </router-link>
  </div>
  <div
    :class="{
      'grid grid-cols-2 gap-x-10 gap-y-4': !isInTabs,
      'w-full md:w-1/2 xl:w-1/3': isInTabs,
    }"
  >
    <div
      v-for="(item, key) in infoBlock"
      :key="key"
      class="flex justify-between"
      :class="{
        'mb-4': isInTabs,
      }"
    >
      <template v-if="item.value">
        <span class="text-gray-300">{{ item.label }}</span>
        <span class="group relative grid text-cinder-500">
          <span class="overflow-hidden text-ellipsis whitespace-nowrap pl-6">
            {{ item.value }}
          </span>
          <tooltip class="-top-6 left-6">
            {{ item.value }}
          </tooltip>
        </span>
      </template>
    </div>
  </div>
  <router-link
    v-if="!isInTabs"
    class="mt-32 ml-auto lg:mt-auto"
    :to="{ query: { edit: true } }"
  >
    <c-button class="h-14 w-44">Edit profile</c-button>
  </router-link>
</template>

<script setup>
import IconContact from "@/components/icons/IconContact.vue";
import Tooltip from "@/components/Tooltip.vue";
import CButton from "@/components/Button.vue";
import SubTitle from "@/components/SubTitle.vue";

const props = defineProps({
  infoBlock: Object,
  isInTabs: {
    types: Boolean,
    default: false,
  },
});
</script>
