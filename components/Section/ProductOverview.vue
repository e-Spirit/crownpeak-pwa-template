<template>
  <section
    v-if="!pending"
    data-testid="productCategorySection"
    class="bg-white py-24"
  >
    <div class="container mx-auto px-4 text-center">
      <div
        v-if="products !== null"
        class="2xl:pb-22 bg-blueGray-100 pb-20 pt-12"
      >
        <div class="border-b border-black border-opacity-5 pb-9 text-center">
          <div class="relative">
            <h2
              class="xl:text-10xl mb-5 text-center font-heading text-5xl font-medium leading-normal text-gray-900 md:mb-0"
            >
              {{ products[0]?.data['tt_categories'][0].data['tt_name'] }}
            </h2>
            <span
              class="text-sm font-medium text-gray-400 md:absolute md:bottom-3 md:right-0"
              >{{ products.length + ' ' + productsFound }}</span
            >
          </div>
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SectionProductOverviewItem
          v-for="product in products"
          :key="product.id"
          :data="(product.data as ProductData)"
          :route="product.route"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DataEntries, Dataset } from 'fsxa-api'
import { ProductData } from 'types'

const props = defineProps<{ data: DataEntries }>()
const { $createContentApi } = useNuxtApp()
const fsxaApi = $createContentApi()
const { activeLocale } = useLocale()
const { findCachedProductsByRoute, addToCachedProducts } = useContent()
const currentRoute = decodeURIComponent(useRoute().path)

const productsFound = computed(() => {
  const locale = activeLocale.value!
  if (locale.includes('de')) return 'Produkte gefunden'
  if (locale.includes('en')) return 'products found'
  return ''
})

const { data: products, pending } = useAsyncData(async () => {
  const cachedProducts = findCachedProductsByRoute(currentRoute)
  if (cachedProducts) return cachedProducts

  const filterParams = props.data['filterParams']

  const items = (await fetchProducts(
    fsxaApi,
    activeLocale.value!,
    filterParams?.category_gid
  )) as Dataset[]

  addToCachedProducts(currentRoute, items)
  return items
})
</script>
