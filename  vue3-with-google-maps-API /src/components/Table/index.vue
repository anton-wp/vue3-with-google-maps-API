<template>
  <div class="mb-5 hidden w-full px-5 text-sm text-cinder-300 xl:flex xl:px-10">
    <div v-for="(item, key) in header" :key="key" :class="item.class">
      <span>{{ item.label }}</span>
    </div>
  </div>
  <div
    class="relative mb-2 flex w-full cursor-pointer flex-wrap items-center rounded-lg border border-cinder-200 px-5 pt-6 pb-4 text-sm text-cinder-400 xl:mb-4 xl:h-20 xl:flex-row xl:flex-nowrap xl:px-10 xl:pt-0 xl:pb-0 xl:text-base xl:text-cinder-600"
    v-for="(item, key) in body"
    :key="item.id"
    @click.stop="$router.push(item.route)"
  >
    <div
      v-if="item.status"
      class="absolute top-0 -left-px h-full w-2 rounded-l-md"
      :class="typesLines[item.status.type]"
    />
    <div v-for="(i, k) in header" :key="k" :class="i.class">
      <span v-if="i.key === 'status'">
        <CBadge
          :label="
            listStatuses.find((status) => status.value === item[i.key].type) &&
            listStatuses.find((status) => status.value === item[i.key].type)
              .label
          "
          :type="item[i.key].type"
        />
      </span>
      <span v-else-if="i.key === 'buttons'">
        <slot name="buttons" v-bind="{ id: item.id, status: item.status }" />
      </span>
      <span v-else-if="i.key === 'nameAvatar'">
        <div class="mb-4 flex items-center xl:mb-0">
          <img
            class="mr-5 h-12 w-12 rounded-full object-cover"
            :src="item[i.key].url"
            alt="avatar"
          />
          {{ item[i.key].label }}
        </div>
      </span>
      <span v-else-if="i.key === 'jobs'">
        <div class="flex justify-between">
          <span class="flex xl:hidden">{{ i.label }}</span>
          <div
            class="flex h-5 w-7 items-center justify-center rounded-xl bg-blue-100 text-xs text-blue-500"
          >
            {{ item[i.key].label }}
          </div>
        </div>
      </span>
      <span
        v-else
        class="group relative mb-2 flex w-full justify-between xl:mb-0"
      >
        <span class="flex xl:hidden">{{ i.label }}</span>
        <tooltip v-if="item[i.key].label" class="-top-6 right-4 xl:left-0">
          {{ item[i.key].label }}
        </tooltip>
        <span
          class="overflow-hidden text-ellipsis whitespace-nowrap pl-16 xl:pr-6 xl:pl-0"
        >
          {{ item[i.key].label || "-/-" }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { typesLines, listStatuses } from "@/helpers/statuses.js";

import CBadge from "@/components/Badge.vue";
import Tooltip from "@/components/Tooltip.vue";

const props = defineProps({
  header: Array,
  body: Array,
});
</script>
