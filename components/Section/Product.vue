<template>
  <section
    v-if="currentDataset"
    class="overflow-x-hidden py-12 md:py-32"
    data-testid="productSection"
    :data-preview-id="data['previewId']"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-1/2">
          <div class="py-6 lg:pr-32">
            <div class="mb-4">
              <span
                v-for="category in categoryNames"
                :key="category"
                class="mr-1 rounded-xl bg-gray-900 px-3 py-1 text-xs font-semibold text-white"
                >{{ category }}</span
              >
              <h1 class="mt-3 font-heading text-4xl font-bold">
                {{ currentDataset.data['tt_name'] }}
              </h1>
            </div>
            <div class="flex items-start py-4">
              <p class="mb-5 font-medium text-coolGray-500">
                <ElementsRichText
                  :richtext="currentDataset.data['tt_description']"
                />
              </p>
            </div>
            <div class="w-full px-4">
              <ClientOnly>
                <ElementsLikeButton
                  class="ml-auto mr-4 inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md sm:ml-0"
                  :show-border="true"
                  heart-style="w-6 h-6"
                  :product="(currentDataset.data as ProductData)"
                  :route="currentDataset.route"
                />
              </ClientOnly>
            </div>
            <div
              class="mt-10 flex items-start border-t border-gray-200 py-4 pt-10"
            >
              <p class="text-lg text-gray-900 sm:text-3xl">
                {{ currentDataset.data['tt_price'] }}
              </p>
            </div>
          </div>
        </div>
        <div class="relative my-12 w-full lg:my-0 lg:w-1/2">
          <ElementsImage
            v-if="currentDataset.data['tt_image']"
            :image="currentDataset.data['tt_image']"
            ratio="4x3"
            class="relative z-10 mx-auto w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DataEntries, Dataset } from 'fsxa-api'
import { ProductData } from 'types'

defineProps<{ data: DataEntries }>()

const { currentDataset } = useContent()

const categoryNames = computed(() => {
  return currentDataset.value?.data['tt_categories'].flatMap(
    (category: Dataset) => category.data['tt_name']
  )
})
</script>
