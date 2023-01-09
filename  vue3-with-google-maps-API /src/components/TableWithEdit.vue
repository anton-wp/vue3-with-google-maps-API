<template>
  <div>
    <div
      v-if="!isSumm && isEdit"
      class="mb-4 w-full rounded-lg bg-blue-500 p-4 text-white"
    >
      If you want to change price of Everestic Fabric please change it on
      Silicone and Acrylic tabs!
    </div>
    <div
      class="table-with-edit relative rounded-lg border text-sm"
      :class="!isSumm && isEdit ? 'border-blue-500' : 'border-blue-50'"
    >
      <div class="flex w-full items-center text-cinder-300">
        <div
          class="py-3 px-2"
          :class="item.class"
          v-for="item in header"
          :key="item.key"
          v-html="item.label"
        />
      </div>
      <transition-group tag="div" name="list">
        <div
          class="row flex h-12 items-center text-cinder-500"
          v-for="(row, key) in body"
          :key="row['material-names'].value"
          :id="row['material-names'].value"
        >
          <div
            :class="{
              [column.class]: true,
              [row[column.key] && row[column.key].class
                ? row[column.key].class
                : '']: true,
            }"
            v-for="(column, k) in header"
            :key="column.key"
          >
            <template
              v-if="!isSumm || !(key === body.length - 1 && !row[column.key])"
            >
              <span
                v-if="!row[column.key]"
                class="rounded-3xl bg-cinder-50 p-2 text-xs text-cinder-300"
                >unavailable</span
              >
              <span v-else-if="!row[column.key].component"
                >{{ row[column.key].value }}
              </span>
              <component
                v-else
                :is="row[column.key].component"
                :row="row"
                :body="body"
                :is-edit="isEdit"
                v-model="row[column.key].value"
              />
            </template>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  isSumm: {
    type: Boolean,
    default: true,
  },
  header: Array,
  body: Array,
});
</script>

<style>
.table-with-edit .row:nth-child(odd) {
  @apply rounded-b-lg bg-havelock-blue-tb;
}
</style>
