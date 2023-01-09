<template>
  <div class="flex h-full w-full flex-row xl:w-auto xl:flex-col">
    <div
      class="mr-2 flex h-2/3 w-2/3 flex-col overflow-hidden rounded-md bg-white shadow-md xl:mr-0 xl:mb-2 xl:min-w-[56px] xl:overflow-visible"
    >
      <button
        class="calculator__scroll-button"
        @mousedown="scrollToTop()"
        @mouseup="breakScroll()"
      >
        <IconCarret class="rotate-180" />
      </button>
      <div
        ref="tabsContainer"
        class="calculator__tab-scrollbar scroll-firefox flex w-full overflow-x-auto bg-white xl:block xl:h-full xl:overflow-y-auto xl:overflow-x-hidden"
      >
        <a
          class="group"
          v-for="item in tabs"
          :key="item.icon"
          :class="{
            'router-link-active': $route.name === `${keyName}${item.route}`,
          }"
          @click="redirect(item.route)"
          @mouseenter="mouseenterLink"
        >
          <TabButton class="calculator__tab-button" :icon="item.icon" />
          <c-tooltip id="tooltip">
            {{ item.label }}
          </c-tooltip>
        </a>
      </div>
      <button
        class="calculator__scroll-button"
        @mousedown="scrollToBottom()"
        @mouseup="breakScroll()"
      >
        <IconCarret />
      </button>
    </div>
    <div class="ml-auto flex xl:ml-0 xl:mt-auto xl:block">
      <TabButton
        class="mr-2 shadow-md xl:mb-2 xl:mr-0"
        :icon="IconEye"
        @click="isShowFullMapModal = true"
      />
      <TabButton class="shadow-md" :icon="IconSave" @click="emit('save')" />
    </div>
    <FullMapModal v-model="isShowFullMapModal" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStep3Store } from "@/stores";
import { tabs } from "@/helpers/tabsMap.js";

import CTooltip from "@/components/Tooltip.vue";
import FullMapModal from "@/components/FullMapModal.vue";
import TabButton from "@/views/Calculator/CalculatorStep-3/components/CalculatorStep-3TabsButton.vue";
import IconCarret from "@/components/icons/IconCarret.vue";
import IconSave from "@/components/icons/IconSave.vue";
import IconEye from "@/components/icons/IconEye.vue";

const emit = defineEmits(["save"]);
const props = defineProps({
  keyName: {
    types: String,
    default: "CalculatorStep-3",
  },
});

const isShowFullMapModal = ref(false);
const tabsContainer = ref(null);
const scolling = ref(null);

const route = useRoute();
const router = useRouter();
const save = computed(() => useStep3Store().save);

const mouseenterLink = (e) => {
  const rect = e.target.getBoundingClientRect();
  const tooltip = e.target.querySelector("#tooltip");
  const container = document.querySelector(".content-wrapper");
  const scrollTop = container.scrollTop;

  tooltip.style.cssText = `top: ${rect.top - 90 + scrollTop}px; left: ${
    rect.left - 256
  }px `;
};

const scrollToTop = () => {
  scolling.value = setInterval(() => {
    tabsContainer.value.scrollTo({
      top: tabsContainer.value.scrollTop - 3,
    });
  }, 10);
};
const scrollToBottom = () => {
  scolling.value = setInterval(() => {
    tabsContainer.value.scrollTo({
      top: tabsContainer.value.scrollTop + 3,
    });
  }, 10);
};
const breakScroll = () => {
  clearInterval(scolling.value);
};

const redirect = async (routeName) => {
  await save.value();
  router.push({
    name: `${props.keyName}${routeName}`,
    params: { ...route.params },
  });
};
</script>

<style>
.calculator__scroll-button {
  @apply hidden h-6 cursor-pointer items-center justify-center stroke-cinder-300 duration-300 hover:bg-havelock-blue-tb hover:stroke-blue-500 disabled:stroke-cinder-200 xl:flex;
}
.router-link-active .calculator__tab-button {
  @apply bg-gradient-to-tl from-blue-300 via-blue-500 to-blue-500 stroke-white;
}
.calculator__tab-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
