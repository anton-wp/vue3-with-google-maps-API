<template>
  <div class="relative mb-10 flex w-fit items-center">
    <input
      class="w-52 rounded border border-cinder-200 p-4 text-cinder-300 outline-none"
      type="text"
      :value="price"
      @input="emit('update:price', $event.target.value)"
      disabled
    />
    <span class="absolute right-2 text-cinder-400">$</span>
  </div>
  <template v-if="isTable">
    <sub-title class="mb-6" > Material list </sub-title>
    <TableWithEdit class="mb-6" :header="header" :body="body" :is-edit="true" />
  </template>
  <div>
    <h2 class="h2 mb-5">Comment</h2>
    <textarea
      class="w-full max-w-[808px] rounded border border-cinder-100 p-2.5 text-cinder-500 outline-none"
      :value="comment"
      @input="emit('update:comment', $event.target.value)"
    />
  </div>
</template>
<script setup>
import { header } from "@/helpers/job.js";
import { ref } from "vue";

import TableWithEdit from "@/components/TableWithEdit.vue";
import SubTitle from "@/components/SubTitle.vue";

const emit = defineEmits(["update:price", "update:comment"]);
const props = defineProps({
  price: String | Number,
  comment: String,
  isTable: {
    type: Boolean,
    default: false,
  },
  body: {
    type: Array,
    default: [],
  },
});
</script>
