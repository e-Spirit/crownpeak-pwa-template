<template>
  <div v-if="!pending" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <ElementsProductTeaser
      v-for="product in products"
      :key="product.id"
      :data="(product.data as ProductData)"
      :product-route="product.route"
    />
  </div>
</template>

<script setup lang="ts">
import { Dataset } from 'fsxa-api'
import { ProductData } from 'types'

const props = defineProps<{ categoryId: string }>()

const { $createContentApi } = useNuxtApp()
const fsxaApi = $createContentApi()
const { activeLocale } = useLocale()
const { findCachedProductsByRoute, addToCachedProducts } = useContent()
const currentRoute = decodeURIComponent(useRoute().path)

const { data: products, pending } = useAsyncData(
  `category: ${props.categoryId}`,
  async () => {
    const cachedProducts = findCachedProductsByRoute(props.categoryId)
    if (cachedProducts) return cachedProducts

    const fetchedItems = (await fetchProducts(
      fsxaApi,
      activeLocale.value!,
      props.categoryId
    )) as Dataset[]

    addToCachedProducts(currentRoute, fetchedItems)

    return fetchedItems
  }
)
</script>

<style scoped></style>
