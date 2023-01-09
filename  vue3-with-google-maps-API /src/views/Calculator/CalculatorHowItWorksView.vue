<template>
  <Back class="mb-14" :to="{ name: 'CalculatorStep-1' }" />
  <div class="mb-10 flex">
    <div class="w-1/3">
      <figure>
        <picture>
          <source
            srcset="@/assets/image/calculator-roof-sm.jpg"
            type="image/jpg"
            media="(max-width:1023px)"
          />
          <img
            class="h-[865px] rounded-lg object-cover lg:h-[739px]"
            style="min-width: 115%; margin-left: -25%"
            src="@/assets/image/calculator-roof.jpg"
            alt="roof"
          />
        </picture>
      </figure>
    </div>
    <div class="flex w-2/3 flex-col justify-center">
      <h1 class="h1 mb-5">How to Use This Site</h1>
      <p class="mb-14">
        You can use our interactive map to estimate of the cost to coat your
        roof and get in touch with an expert. Here's how:
      </p>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          class="rounded-lg p-4 shadow-md"
          v-for="(item, key) in blocks"
          :key="key"
        >
          <div
            class="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50"
          >
            <component class="stroke-blue-500" :is="item.icon" />
          </div>
          <p class="text-cinder-500">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
  <iframe
    class="mb-6 h-[557px] w-full rounded-lg lg:h-[428px]"
    src="https://www.youtube.com/embed/Z8Z51no1TD0"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
  <p class="text-cinder-500">
    Your email address and contact info is safe. Only qualified contractors will
    send you an estimate. You will receive the contractor's contact information,
    so you can speak with the contractor about your roof!
  </p>
</template>

<script setup>
import Back from "@/components/Back.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconSend from "@/components/icons/IconSend.vue";
import IconContact from "@/components/icons/IconContact.vue";

const blocks = [
  {
    icon: IconLocation,
    text: "Enter your jobsite address and you will see a satellite image of the building.",
  },
  {
    icon: IconSend,
    text: "Click on each roof corner until the outline is connected to get an estimate of its square footage (see Demo below).",
  },
  {
    icon: IconContact,
    text: 'Add your contact information and press the "Get Instant Estimate" button to get three detailed quotes from prescreened, qualified contractors.',
  },
];
</script>
