<template>
  <div
    class="grid lg:grid-cols-2 lg:gap-4 lg:pt-4"
    data-testid="productSection"
  >
    <div>
      <div class="relative">
        <div
          class="absolute -top-10 -z-10 hidden h-4/5 w-3/4 border-[12px] border-gray-100 md:block"
        />

        <div class="md:pl-10">
          <ElementsImage
            v-if="currentDataset?.data['tt_teaser_image']"
            :image="currentDataset?.data['tt_teaser_image']"
          />
        </div>
      </div>
    </div>
    <div class="bg-black lg:p-8">
      <div class="flex h-full flex-col space-y-6 bg-white p-4">
        <h1 class="mt-4 text-4xl font-black" data-preview-id="#tt_name">
          {{ currentDataset?.data['tt_name'] }}
        </h1>
        <p class="text-gray-800" data-preview-id="#tt_abstract">
          {{ currentDataset?.data['tt_abstract'] }}
        </p>
        <p class="my-6 text-3xl font-black" data-preview-id="#tt_price">
          {{ currentDataset?.data['tt_price'] }}
        </p>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="mb-1 text-lg font-bold">Kategorien</h3>
            <ul
              class="list-inside list-disc text-gray-800"
              data-preview-id="#tt_categories"
            >
              <li
                v-for="(category, index) in currentDataset?.data[
                  'tt_categories'
                ]"
                :key="category.key"
                :data-preview-id="`#${index}`"
              >
                {{ category.value }}
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-1 text-lg font-bold">Kompatibilität</h3>
            <ul
              class="list-inside list-disc text-gray-800"
              data-preview-id="#tt_compatibility"
            >
              <li
                v-for="(compatibility, index) in currentDataset?.data[
                  'tt_compatibility'
                ]"
                :key="compatibility.key"
                :data-preview-id="`#${index}`"
              >
                {{ compatibility.value }}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div
            class="flex cursor-pointer justify-between bg-black p-2 text-sm font-bold uppercase text-white"
            @click="deliveryExpanded = !deliveryExpanded"
          >
            <h3>Delivery</h3>
            <svg
              v-if="!deliveryExpanded"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </div>

          <div v-if="deliveryExpanded" class="mt-2 text-gray-800">
            <ElementsRichText
              v-if="currentDataset?.data['tt_delivery']"
              data-preview-id="#tt_delivery"
              :richtext="currentDataset?.data['tt_delivery']"
            />
          </div>
        </div>

        <div>
          <div
            class="flex cursor-pointer justify-between bg-black p-2 text-sm font-bold uppercase text-white"
            @click="installationExpanded = !installationExpanded"
          >
            <h3>Installation</h3>
            <svg
              v-if="!installationExpanded"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </div>
          <div v-if="installationExpanded" class="mt-2 text-gray-800">
            <ElementsRichText
              v-if="currentDataset?.data['tt_installation']"
              data-preview-id="#tt_installation"
              :richtext="currentDataset?.data['tt_installation']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataEntries } from 'fsxa-api'
defineProps<{ data: DataEntries }>()

const { currentDataset } = useContent()

const deliveryExpanded = ref(false)
const installationExpanded = ref(false)
</script>
