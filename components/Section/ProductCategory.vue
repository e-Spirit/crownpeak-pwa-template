<template>
  <div data-testid="productCategorySection">
    <div v-if="!pending" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        class="h-40"
        :to="product.route"
      >
        <div class="relative h-40 overflow-hidden">
          <div
            class="absolute inset-0 z-10 transform bg-black bg-opacity-70 p-8 text-white opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
          >
            <h3 class="text-lg font-bold">{{ product.data["tt_name"] }}</h3>
            <p class="h-16 overflow-hidden text-xs text-gray-200">
              {{ product.data["tt_abstract"]?.substring(0, 45) }}...
            </p>
          </div>
          <ElementsImage
            v-if="product.data['tt_teaser_image']"
            class="absolute top-0 left-0 h-40 w-full object-cover"
            :image="product.data['tt_teaser_image']"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataEntries, Dataset } from "fsxa-api";
const props = defineProps<{ data: DataEntries }>();
const { $fsxaApi } = useNuxtApp();
const { activeLocale } = useLocale();
const { findCachedProductsByRoute, addToCachedProducts } = useContent();
const currentRoute = decodeURIComponent(useRoute().path);

const { data: products, pending } = useAsyncData(async () => {
  const cachedProducts = findCachedProductsByRoute(currentRoute);
  if (cachedProducts) return cachedProducts;

  const filterParams = props.data["filterParams"];

  const items = await fetchProducts(
    $fsxaApi,
    activeLocale.value!,
    filterParams?.category
  );

  addToCachedProducts(currentRoute, items);
  return items as Dataset[];
});
</script>
