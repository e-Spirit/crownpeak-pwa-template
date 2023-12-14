<template>
  <div v-if="!pending" class="flex w-full flex-wrap lg:w-1/2">
    <div v-if="products" class="mb-8 w-full px-4 md:w-1/2 lg:mb-0">
      <ElementsProductTeaser
        v-for="product in products.left"
        :key="product.id"
        :data="(product.data as ProductData)"
        :product-route="product.route"
      />
    </div>
    <div v-if="products" class="w-full px-4 md:w-1/2 lg:mt-20">
      <ElementsProductTeaser
        v-for="product in products.right"
        :key="product.id"
        :data="(product.data as ProductData)"
        :product-route="product.route"
      />
    </div>
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

interface SplitProductItems {
  left: Dataset[]
  right: Dataset[]
}

const { data: products, pending } = useAsyncData(
  `category: ${props.categoryId}`,
  async (): Promise<SplitProductItems> => {
    const splitProducts = (products: Dataset[]) => {
      const midPoint = Math.ceil(products.length / 2)
      const splitProductItems = {
        left: products.slice(0, midPoint),
        right: products.slice(midPoint)
      }
      return splitProductItems
    }
    const cachedProducts = findCachedProductsByRoute(props.categoryId)
    if (cachedProducts) return splitProducts(cachedProducts)

    const fetchedItems = (await fetchProducts(
      fsxaApi,
      activeLocale.value!,
      props.categoryId
    )) as Dataset[]

    addToCachedProducts(currentRoute, fetchedItems)

    return splitProducts(fetchedItems)
  }
)
</script>

<style scoped></style>
