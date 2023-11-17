<template>
  <section v-if="currentDataset" class="overflow-x-hidden py-12 md:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-1/2">
          <div class="py-6 lg:pr-32">
            <div class="mb-4">
              <span
                v-for="category in categoryNames"
                :key="category"
                class="rounded-xl bg-gray-900 px-3 py-1 text-xs font-semibold text-white"
                >{{ category }}</span
              >
              <h1>{{ currentDataset.data['tt_name'] }}</h1>
            </div>
            <div class="flex items-start py-4">
              <ElementsRichText
                :richtext="currentDataset.data['tt_description']"
              />
            </div>
            <div class="w-full px-4">
              <ElementsLikeButton />
            </div>
            <div
              class="mt-10 flex items-start border-t border-gray-200 py-4 pt-10"
            >
              <p class="text-lg text-gray-900 sm:text-3xl">
                {{ currentDataset.data['tt_price'] }}
              </p>
            </div>
            <div class="relative my-12 w-full lg:my-0 lg:w-1/2">
              <ElementsImage :image="currentDataset.data['tt_image']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DataEntries, Dataset } from 'fsxa-api'
defineProps<{ data: DataEntries }>()

const { currentDataset } = useContent()
const categoryNames = computed(() => {
  return currentDataset.value?.data['tt_categories'].flatMap(
    (category: Dataset) => category.data['tt_name']
  )
})
</script>
