<template>
  <button
    class="relative z-20 h-9 w-9 cursor-pointer rounded fill-cinder-200 outline-none duration-300 hover:bg-cinder-50 focus:bg-cinder-50 focus:fill-cinder-400"
    @click.stop="open"
  >
    <IconDots />
    <div
      class="absolute right-0 z-10 w-36 flex-col overflow-hidden rounded shadow-md"
      id="id"
      :class="show ? 'flex' : 'hidden'"
      v-click-outside="clickOutside"
    >
      <div
        class="flex items-center bg-white px-5 py-2 duration-300 hover:bg-havelock-blue-50"
        v-for="(item, key) in buttons"
        :class="item.class"
        :key="key"
        @click.stop="item.event"
      >
        <component :is="item.icon" class="mr-4" @click.stop="item.event" />
        {{ item.label }}
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { role } from "@/helpers/role.js";
import * as store from "@/stores";

import IconDots from "@/components/icons/IconDots.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconBasket from "@/components/icons/IconBasket.vue";

const emit = defineEmits(["closeButtons"]);
const props = defineProps({
  id: Number,
  openId: Number,
  status: Object,
});
watch(
  () => props.openId,
  (val) => {
    if (val === props.id) return;
    show.value = false;
  }
);
const show = ref(false);
const router = useRouter();
const route = useRoute();
const buttons = computed(() => {
  let defArr = [
    {
      label: "Edit",
      icon: IconEdit,
      class: "text-cinder-400 stroke-cinder-400",
      event: () => {
        router.push({ name: "SelectedEditJob", params: { jobId: props.id } });
      },
    },
  ];
  if (
    role.value === "admin" ||
    (props.status && props.status.type === "draft")
  ) {
    defArr = [
      ...defArr,
      {
        label: "Delete",
        icon: IconBasket,
        class: "text-red-500 stroke-red-500",
        event: () => {
          store["useJobsStore"]().deleteJobs(props.id, route.query);
        },
      },
    ];
  }
  return defArr;
});

const clickOutside = () => {
  show.value = false;
};

const open = () => {
  emit("closeButtons");
  show.value = true;
};
</script>
