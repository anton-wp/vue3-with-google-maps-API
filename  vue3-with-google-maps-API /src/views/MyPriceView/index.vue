<template>
  <Loader v-if="isLoading" />
  <div
    v-else
    :class="{ 'container-dashboard-page': !smallTitle, 'mt-6': smallTitle }"
  >
    <div class="mb-6 flex items-center justify-between lg:mb-12">
      <h1 v-if="!smallTitle" class="h1">My price</h1>
      <h1 v-else class="flex items-center text-xl font-semibold">
        <IconWallet class="mr-4 stroke-blue-500" />
        My price
      </h1>
      <c-button
        v-if="!isEdit"
        class="h-14 w-44"
        :variant="'secondary-blue'"
        @click="isEdit = true"
      >
        Edit price
      </c-button>
      <div class="flex" v-else>
        <c-button
          class="mr-4 h-14 w-44"
          :variant="'secondary-blue'"
          @click="cancel"
        >
          Cancel
        </c-button>
        <c-button class="h-14 w-44" @click="save"> Save </c-button>
      </div>
    </div>
    <p v-if="isCustomer" class="mb-6 w-[484px] lg:w-[613px]">
      Our company provides price list information with the default prices we
      most often work with! But you can also set your prices and our
      administrator will consider your price list.
    </p>
    <div class="rounded-lg border border-cinder-50 px-6 pb-8 pt-8 lg:px-8">
      <div class="mb-6 flex items-center justify-between lg:mb-9">
        <sub-title class="mr-5" :icon="IconList"> Material list </sub-title>
        <Toggle v-model="roofType" />
      </div>
      <TableWithEdit
        :header="header"
        :body="body[roofType]"
        :is-edit="isEdit"
        :is-summ="false"
      />
      <div
        v-if="isCustomer"
        class="mt-7 ml-6 cursor-pointer text-sm text-havelock-blue-500 underline"
        @click="removePrice()"
      >
        To reset to the price that the company put out
      </div>
    </div>
    <CancelModal v-model="modals.isOpenCancel" @reset-form="resetForm()" />
    <SaveModal v-model="modals.isOpenSave" @save-form="saveForm()" />
    <NextModal
      v-model="modals.isOpenNext"
      @reset-form="resetForm()"
      @save-form="saveForm()"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, shallowRef, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { getRequest } from "@/helpers/wrapsForRequests.js";
import {
  getPrice,
  getPriceById,
  createPrice,
  updatePrice,
  deletePrice,
} from "@/services/api/price.js";
import { role } from "@/helpers/role.js";
import { useAuthStore } from "@/stores";

import Loader from "@/components/LoaderPage.vue";
import SubTitle from "@/components/SubTitle.vue";
import NextModal from "@/components/NextModal.vue";
import CancelModal from "@/views/MyPriceView/components/MyPriceViewCancelModal.vue";
import SaveModal from "@/views/MyPriceView/components/MyPriceViewSaveModal.vue";
import InputTable from "@/views/MyPriceView/components/MyPriceViewInputTable.vue";
import CButton from "@/components/Button.vue";
import Toggle from "@/components/Toggle.vue";
import Modal from "@/components/Modal.vue";
import TableWithEdit from "@/components/TableWithEdit.vue";

import IconList from "@/components/icons/IconList.vue";
import IconWallet from "@/components/icons/IconWallet.vue";

const props = defineProps({
  user: Object,
  smallTitle: {
    types: Boolean,
    default: false,
  },
});

const isCustomer = computed(() => {
  return ["customer"].includes(role.value);
});
const user = computed(() => useAuthStore().user);

