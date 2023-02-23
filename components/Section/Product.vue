<template>
  <div class="grid lg:grid-cols-2 lg:gap-4" data-testid="productSection">
    <div>
      <ElementsImage
        v-if="currentDataset?.data['tt_teaser_image']"
        :image="currentDataset?.data['tt_teaser_image']"
      />
    </div>
    <div class="bg-black lg:p-8">
      <div class="flex h-full flex-col space-y-6 bg-white p-4">
        <h1 class="text-4xl font-bold">
          {{ currentDataset?.data["tt_name"] }}
        </h1>
        <p>{{ currentDataset?.data["tt_abstract"] }}</p>
        <p class="my-6 text-3xl font-bold">
          {{ currentDataset?.data["tt_price"] }}
        </p>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="mb-1 text-lg font-bold">Kategorien</h3>
            <ul class="list-inside list-disc">
              <li
                v-for="category in currentDataset?.data['tt_categories']"
                :key="category.key"
              >
                {{ category.value }}
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-1 text-lg font-bold">Kompatibilität</h3>
            <ul class="list-inside list-disc">
              <li
                v-for="compatibility in currentDataset?.data[
                  'tt_compatibility'
                ]"
                :key="compatibility.key"
              >
                {{ compatibility.value }}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 class="bg-black p-2 text-sm font-bold uppercase text-white">
            Delivery
          </h3>
          <ElementsRichText :richtext="currentDataset?.data['tt_delivery']" />
        </div>

        <div>
          <h3 class="bg-black p-2 text-sm font-bold uppercase text-white">
            Installation
          </h3>
          <ElementsRichText
            :richtext="currentDataset?.data['tt_installation']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from "fsxa-api";
defineProps<{ data: DataEntries }>();

const { currentDataset } = useContent();
</script>
