import { shallowRef } from "vue";

import { getRequest } from "@/helpers/wrapsForRequests.js";
import { saveJobImage } from "@/services/api/jobs.js";
import { useToastStore } from "@/stores";

import InputPails from "@/views/Jobs/SelectedJobView/components/SelectedJobViewInputPails.vue";
import InputDrums from "@/views/Jobs/SelectedJobView/components/SelectedJobViewInputDrums.vue";
import Cost from "@/views/Jobs/SelectedJobView/components/SelectedJobViewCost.vue";

export const generateOptions = (data) => {
  return data.map((item) => {
    return { value: item.id, label: item.name };
  });
};

export const updatePhoto = async ({ e, loaderImage, state, jobId }) => {
  loaderImage.value = true;
  const files = [...e.target.files];
  let size = 5;
  let subarray = [];
  for (let i = 0; i < Math.ceil(files.length / size); i++) {
    subarray[i] = files.slice(i * size, i * size + size);
  }

  for (let i = 0; i < subarray.length; i++) {
    const formDataImages = new FormData();
    for (let k = 0; k < subarray[i].length; k++) {
      formDataImages.append(`images[${k}]`, subarray[i][k]);
    }
    const { data } = await getRequest(
      saveJobImage({ jobId, data: formDataImages })
    );
    state.images = data.data;
    useToastStore().addToast("primary", "Details were captured!");
  }
  loaderImage.value = false;
};

const generateCoatings = (coatings) => {
  return coatings.reduce((acc, item) => {
    const found = acc.find((i) => i.coating.id === item.coating.id);
    if (found) {
      found.units = [
        ...found.units,
        { ...item.unit, price: item.price_for_one_unit, value: item.quantity },
      ];
    } else {
      acc.push({
        coating: item.coating,
        units: [
          {
            ...item.unit,
            price: item.price_for_one_unit,
            value: item.quantity,
          },
        ],
      });
    }
    return acc;
  }, []);
};

const isRow = ({ item, key, component }) => {
  return item
    ? {
        [key]: {
          value: item.value,
          price: item.price,
          component: shallowRef(component),
        },
      }
    : {};
};

export const generateBody = (data) => {
  const coatings = generateCoatings(data);

  return [
    ...coatings.map((item) => {
      const units = {
        drum: item.units.find((i) => i.id === 1),
        pail: item.units.find((i) => i.id === 2),
        "2 gal. pail": item.units.find((i) => i.id === 3),
      };
      return {
        "material-names": {
          id: item.coating.id,
          value: item.coating.name,
        },
        ...isRow({
          item: units.drum,
          key: "drum",
          component: InputDrums,
        }),
        ...isRow({
          item: units.pail,
          key: "pail",
          component: InputPails,
        }),
        ...isRow({
          item: units["2 gal. pail"],
          key: "2 gal. pail",
          component: InputPails,
        }),
        costs: {
          value: 0,
          component: shallowRef(Cost),
        },
      };
    }),
    {
      "material-names": {
        value: "Total cost",
        class: "text-blue-500 font-semibold",
      },
      costs: {
        value: 0,
        component: shallowRef(Cost),
        class: "text-blue-500 font-semibold",
      },
    },
  ];
};

const classHeader = "w-1/6 flex justify-center text-center";
export const header = [
  {
    key: "material-names",
    label: "Material names",
    class: "w-1/6 pl-6",
  },
  {
    key: "drum",
    label: "Quantity in&nbsp;drums",
    class: classHeader,
  },
  {
    key: "pail",
    label: "Quantity in&nbsp;pails",
    class: classHeader,
  },
  {
    key: "2 gal. pail",
    label: "Quantity in&nbsp;2&nbsp;pails",
    class: classHeader,
  },
  {
    key: "roll",
    label: "Quantity in&nbsp;rolls",
    class: classHeader,
  },
  {
    key: "costs",
    label: "Sub Total cost",
    class: classHeader,
  },
];

export const getCoatings = (body) => {
  return body.slice(0, -1).map((item) => {
    const obj = {
      drum: item.drum ? { drum: item.drum.value } : {},
      pail: item.pail ? { pail: item.pail.value } : {},
      ["2 gal. pail"]: item["2 gal. pail"]
        ? { ["2 gal. pail"]: item["2 gal. pail"].value }
        : {},
    };
    return {
      id: item["material-names"].id,
      ...obj.drum,
      ...obj.pail,
      ...obj["2 gal. pail"],
    };
  });
}