const isEdit = ref(false);
const modals = reactive({
  isOpenCancel: false,
  isOpenSave: false,
  isOpenNext: false,
});
const roofType = ref("acrylic");
const header = [
  {
    key: "material-names",
    label: "Material names",
    class: "w-1/5 pl-6",
  },
  {
    key: "2 gal. pail",
    label: "1 Pail (2&nbsp;gallon)",
    class: "w-1/5 flex justify-center text-center",
  },
  {
    key: "pail",
    label: "1 Pail (5&nbsp;gallon)",
    class: "w-1/5 flex justify-center text-center",
  },
  {
    key: "drum",
    label: "1 Drums (55&nbsp;gallon)",
    class: "w-1/5 flex justify-center text-center",
  },
  {
    key: "roll",
    label: "1 Rolls",
    class: "w-1/5 flex justify-center text-center",
  },
];
const body = reactive({
  acrylic: [],
  silicone: [],
});
const data = ref({});

const nextF = ref(null);
const save = () => {
  modals.isOpenSave = true;
};
const cancel = () => {
  modals.isOpenCancel = true;
};

const resetForm = () => {
  resetPrice();
  isEdit.value = false;
  if (nextF.value) {
    modals.isOpenNext = false;
    nextF.value();
  } else modals.isOpenCancel = false;
};

const getDataPrice = () => {
  if (isCustomer.value) {
    return getRequest(getPriceById({ user_id: user.value.user.id }));
  } else if (props.user && props.user.id) {
    return getRequest(getPriceById({ user_id: props.user.id }));
  } else {
    return getRequest(getPrice());
  }
};
const saveDataPrice = () => {
  if (isCustomer.value) {
    return getRequest(
      createPrice(
        [...generateData(body.acrylic), ...generateData(body.silicone)],
        user.value.user.id
      )
    );
  } else if (props.user && props.user.id) {
    return getRequest(
      createPrice(
        [...generateData(body.acrylic), ...generateData(body.silicone)],
        props.user.id
      )
    );
  } else {
    return getRequest(
      updatePrice([
        ...generateData(body.acrylic),
        ...generateData(body.silicone),
      ])
    );
  }
};

const saveForm = async () => {
  isLoading.value = true;
  if (nextF.value) {
    modals.isOpenNext = false;
    nextF.value();
  } else modals.isOpenSave = false;
  
  const res = await saveDataPrice();
  getPricelist(res.data);
  isLoading.value = false;
  isEdit.value = false;
};
const generateData = (data) => {
  return data.map((item) => {
    return {
      coating_id: item["material-names"].coating_id,
      data: Object.values(item)
        .filter((i) => i.unit_id)
        .map(({ value, unit_id }) => ({ unit_id, price: +value * 100 })),
    };
  });
};
const generateBody = (data) => {
  return data.reduce((acc, item) => {
    const index = acc.findIndex(
      (i) => i["material-names"].coating_id === item.coating.id
    );
    if (index < 0) {
      return [
        ...acc,
        {
          "material-names": {
            value: item.coating.name,
            coating_id: item.coating.id,
          },
          [item.unit.name]: {
            unit_id: item.unit.id,
            value: +item.price,
            component: shallowRef(InputTable),
          },
        },
      ];
    } else {
      acc[index][item.unit.name] = {
        unit_id: item.unit.id,
        value: +item.price,
        component: shallowRef(InputTable),
      };
      return acc;
    }
  }, []);
};

const removePrice = async () => {
  if (data.value.user_request_id) {
    isLoading.value = true;
    const res = await getRequest(deletePrice(data.value.user_request_id));
    if (!res) return;
    getPricelist(res.data);
    isLoading.value = false;
  } else {
    resetPrice();
  }
};

const isLoading = ref(false);
const resetPrice = () => {
  body.acrylic = generateBody(data.value.coatingPrices.Acrylic);
  body.silicone = generateBody(data.value.coatingPrices.Silicone);
};
const getPricelist = (res) => {
  data.value = res;
  body.acrylic = generateBody(res.coatingPrices.Acrylic);
  body.silicone = generateBody(res.coatingPrices.Silicone);
};

onMounted(async () => {
  isLoading.value = true;
  const res = await getDataPrice();
  if (!res) return;
  getPricelist(res.data);
  isLoading.value = false;
});
onBeforeRouteLeave((to, from, next) => {
  nextF.value = null;
  if (isEdit.value) {
    modals.isOpenNext = true;
    nextF.value = next;
  } else next();
});
</script>
